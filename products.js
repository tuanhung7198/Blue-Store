// products.js - Logic cho trang danh sách sản phẩm (products.html)
document.addEventListener("DOMContentLoaded", async () => {
  const productsGrid = document.getElementById("products-catalog-grid");
  const productsCountEl = document.getElementById("products-count-label");
  const paginationContainer = document.getElementById("products-pagination");
  const emptyStateEl = document.getElementById("products-empty-state");
  const searchInput = document.getElementById("catalog-search-input");
  const sortSelect = document.getElementById("catalog-sort-select");
  const resetBtn = document.getElementById("btn-reset-filters");
  const clearEmptyBtn = document.getElementById("btn-clear-empty-filters");
  const activeChipsContainer = document.getElementById("active-filter-chips");
  const categoryListContainer = document.getElementById("category-filter-list");
  const brandListContainer = document.getElementById("brand-filter-list");
  const specTagsContainer = document.getElementById("spec-tags-list");
  const breadcrumbCurrent = document.getElementById("breadcrumb-current-label");
  const pageHeaderTitle = document.getElementById("catalog-page-title");

  if (!productsGrid) return;

  // Danh sách thương hiệu phổ biến để nhận diện
  const KNOWN_BRANDS = [
    "Razer", "Logitech", "Pulsar", "Zowie", "ATK", "Corsair", "Keychron",
    "SteelSeries", "AKKO", "MonsGeek", "Aula", "Varmilo", "Ducky",
    "Leopold", "Ninjutso", "Endgame Gear", "Lamzu", "Artisan", "HyperX", "ASUS", "FL-Esports"
  ];

  // Helper tìm thương hiệu từ tên sản phẩm
  function detectBrand(productName) {
    const nameLower = productName.toLowerCase();
    for (const b of KNOWN_BRANDS) {
      if (nameLower.includes(b.toLowerCase())) return b;
    }
    return "Khác";
  }

  // State bộ lọc
  const filterState = {
    category: "all",
    brand: "all",
    priceMin: 0,
    priceMax: 12000000,
    status: "all",
    spec: "all",
    search: "",
    sortBy: "newest",
    page: 1,
    perPage: 12,
  };

  let catalogProducts = [];

  // 1. Nạp dữ liệu sản phẩm từ window.allProducts, JSON-Server hoặc products.json
  if (window.allProducts && window.allProducts.length > 0) {
    catalogProducts = window.allProducts;
  } else {
    let loadedData = null;
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (res.ok) loadedData = await res.json();
      } catch (err) {
        // JSON-Server chưa bật hoặc lỗi kết nối, fallback
      }
    }
    if (!loadedData || loadedData.length === 0) {
      try {
        const res = await fetch("products.json");
        if (res.ok) {
          const data = await res.json();
          loadedData = Array.isArray(data) ? data : (data && data.products ? data.products : []);
        }
      } catch (err) {
        console.warn("Lỗi nạp products.json trong catalog:", err.message);
      }
    }
    catalogProducts = loadedData || window.allProducts || [];
  }

  // 2. Đọc Query Params từ URL (ví dụ: ?category=Chuột hoặc ?brand=Razer)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    filterState.category = urlParams.get("category");
  }
  if (urlParams.has("brand")) {
    filterState.brand = urlParams.get("brand");
  }
  if (urlParams.has("spec")) {
    filterState.spec = urlParams.get("spec");
  }
  if (urlParams.has("search")) {
    filterState.search = urlParams.get("search");
    if (searchInput) searchInput.value = filterState.search;
  }
  if (urlParams.has("status")) {
    filterState.status = urlParams.get("status");
    const statusRadio = document.querySelector(`input[name="status-filter"][value="${filterState.status}"]`);
    if (statusRadio) statusRadio.checked = true;
  }
  if (urlParams.has("sort")) {
    filterState.sortBy = urlParams.get("sort");
    if (sortSelect) sortSelect.value = filterState.sortBy;
  }
  if (urlParams.has("price_min")) {
    const pmin = parseInt(urlParams.get("price_min"), 10);
    if (!isNaN(pmin)) filterState.priceMin = Math.max(0, pmin);
  }
  if (urlParams.has("price_max")) {
    const pmax = parseInt(urlParams.get("price_max"), 10);
    if (!isNaN(pmax)) filterState.priceMax = Math.min(12000000, pmax);
  }
  if (urlParams.has("price")) {
    const pr = urlParams.get("price");
    if (pr === "under1m") { filterState.priceMin = 0; filterState.priceMax = 1000000; }
    else if (pr === "1m-2m") { filterState.priceMin = 1000000; filterState.priceMax = 2000000; }
    else if (pr === "2m-4m" || pr === "2m-3m") { filterState.priceMin = 2000000; filterState.priceMax = 4000000; }
    else if (pr === "over4m" || pr === "over3m") { filterState.priceMin = 4000000; filterState.priceMax = 12000000; }
  }

  // 3. Render danh mục bên sidebar với số lượng thống kê
  function renderCategorySidebar() {
    if (!categoryListContainer) return;
    const catMap = { all: catalogProducts.length };
    catalogProducts.forEach((p) => {
      const cat = p.category || "Khác";
      catMap[cat] = (catMap[cat] || 0) + 1;
    });

    const categories = ["all", "Chuột", "Bàn phím", "Lót chuột", "Tai nghe"];
    Object.keys(catMap).forEach((c) => {
      if (!categories.includes(c)) categories.push(c);
    });

    let html = "";
    categories.forEach((catKey) => {
      const count = catMap[catKey] || 0;
      if (count === 0 && catKey !== "all") return;
      const label = catKey === "all" ? "Tất Cả Sản Phẩm" : catKey;
      const isActive = filterState.category === catKey ? "active" : "";
      html += `
        <li class="cat-filter-item ${isActive}" data-category="${catKey}">
          <span>${label}</span>
          <span class="cat-count">${count}</span>
        </li>
      `;
    });
    categoryListContainer.innerHTML = html;
  }

  // 4. Render danh sách thương hiệu bên sidebar
  function renderBrandSidebar() {
    if (!brandListContainer) return;
    const brandMap = { all: catalogProducts.length };
    catalogProducts.forEach((p) => {
      const b = detectBrand(p.name);
      brandMap[b] = (brandMap[b] || 0) + 1;
    });

    // Sắp xếp thương hiệu theo số lượng giảm dần
    const sortedBrands = Object.keys(brandMap).filter((b) => b !== "all" && b !== "Khác");
    sortedBrands.sort((a, b) => (brandMap[b] || 0) - (brandMap[a] || 0));

    let html = `
      <label class="custom-filter-option">
        <input type="radio" name="brand-filter" value="all" ${filterState.brand === "all" ? "checked" : ""} />
        <span>Tất cả thương hiệu</span>
        <span class="cat-count" style="margin-left:auto;">${catalogProducts.length}</span>
      </label>
    `;

    sortedBrands.forEach((b) => {
      const count = brandMap[b] || 0;
      const isChecked = filterState.brand === b ? "checked" : "";
      html += `
        <label class="custom-filter-option">
          <input type="radio" name="brand-filter" value="${b}" ${isChecked} />
          <span>${b}</span>
          <span class="cat-count" style="margin-left:auto;">${count}</span>
        </label>
      `;
    });

    brandListContainer.innerHTML = html;

    // Gắn sự kiện chọn thương hiệu
    brandListContainer.querySelectorAll('input[name="brand-filter"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        filterState.brand = e.target.value;
        applyFilters(true);
      });
    });
  }

  // 5. Lọc & Sắp xếp dữ liệu
  function getFilteredAndSortedProducts() {
    let list = [...catalogProducts];

    // Lọc theo Danh mục
    if (filterState.category !== "all") {
      list = list.filter((p) => p.category === filterState.category);
    }

    // Lọc theo Thương hiệu
    if (filterState.brand !== "all") {
      list = list.filter((p) => detectBrand(p.name) === filterState.brand);
    }

    // Lọc theo Thông số / Tính năng kỹ thuật
    if (filterState.spec !== "all") {
      list = list.filter((p) => {
        const nameLower = p.name.toLowerCase();
        switch (filterState.spec) {
          case "wireless":
            return nameLower.includes("không dây") || nameLower.includes("wireless");
          case "wired":
            return nameLower.includes("có dây") || (!nameLower.includes("không dây") && !nameLower.includes("wireless") && p.category !== "Lót chuột");
          case "ultralight":
            return nameLower.includes("siêu nhẹ") || nameLower.includes("superlight") || nameLower.includes("pro");
          case "8k":
            return nameLower.includes("8k") || nameLower.includes("4k");
          case "magnetic":
            return nameLower.includes("từ tính") || nameLower.includes("hall effect") || nameLower.includes("rapid trigger");
          default:
            return true;
        }
      });
    }

    // Lọc theo Khoảng giá (Dual Range Slider & Custom Min/Max)
    if (filterState.priceMin > 0 || filterState.priceMax < 12000000) {
      list = list.filter((p) => {
        const effectivePrice = p.sale_price !== null && p.sale_price !== undefined ? p.sale_price : p.price;
        return effectivePrice >= filterState.priceMin && effectivePrice <= filterState.priceMax;
      });
    }

    // Lọc theo Tình trạng (Status)
    if (filterState.status !== "all") {
      if (filterState.status === "hot") {
        list = list.filter((p) => p.hot === true);
      } else if (filterState.status === "sale") {
        list = list.filter((p) => p.sale_price !== null && p.sale_price !== undefined);
      } else if (filterState.status === "new") {
        // 8 sản phẩm có ID cao nhất được coi là mới
        const topNewIds = [...catalogProducts]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 8)
          .map((p) => p.id.toString());
        list = list.filter((p) => topNewIds.includes(p.id.toString()));
      }
    }

    // Lọc theo Từ khóa tìm kiếm
    if (filterState.search.trim()) {
      const q = filterState.search.trim().toLowerCase();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
        );
      });
    }

    // Sắp xếp
    switch (filterState.sortBy) {
      case "newest":
        list.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "price_asc":
        list.sort((a, b) => {
          const pa = a.sale_price ?? a.price;
          const pb = b.sale_price ?? b.price;
          return pa - pb;
        });
        break;
      case "price_desc":
        list.sort((a, b) => {
          const pa = a.sale_price ?? a.price;
          const pb = b.sale_price ?? b.price;
          return pb - pa;
        });
        break;
      case "hot":
        list.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
        break;
      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      default:
        break;
    }

    return list;
  }

  // 6. Render thẻ sản phẩm
  function renderCatalogGrid(items) {
    if (!productsGrid) return;

    if (items.length === 0) {
      productsGrid.style.display = "none";
      if (emptyStateEl) emptyStateEl.style.display = "block";
      if (paginationContainer) paginationContainer.innerHTML = "";
      return;
    }

    productsGrid.style.display = "grid";
    if (emptyStateEl) emptyStateEl.style.display = "none";

    let html = "";
    items.forEach((product) => {
      // Badge
      let badgeHtml = "";
      const isSale = product.sale_price !== null && product.sale_price !== undefined;
      if (isSale) {
        const discountPercent = Math.round(((product.price - product.sale_price) / product.price) * 100);
        badgeHtml = `<div class="card-badge sale-badge">-${discountPercent}%</div>`;
      } else if (product.hot) {
        badgeHtml = `<div class="card-badge hot-badge">HOT</div>`;
      }

      // Giá tiền
      let priceHtml = "";
      if (isSale) {
        priceHtml = `
          <div class="card-price">
            <span class="old-price">${window.formatCurrency ? window.formatCurrency(product.price) : product.price.toLocaleString("vi-VN") + "₫"}</span>
            <span class="new-price">${window.formatCurrency ? window.formatCurrency(product.sale_price) : product.sale_price.toLocaleString("vi-VN") + "₫"}</span>
          </div>`;
      } else {
        priceHtml = `<div class="card-price"><span class="current-price">${window.formatCurrency ? window.formatCurrency(product.price) : product.price.toLocaleString("vi-VN") + "₫"}</span></div>`;
      }

      html += `
        <div class="product-item" data-product-id="${product.id}">
          <div class="card-image-wrapper">
            ${badgeHtml}
            <button class="card-heart" data-id="${product.id}" aria-label="Yêu thích">
              <i class="fa-regular fa-heart"></i>
            </button>
            <div class="image-swap-container">
              <img class="main-img" src="${product.image}" alt="${product.name}" loading="lazy">
              <img class="hover-img" src="${product.image_hover || product.image}" alt="${product.name}" loading="lazy">
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
              <i class="fa-solid fa-cart-plus" style="margin-right: 6px;"></i><span>${window.I18N && window.I18N.t ? window.I18N.t("addToCartBtn") : "Thêm Vào Giỏ Hàng"}</span>
            </button>
          </div>
          <div class="card-info">
            <h3 title="${product.name}">${product.name}</h3>
            ${priceHtml}
          </div>
        </div>
      `;
    });

    productsGrid.innerHTML = html;
  }

  // 7. Render Phân Trang
  function renderPagination(totalItems) {
    if (!paginationContainer) return;
    const totalPages = Math.ceil(totalItems / filterState.perPage);
    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let html = `
      <button class="page-btn btn-prev-page" ${filterState.page === 1 ? "disabled" : ""}>
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button class="page-btn ${filterState.page === i ? "active" : ""}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    html += `
      <button class="page-btn btn-next-page" ${filterState.page === totalPages ? "disabled" : ""}>
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    paginationContainer.innerHTML = html;
  }

  // 8. Render Active Chips
  function renderActiveChips() {
    if (!activeChipsContainer) return;
    const chips = [];

    if (filterState.category !== "all") {
      chips.push({ key: "category", label: `Danh mục: ${filterState.category}` });
    }
    if (filterState.brand !== "all") {
      chips.push({ key: "brand", label: `Hãng: ${filterState.brand}` });
    }
    if (filterState.spec !== "all") {
      const specLabels = {
        wireless: "Không Dây",
        wired: "Có Dây",
        ultralight: "Siêu Nhẹ",
        "8k": "4K/8K Polling",
        magnetic: "Từ Tính / HE",
      };
      chips.push({ key: "spec", label: `Tính năng: ${specLabels[filterState.spec] || filterState.spec}` });
    }
    if (filterState.priceMin > 0 || filterState.priceMax < 12000000) {
      let priceLabel = "";
      const minStr = filterState.priceMin.toLocaleString("vi-VN") + "₫";
      const maxStr = filterState.priceMax.toLocaleString("vi-VN") + "₫";
      if (filterState.priceMin === 0) {
        priceLabel = `< ${maxStr}`;
      } else if (filterState.priceMax >= 12000000) {
        priceLabel = `> ${minStr}`;
      } else {
        priceLabel = `${minStr} - ${maxStr}`;
      }
      chips.push({ key: "price", label: `Giá: ${priceLabel}` });
    }
    if (filterState.status !== "all") {
      const statusLabels = { hot: "Nổi bật (Hot)", sale: "Đang giảm giá", new: "Mới ra mắt" };
      chips.push({ key: "status", label: `Tình trạng: ${statusLabels[filterState.status] || ""}` });
    }
    if (filterState.search.trim()) {
      chips.push({ key: "search", label: `Tìm kiếm: "${filterState.search}"` });
    }

    if (chips.length === 0) {
      activeChipsContainer.innerHTML = "";
      activeChipsContainer.style.display = "none";
      return;
    }

    activeChipsContainer.style.display = "flex";
    let html = chips
      .map(
        (c) => `
      <span class="filter-chip">
        ${c.label}
        <button type="button" data-chip-key="${c.key}" aria-label="Xóa bộ lọc">&times;</button>
      </span>
    `
      )
      .join("");

    html += `
      <button type="button" id="btn-clear-all-chips" style="background:none; border:none; color:#ef4444; font-size:12px; font-weight:700; cursor:pointer; text-decoration:underline; margin-left:6px;">
        Xóa tất cả
      </button>
    `;

    activeChipsContainer.innerHTML = html;
  }

  // 9. Cập nhật UI State, URL & Tiêu đề
  function updateUIState(totalFiltered) {
    let catTitle = "TẤT CẢ SẢN PHẨM";
    if (filterState.category !== "all" && filterState.brand !== "all") {
      catTitle = `${filterState.category.toUpperCase()} ${filterState.brand.toUpperCase()}`;
    } else if (filterState.category !== "all") {
      catTitle = filterState.category.toUpperCase();
    } else if (filterState.brand !== "all") {
      catTitle = `SẢN PHẨM ${filterState.brand.toUpperCase()}`;
    }

    if (pageHeaderTitle) pageHeaderTitle.textContent = catTitle;
    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = filterState.category === "all" ? (filterState.brand === "all" ? "Tất cả sản phẩm" : filterState.brand) : filterState.category;
    }

    // Count label
    if (productsCountEl) {
      const start = totalFiltered === 0 ? 0 : (filterState.page - 1) * filterState.perPage + 1;
      const end = Math.min(filterState.page * filterState.perPage, totalFiltered);
      productsCountEl.innerHTML = `Hiển thị <strong>${start}-${end}</strong> trên tổng số <strong>${totalFiltered}</strong> sản phẩm`;
    }

    // Đồng bộ URL mà không reload trang
    const newParams = new URLSearchParams();
    if (filterState.category !== "all") newParams.set("category", filterState.category);
    if (filterState.brand !== "all") newParams.set("brand", filterState.brand);
    if (filterState.spec !== "all") newParams.set("spec", filterState.spec);
    if (filterState.priceMin > 0) newParams.set("price_min", filterState.priceMin);
    if (filterState.priceMax < 12000000) newParams.set("price_max", filterState.priceMax);
    if (filterState.status !== "all") newParams.set("status", filterState.status);
    if (filterState.search.trim()) newParams.set("search", filterState.search.trim());
    if (filterState.sortBy !== "newest") newParams.set("sort", filterState.sortBy);
    if (filterState.page > 1) newParams.set("page", filterState.page);

    const newUrl = `${window.location.pathname}${newParams.toString() ? "?" + newParams.toString() : ""}`;
    window.history.replaceState({}, "", newUrl);
  }

  // 10. Hàm áp dụng toàn bộ bộ lọc và vẽ lại UI
  function applyFilters(resetPage = false) {
    if (resetPage) filterState.page = 1;

    const filtered = getFilteredAndSortedProducts();
    const total = filtered.length;

    // Phân trang
    const startIndex = (filterState.page - 1) * filterState.perPage;
    const pageItems = filtered.slice(startIndex, startIndex + filterState.perPage);

    renderCatalogGrid(pageItems);
    renderPagination(total);
    renderActiveChips();
    updateUIState(total);
  }

  // Khởi tạo ban đầu
  renderCategorySidebar();
  renderBrandSidebar();
  applyFilters();

  // --- SỰ KIỆN TƯƠNG TÁC ---

  // 1. Click chọn Category bên Sidebar
  if (categoryListContainer) {
    categoryListContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".cat-filter-item");
      if (!item) return;
      const cat = item.getAttribute("data-category");
      filterState.category = cat;

      categoryListContainer.querySelectorAll(".cat-filter-item").forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      applyFilters(true);
    });
  }

  // 2. Click chọn Spec / Tính năng Tag Buttons
  if (specTagsContainer) {
    specTagsContainer.addEventListener("click", (e) => {
      const tagBtn = e.target.closest(".spec-tag-btn");
      if (!tagBtn) return;
      const spec = tagBtn.getAttribute("data-spec");
      filterState.spec = spec;

      specTagsContainer.querySelectorAll(".spec-tag-btn").forEach((el) => el.classList.remove("active"));
      tagBtn.classList.add("active");

      applyFilters(true);
    });
  }

  // 3. BỘ ĐIỀU KHIỂN KHOẢNG GIÁ: DUAL RANGE SLIDER & Ô NHẬP TÙY CHỈNH
  const rangeMinInput = document.getElementById("price-range-min");
  const rangeMaxInput = document.getElementById("price-range-max");
  const sliderProgress = document.getElementById("price-slider-progress");
  const priceDisplayBadge = document.getElementById("price-range-display");
  const numberMinInput = document.getElementById("price-min-input");
  const numberMaxInput = document.getElementById("price-max-input");
  const btnApplyPrice = document.getElementById("btn-apply-price");
  const presetButtons = document.querySelectorAll(".price-preset-btn");

  const MAX_PRICE_LIMIT = 12000000;

  function updatePriceDisplay(minVal, maxVal) {
    if (priceDisplayBadge) {
      const minFormatted = minVal.toLocaleString("vi-VN") + "₫";
      const maxFormatted = maxVal.toLocaleString("vi-VN") + "₫";
      priceDisplayBadge.textContent = `${minFormatted} - ${maxFormatted}`;
    }
  }

  function updateSliderFill(minVal, maxVal) {
    if (!sliderProgress) return;
    const leftPercent = Math.min(100, Math.max(0, (minVal / MAX_PRICE_LIMIT) * 100));
    const rightPercent = Math.min(100, Math.max(0, 100 - (maxVal / MAX_PRICE_LIMIT) * 100));
    sliderProgress.style.left = `${leftPercent}%`;
    sliderProgress.style.right = `${rightPercent}%`;
  }

  function updateActivePresetButtons(minVal, maxVal) {
    presetButtons.forEach((btn) => {
      const bMin = parseInt(btn.getAttribute("data-min"), 10);
      const bMax = parseInt(btn.getAttribute("data-max"), 10);
      const isActive = bMin === minVal && bMax === maxVal;
      btn.classList.toggle("active", isActive);
    });
  }

  function syncPriceFilterUI(minVal, maxVal) {
    if (rangeMinInput) rangeMinInput.value = minVal;
    if (rangeMaxInput) rangeMaxInput.value = maxVal;
    if (numberMinInput) numberMinInput.value = minVal;
    if (numberMaxInput) numberMaxInput.value = maxVal;
    updateSliderFill(minVal, maxVal);
    updatePriceDisplay(minVal, maxVal);
    updateActivePresetButtons(minVal, maxVal);
  }
  window.syncPriceFilterUI = syncPriceFilterUI;

  // Lắng nghe sự kiện trượt Range Slider Min
  if (rangeMinInput && rangeMaxInput) {
    rangeMinInput.addEventListener("input", () => {
      let minVal = parseInt(rangeMinInput.value, 10) || 0;
      let maxVal = parseInt(rangeMaxInput.value, 10) || MAX_PRICE_LIMIT;

      if (minVal > maxVal) {
        minVal = maxVal;
        rangeMinInput.value = minVal;
      }

      if (numberMinInput) numberMinInput.value = minVal;
      updateSliderFill(minVal, maxVal);
      updatePriceDisplay(minVal, maxVal);
      updateActivePresetButtons(minVal, maxVal);
    });

    rangeMinInput.addEventListener("change", () => {
      const minVal = parseInt(rangeMinInput.value, 10) || 0;
      const maxVal = parseInt(rangeMaxInput.value, 10) || MAX_PRICE_LIMIT;
      filterState.priceMin = minVal;
      filterState.priceMax = maxVal;
      applyFilters(true);
    });

    rangeMinInput.addEventListener("mousedown", () => {
      rangeMinInput.style.zIndex = "5";
      rangeMaxInput.style.zIndex = "4";
    });
    rangeMinInput.addEventListener("touchstart", () => {
      rangeMinInput.style.zIndex = "5";
      rangeMaxInput.style.zIndex = "4";
    }, { passive: true });

    // Lắng nghe sự kiện trượt Range Slider Max
    rangeMaxInput.addEventListener("input", () => {
      let minVal = parseInt(rangeMinInput.value, 10) || 0;
      let maxVal = parseInt(rangeMaxInput.value, 10) || MAX_PRICE_LIMIT;

      if (maxVal < minVal) {
        maxVal = minVal;
        rangeMaxInput.value = maxVal;
      }

      if (numberMaxInput) numberMaxInput.value = maxVal;
      updateSliderFill(minVal, maxVal);
      updatePriceDisplay(minVal, maxVal);
      updateActivePresetButtons(minVal, maxVal);
    });

    rangeMaxInput.addEventListener("change", () => {
      const minVal = parseInt(rangeMinInput.value, 10) || 0;
      const maxVal = parseInt(rangeMaxInput.value, 10) || MAX_PRICE_LIMIT;
      filterState.priceMin = minVal;
      filterState.priceMax = maxVal;
      applyFilters(true);
    });

    rangeMaxInput.addEventListener("mousedown", () => {
      rangeMaxInput.style.zIndex = "5";
      rangeMinInput.style.zIndex = "4";
    });
    rangeMaxInput.addEventListener("touchstart", () => {
      rangeMaxInput.style.zIndex = "5";
      rangeMinInput.style.zIndex = "4";
    }, { passive: true });
  }

  // Lắng nghe nhập liệu trực tiếp từ 2 ô số tiền
  function handleDirectNumberInput() {
    let minVal = parseInt(numberMinInput?.value, 10);
    let maxVal = parseInt(numberMaxInput?.value, 10);

    if (isNaN(minVal)) minVal = 0;
    if (isNaN(maxVal)) maxVal = MAX_PRICE_LIMIT;

    minVal = Math.max(0, Math.min(minVal, MAX_PRICE_LIMIT));
    maxVal = Math.max(0, Math.min(maxVal, MAX_PRICE_LIMIT));

    if (rangeMinInput) rangeMinInput.value = minVal;
    if (rangeMaxInput) rangeMaxInput.value = maxVal;

    updateSliderFill(Math.min(minVal, maxVal), Math.max(minVal, maxVal));
    updatePriceDisplay(Math.min(minVal, maxVal), Math.max(minVal, maxVal));
    updateActivePresetButtons(minVal, maxVal);
  }

  function applyCustomPrice() {
    let minVal = parseInt(numberMinInput?.value, 10);
    let maxVal = parseInt(numberMaxInput?.value, 10);

    if (isNaN(minVal)) minVal = 0;
    if (isNaN(maxVal)) maxVal = MAX_PRICE_LIMIT;

    minVal = Math.max(0, Math.min(minVal, MAX_PRICE_LIMIT));
    maxVal = Math.max(0, Math.min(maxVal, MAX_PRICE_LIMIT));

    if (minVal > maxVal) {
      const temp = minVal;
      minVal = maxVal;
      maxVal = temp;
    }

    filterState.priceMin = minVal;
    filterState.priceMax = maxVal;
    syncPriceFilterUI(minVal, maxVal);
    applyFilters(true);

    if (btnApplyPrice) {
      const origText = btnApplyPrice.innerHTML;
      btnApplyPrice.style.background = "#10b981";
      btnApplyPrice.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Đã áp dụng!</span>`;
      setTimeout(() => {
        btnApplyPrice.style.background = "";
        btnApplyPrice.innerHTML = origText;
      }, 900);
    }
  }

  if (numberMinInput) {
    numberMinInput.addEventListener("input", handleDirectNumberInput);
    numberMinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyCustomPrice();
      }
    });
  }

  if (numberMaxInput) {
    numberMaxInput.addEventListener("input", handleDirectNumberInput);
    numberMaxInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyCustomPrice();
      }
    });
  }

  if (btnApplyPrice) {
    btnApplyPrice.addEventListener("click", applyCustomPrice);
  }

  // Lắng nghe các nút chọn mức giá nhanh (preset pills)
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const minVal = parseInt(btn.getAttribute("data-min"), 10) || 0;
      const maxVal = parseInt(btn.getAttribute("data-max"), 10) || MAX_PRICE_LIMIT;

      filterState.priceMin = minVal;
      filterState.priceMax = maxVal;
      syncPriceFilterUI(minVal, maxVal);
      applyFilters(true);
    });
  });

  // Khởi tạo UI giá ban đầu
  syncPriceFilterUI(filterState.priceMin, filterState.priceMax);

  // 4. Thay đổi tình trạng sản phẩm (status)
  document.querySelectorAll('input[name="status-filter"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      filterState.status = e.target.value;
      applyFilters(true);
    });
  });

  // 5. Tìm kiếm từ khóa (Debounced)
  let searchTimer;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        filterState.search = e.target.value;
        applyFilters(true);
      }, 250);
    });
  }

  // 6. Sắp xếp sản phẩm
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      filterState.sortBy = e.target.value;
      applyFilters(true);
    });
  }

  // 7. Xóa chip lọc
  if (activeChipsContainer) {
    activeChipsContainer.addEventListener("click", (e) => {
      const removeBtn = e.target.closest("button[data-chip-key]");
      if (removeBtn) {
        const key = removeBtn.getAttribute("data-chip-key");
        if (key === "category") {
          filterState.category = "all";
          categoryListContainer?.querySelectorAll(".cat-filter-item").forEach((el) => {
            el.classList.toggle("active", el.getAttribute("data-category") === "all");
          });
        } else if (key === "brand") {
          filterState.brand = "all";
          const defaultBrand = document.querySelector('input[name="brand-filter"][value="all"]');
          if (defaultBrand) defaultBrand.checked = true;
        } else if (key === "spec") {
          filterState.spec = "all";
          specTagsContainer?.querySelectorAll(".spec-tag-btn").forEach((el) => {
            el.classList.toggle("active", el.getAttribute("data-spec") === "all");
          });
        } else if (key === "price" || key === "priceRange") {
          filterState.priceMin = 0;
          filterState.priceMax = MAX_PRICE_LIMIT;
          syncPriceFilterUI(0, MAX_PRICE_LIMIT);
        } else if (key === "status") {
          filterState.status = "all";
          const defaultStatus = document.querySelector('input[name="status-filter"][value="all"]');
          if (defaultStatus) defaultStatus.checked = true;
        } else if (key === "search") {
          filterState.search = "";
          if (searchInput) searchInput.value = "";
        }
        applyFilters(true);
        return;
      }

      if (e.target.closest("#btn-clear-all-chips")) {
        resetAllFilters();
      }
    });
  }

  // 8. Nút Đặt lại bộ lọc (Reset)
  function resetAllFilters() {
    filterState.category = "all";
    filterState.brand = "all";
    filterState.spec = "all";
    filterState.priceMin = 0;
    filterState.priceMax = MAX_PRICE_LIMIT;
    filterState.status = "all";
    filterState.search = "";
    filterState.sortBy = "newest";
    filterState.page = 1;

    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "newest";

    syncPriceFilterUI(0, MAX_PRICE_LIMIT);

    const defaultStatus = document.querySelector('input[name="status-filter"][value="all"]');
    if (defaultStatus) defaultStatus.checked = true;

    const defaultBrand = document.querySelector('input[name="brand-filter"][value="all"]');
    if (defaultBrand) defaultBrand.checked = true;

    categoryListContainer?.querySelectorAll(".cat-filter-item").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-category") === "all");
    });

    specTagsContainer?.querySelectorAll(".spec-tag-btn").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-spec") === "all");
    });

    applyFilters(true);
  }

  if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
  if (clearEmptyBtn) clearEmptyBtn.addEventListener("click", resetAllFilters);

  // 9. Chuyển trang (Pagination)
  if (paginationContainer) {
    paginationContainer.addEventListener("click", (e) => {
      const pageBtn = e.target.closest(".page-btn");
      if (!pageBtn || pageBtn.disabled) return;

      const pageNum = pageBtn.getAttribute("data-page");
      if (pageNum) {
        filterState.page = parseInt(pageNum, 10);
      } else if (pageBtn.classList.contains("btn-prev-page")) {
        filterState.page = Math.max(1, filterState.page - 1);
      } else if (pageBtn.classList.contains("btn-next-page")) {
        filterState.page += 1;
      }

      applyFilters(false);
      productsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // 10. Click vào thẻ sản phẩm chuyển sang trang chi tiết (nếu không bấm nút Thêm giỏ hàng hoặc Trái tim)
  if (productsGrid) {
    productsGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".product-item");
      if (!card) return;
      if (e.target.closest(".add-to-cart-btn, .card-heart")) return;

      const pid = card.getAttribute("data-product-id");
      if (pid) {
        window.location.href = `product-detail.html?id=${pid}`;
      }
    });
  }

  // 11. Lắng nghe sự kiện chuyển đổi ngôn ngữ/tiền tệ để cập nhật giá tiền trên Catalog
  window.addEventListener("blue:language-change", () => {
    applyFilters(false);
  });
});
