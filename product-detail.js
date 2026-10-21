// product-detail.js - Logic chi tiết sản phẩm, biến thể, Express Checkout 2 bước, Telemetry và Dark Mode eSports
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "1";

  // Elements
  const layoutEl = document.getElementById("product-detail-layout");
  const notFoundEl = document.getElementById("product-not-found-state");
  const breadcrumbCategory = document.getElementById("detail-breadcrumb-cat");
  const breadcrumbProduct = document.getElementById("detail-breadcrumb-name");
  const mainImgBox = document.getElementById("detail-main-img-box");
  const mainImgEl = document.getElementById("detail-main-img");
  const thumbnailsRow = document.getElementById("detail-thumbnails-row");
  const badgeGroup = document.getElementById("detail-badge-group");
  const categoryTag = document.getElementById("detail-category-tag");
  const titleEl = document.getElementById("detail-product-title");
  const skuEl = document.getElementById("detail-sku-val");
  const stockBadge = document.getElementById("detail-stock-badge");
  const stockText = document.getElementById("detail-stock-text");
  const flashSaleBar = document.getElementById("detail-flash-sale");
  const priceBox = document.getElementById("detail-price-box");
  const qtyInput = document.getElementById("detail-qty-input");
  const qtyMinus = document.getElementById("detail-qty-minus");
  const qtyPlus = document.getElementById("detail-qty-plus");
  const btnAddToCart = document.getElementById("btn-detail-add-cart");
  const btnBuyNow = document.getElementById("btn-detail-buynow");
  const btnNotify = document.getElementById("btn-detail-notify");
  const wishlistBtn = document.getElementById("detail-wishlist-btn");
  const specsTableBody = document.getElementById("detail-specs-tbody");
  const relatedGrid = document.getElementById("detail-related-grid");
  const telemetryContainer = document.getElementById("quick-specs-telemetry");
  const ratingJumpBtn = document.getElementById("detail-rating-jump-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // Variant Elements
  const selectedColorLabel = document.getElementById("selected-color-label");
  const colorOptionsRow = document.getElementById("color-options-row");
  const selectedEditionLabel = document.getElementById("selected-edition-label");
  const editionOptionsRow = document.getElementById("edition-options-row");

  let currentProduct = null;
  let allCatalog = [];

  // State biến thể được chọn
  let selectedColor = "Đen nhám (Matte Black)";
  let selectedEdition = "Wireless 2.4GHz + BT";
  let stockState = "in-stock"; // 'in-stock' | 'pre-order' | 'out-of-stock'
  let quantity = 1;

  // =========================================================================
  // --- 1. DARK / LIGHT ESPORTS THEME CONTROLLER ---
  // =========================================================================
  const initTheme = () => {
    if (typeof window.initGlobalTheme === "function") {
      window.initGlobalTheme();
      return;
    }
    const savedTheme = localStorage.getItem("blue_esports_theme") || "light";
    const isDark = savedTheme === "dark";
    document.body.classList.toggle("theme-dark", isDark);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-label", isDark ? "Chế độ hiện tại: Dark eSports. Bấm để chuyển sang Sáng" : "Chế độ hiện tại: Sáng. Bấm để chuyển sang Dark eSports");
      themeToggleBtn.title = isDark ? "Chế độ Dark eSports (Bấm để chuyển sang Sáng)" : "Giao diện Sáng (Bấm để chuyển sang Dark eSports)";
      themeToggleBtn.innerHTML = `
        <span class="theme-toggle-badge">
          <i class="fa-solid ${isDark ? "fa-moon" : "fa-sun"}"></i>
        </span>
        <span class="theme-toggle-content">
          <span class="theme-toggle-label">${isDark ? "Dark Mode" : "Light Mode"}</span>
          <span class="theme-toggle-chevrons">
            <i class="fa-solid fa-chevron-up"></i>
            <i class="fa-solid fa-chevron-down"></i>
          </span>
        </span>
      `;
    }
  };
  initTheme();

  // =========================================================================
  // --- 2. NẠP DỮ LIỆU & XỬ LÝ 404 (CLARIFY) ---
  // =========================================================================
  if (window.allProducts && window.allProducts.length > 0) {
    allCatalog = window.allProducts;
  } else {
    let loadedCatalog = null;
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (res.ok) loadedCatalog = await res.json();
      } catch (e) {
        // JSON-Server chưa bật hoặc lỗi kết nối, fallback
      }
    }
    if (!loadedCatalog || loadedCatalog.length === 0) {
      try {
        const res = await fetch("products.json");
        if (res.ok) {
          const data = await res.json();
          loadedCatalog = Array.isArray(data) ? data : (data && data.products ? data.products : []);
        }
      } catch (err) {
        console.warn("Lỗi nạp products.json trong product-detail:", err.message);
      }
    }
    allCatalog = loadedCatalog || window.allProducts || [];
  }

  // Tìm sản phẩm theo ID
  currentProduct = allCatalog.find((p) => p.id.toString() === productId.toString());

  // Nếu không tìm thấy ID hợp lệ -> Hiện 404 / Clarify View thay vì âm thầm nạp sản phẩm #1
  if (!currentProduct) {
    if (layoutEl) layoutEl.style.display = "none";
    if (notFoundEl) notFoundEl.style.display = "block";
    document.title = "Không tìm thấy thiết bị | Blue Gaming Gear";
    return;
  }

  // 3. Cập nhật thông tin tiêu đề và breadcrumb đa ngôn ngữ
  function updateDetailTextInfo() {
    if (!currentProduct) return;
    const pName = window.getProductName ? window.getProductName(currentProduct) : currentProduct.name;
    const catName = window.getCategoryName ? window.getCategoryName(currentProduct.category) : (currentProduct.category || "Gear");
    document.title = `${pName} | Blue Gaming Gear`;
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = catName;
      breadcrumbCategory.href = `products.html?category=${encodeURIComponent(currentProduct.category || "")}`;
    }
    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = pName;
    }
    if (categoryTag) {
      categoryTag.textContent = catName;
    }
    if (titleEl) {
      titleEl.textContent = pName;
    }
    if (skuEl) {
      skuEl.textContent = `BL-${currentProduct.id.toString().padStart(4, "0")}`;
    }
  }
  updateDetailTextInfo();

  // 4. Render hình ảnh & Gallery thumbnails
  if (mainImgEl) {
    mainImgEl.src = currentProduct.image;
    mainImgEl.alt = currentProduct.name;
  }

  const productImages = [
    { src: currentProduct.image, color: "black", label: "Ảnh góc chính (Đen)" },
    { src: currentProduct.image_hover || currentProduct.image, color: "white", label: "Ảnh góc phụ / Trắng" }
  ];

  const switchGalleryImage = (targetSrc, targetColor) => {
    if (mainImgEl && targetSrc) {
      mainImgEl.style.opacity = "0.4";
      setTimeout(() => {
        mainImgEl.src = targetSrc;
        mainImgEl.style.opacity = "1";
      }, 120);
    }

    if (thumbnailsRow) {
      thumbnailsRow.querySelectorAll(".detail-thumb-item").forEach((el) => {
        el.classList.toggle("active", el.getAttribute("data-src") === targetSrc);
      });
    }

    if (colorOptionsRow && targetColor) {
      const matchSwatch = colorOptionsRow.querySelector(`.color-swatch-btn[data-color="${targetColor}"]`);
      if (matchSwatch) {
        colorOptionsRow.querySelectorAll(".color-swatch-btn").forEach((b) => b.classList.remove("active"));
        matchSwatch.classList.add("active");
        selectedColor = matchSwatch.getAttribute("data-label");
        if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;
      }
    }
  };

  if (thumbnailsRow) {
    let thumbHtml = "";
    productImages.forEach((img, idx) => {
      thumbHtml += `
        <div class="detail-thumb-item ${idx === 0 ? "active" : ""}" data-src="${img.src}" data-color="${img.color}">
          <img src="${img.src}" alt="${img.label}" loading="lazy" />
        </div>
      `;
    });
    thumbnailsRow.innerHTML = thumbHtml;

    thumbnailsRow.addEventListener("click", (e) => {
      const thumb = e.target.closest(".detail-thumb-item");
      if (!thumb) return;
      switchGalleryImage(thumb.getAttribute("data-src"), thumb.getAttribute("data-color"));
    });
  }

  // 5. Huy hiệu Badges (Hot / Sale)
  const isSale = currentProduct.sale_price !== null && currentProduct.sale_price !== undefined;
  if (badgeGroup) {
    let badges = "";
    if (isSale) {
      const discountPercent = Math.round(((currentProduct.price - currentProduct.sale_price) / currentProduct.price) * 100);
      badges += `<span class="detail-badge badge-sale">GIẢM ${discountPercent}%</span>`;
    }
    if (currentProduct.hot) {
      badges += `<span class="detail-badge badge-hot">HOT SELLER</span>`;
    }
    badgeGroup.innerHTML = badges;
  }

  // 6. Trạng thái kho hàng (Dynamic Stock State)
  const numericId = parseInt(currentProduct.id, 10);
  if (numericId % 7 === 0) {
    stockState = "out-of-stock";
  } else if (numericId % 5 === 0) {
    stockState = "pre-order";
  } else {
    stockState = "in-stock";
  }

  function updateStockBadge() {
    if (!stockBadge || !stockText) return;
    stockBadge.className = "detail-stock-badge";
    const t = (k, fb) => (window.I18N ? window.I18N.t(k) : fb);
    if (stockState === "in-stock") {
      stockBadge.classList.add("stock-in");
      stockText.textContent = t("stockIn", "Còn hàng (Sẵn sàng giao 24h)");
    } else if (stockState === "pre-order") {
      stockBadge.classList.add("stock-preorder");
      stockText.textContent = t("stockPreorder", "Đặt trước (Giao sau 3 - 5 ngày)");
    } else {
      stockBadge.classList.add("stock-out");
      stockText.textContent = t("stockOut", "Tạm hết hàng (Đang về đợt mới)");

      // Disable mua thông thường & hiện nút Nhận thông báo (Lead capture)
      if (btnAddToCart) btnAddToCart.style.display = "none";
      if (btnBuyNow) btnBuyNow.style.display = "none";
      if (btnNotify) btnNotify.style.display = "inline-flex";
      if (qtyInput) qtyInput.disabled = true;
      if (qtyMinus) qtyMinus.disabled = true;
      if (qtyPlus) qtyPlus.disabled = true;
    }
  }
  updateStockBadge();

  // 7. Flash Sale đếm ngược thời gian thực
  if (flashSaleBar) {
    if (isSale) {
      flashSaleBar.style.display = "block";
      let countdownSeconds = 2 * 3600 + 45 * 60 + 18;
      const hEl = document.getElementById("flash-h");
      const mEl = document.getElementById("flash-m");
      const sEl = document.getElementById("flash-s");

      setInterval(() => {
        if (countdownSeconds > 0) {
          countdownSeconds--;
          const h = Math.floor(countdownSeconds / 3600);
          const m = Math.floor((countdownSeconds % 3600) / 60);
          const s = countdownSeconds % 60;
          if (hEl) hEl.textContent = h.toString().padStart(2, "0");
          if (mEl) mEl.textContent = m.toString().padStart(2, "0");
          if (sEl) sEl.textContent = s.toString().padStart(2, "0");
        }
      }, 1000);
    } else {
      flashSaleBar.style.display = "none";
    }
  }

  // 8. Giá tiền
  const format = (amt) => (window.formatCurrency ? window.formatCurrency(amt) : amt.toLocaleString("vi-VN") + "₫");
  function renderDetailPrices() {
    if (priceBox && currentProduct) {
      if (isSale) {
        const discountPercent = Math.round(((currentProduct.price - currentProduct.sale_price) / currentProduct.price) * 100);
        const saveWord = window.I18N && window.I18N.getCurrentLang() === "en" ? "Save" : "Tiết kiệm";
        priceBox.innerHTML = `
          <span class="detail-current-price">${format(currentProduct.sale_price)}</span>
          <span class="detail-old-price">${format(currentProduct.price)}</span>
          <span class="detail-discount-pill">${saveWord} ${discountPercent}%</span>
        `;
      } else {
        priceBox.innerHTML = `
          <span class="detail-current-price">${format(currentProduct.price)}</span>
        `;
      }
    }
    const stickyPriceEl = document.getElementById("mobile-sticky-price");
    if (stickyPriceEl && currentProduct) {
      stickyPriceEl.textContent = format(currentProduct.sale_price ?? currentProduct.price);
    }
  }
  renderDetailPrices();

  // =========================================================================
  // --- 9. QUICK SPECS TELEMETRY BAR & TOOLTIPS (Alex & Jordan) ---
  // =========================================================================
  // =========================================================================
  // --- 9. QUICK SPECS TELEMETRY BAR & TOOLTIPS (Alex & Jordan) ---
  // =========================================================================
  function renderTelemetryChips() {
    if (!telemetryContainer) return;
    const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
    const isMouse = currentProduct.category === "Chuột";
    const isKeyboard = currentProduct.category === "Bàn phím";
    const isPad = currentProduct.category === "Lót chuột";

    let chips = [];
    if (isMouse) {
      chips = [
        {
          type: "ergo",
          icon: "fa-solid fa-feather-pointed",
          text: isEn ? "49g Ultralight" : "49g Siêu Nhẹ",
          title: isEn ? "Ultralight Tournament Weight" : "Trọng lượng siêu nhẹ",
          desc: isEn ? "Maximum agility and zero inertia when flicking in tactical FPS, eliminating wrist fatigue." : "Tối ưu hóa độ cơ động, triệt tiêu quán tính khi flick chuột nhanh trong game bắn súng và chống mỏi cổ tay khi chơi lâu."
        },
        {
          type: "sensor",
          icon: "fa-solid fa-crosshairs",
          text: "PixArt PAW3395",
          title: isEn ? "PAW3395 Optical Sensor" : "Mắt đọc quang học PAW3395",
          desc: isEn ? "eSports tournament sensor, 1:1 true tracking, 99.8% resolution accuracy across all flicking speeds." : "Mắt đọc chuẩn thi đấu eSports, tracking chuẩn 1:1 không gia tốc, độ chính xác 99.8% ở mọi cú vẩy tay nhanh."
        },
        {
          type: "speed",
          icon: "fa-solid fa-bolt",
          text: isEn ? "8000Hz Ultra-Polling" : "8000Hz Polling",
          title: isEn ? "8000Hz Report Rate" : "Tần số gửi tín hiệu 8000Hz",
          desc: isEn ? "8,000 updates/sec with ultra-crisp 0.125ms latency (8x faster than standard 1000Hz mice)." : "Tần số gửi dữ liệu 8.000 lần/giây, độ trễ chỉ 0.125ms (nhanh gấp 8 lần chuột văn phòng 1000Hz thông thường)."
        },
        {
          type: "switch",
          icon: "fa-solid fa-shield",
          text: isEn ? "Omron Optical Switches" : "Omron Optical",
          title: isEn ? "Omron Optical Switches" : "Switch quang học Omron",
          desc: isEn ? "Infrared instantaneous actuation, 100M click durability, zero debounce delay or double-clicking." : "Phản hồi bằng tia hồng ngoại tức thì, độ bền 100 triệu lần click, chống hoàn toàn hiện tượng double-click."
        }
      ];
    } else if (isKeyboard) {
      chips = [
        {
          type: "speed",
          icon: "fa-solid fa-bolt",
          text: isEn ? "Rapid Trigger (0.1mm)" : "Rapid Trigger (0.1mm)",
          title: isEn ? "Rapid Trigger Tech" : "Công nghệ Rapid Trigger",
          desc: isEn ? "Instant key reset at 0.1mm release, allowing immediate keystroke re-activation without full travel." : "Nhận diện điểm nhả phím tức thì (chỉ từ 0.1mm), cho phép bấm lại phím ngay lập tức mà không cần nhả hết hành trình."
        },
        {
          type: "sensor",
          icon: "fa-solid fa-magnet",
          text: isEn ? "Hall Effect Magnetic" : "Hall Effect Magnetic",
          title: isEn ? "Magnetic Hall Effect Switches" : "Switch Từ Tính Hall Effect",
          desc: isEn ? "Contactless magnetic sensors, 100M+ keystroke lifespan, customizable 0.02mm per-key sensitivity." : "Switch không tiếp điểm cơ học, tuổi thọ trên 100 triệu lần nhấn, độ nhạy tùy biến từng 0.02mm qua phần mềm."
        },
        {
          type: "speed",
          icon: "fa-solid fa-wave-square",
          text: isEn ? "8000Hz Matrix Scan" : "8000Hz Polling Rate",
          title: isEn ? "8000Hz Scan Rate" : "Tần số phản hồi 8000Hz",
          desc: isEn ? "Ultra-fast 0.125ms matrix scan, capturing complex multi-key inputs with tournament-grade precision." : "Quét ma trận phím siêu tốc 0.125ms, bắt trọn từng thao tác tổ hợp phím phức tạp trong tích tắc."
        },
        {
          type: "ergo",
          icon: "fa-solid fa-layer-group",
          text: isEn ? "CNC Aluminum + Poron" : "Nhôm CNC + Poron",
          title: isEn ? "Aluminum Case & Poron Dampening" : "Khung Nhôm & Đệm Poron",
          desc: isEn ? "Solid anodized CNC frame combined with high-density Poron foam for signature deep acoustic thock." : "Khung nhôm nguyên khối đầm chắc kết hợp đệm foam Poron triệt tiêu âm vang rỗng, cho âm gõ 'thock' đầm tai."
        }
      ];
    } else if (isPad) {
      chips = [
        {
          type: "speed",
          icon: "fa-solid fa-wind",
          text: isEn ? "Hybrid Speed/Control" : "Hybrid Speed/Control",
          title: isEn ? "Hybrid Micro-Woven Surface" : "Bề mặt dệt Hybrid",
          desc: isEn ? "Micro-knit weave engineered for initial low friction combined with confident stopping power." : "Bề mặt dệt vi sợi tối ưu hóa cân bằng giữa tốc độ lướt ban đầu và lực dừng chính xác khi ngắm bắn."
        },
        {
          type: "ergo",
          icon: "fa-solid fa-border-all",
          text: isEn ? "Sub-Surface Stitching" : "Bo Viền Siêu Phẳng",
          title: isEn ? "Sub-Surface Border" : "Mũi may phẳng chìm",
          desc: isEn ? "Ultra-dense sub-surface stitching sits completely flush, preventing forearm irritation during large swipes." : "Mũi may dập chìm bằng phẳng với mặt pad, không cạ vào cổ tay khi vẩy chuột biên độ lớn."
        },
        {
          type: "ergo",
          icon: "fa-solid fa-grip",
          text: isEn ? "4mm Japanese Poron" : "Đế Poron 4mm",
          title: isEn ? "4mm Suction Foam Base" : "Đế Cao Su Poron 4mm",
          desc: isEn ? "High-grade Japanese Poron rubber grips securely to desks with zero slip under intense load." : "Chất liệu cao su Poron cao cấp bám dính tuyệt đối vào mặt bàn, triệt tiêu hoàn toàn xê dịch."
        }
      ];
    } else {
      chips = [
        {
          type: "speed",
          icon: "fa-solid fa-wifi",
          text: isEn ? "Tri-Mode Wireless (2.4G+BT)" : "Wireless 2.4GHz + BT",
          title: isEn ? "Tournament Tri-Mode Connectivity" : "Kết nối đa kênh eSports",
          desc: isEn ? "Ultra-low latency 2.4GHz eSports wireless, flexible Bluetooth 5.3, and analog 3.5mm wired mode." : "Công nghệ không dây siêu trễ thấp chuẩn thi đấu, hỗ trợ chuyển đổi linh hoạt qua Bluetooth."
        },
        {
          type: "switch",
          icon: "fa-solid fa-battery-full",
          text: isEn ? "70H Battery Life" : "Pin 70 Giờ",
          title: isEn ? "Extended Battery Runtime" : "Thời lượng pin dài",
          desc: isEn ? "Practice and compete for consecutive tournament days without interruptions or battery anxiety." : "Thoải mái tập luyện và thi đấu liên tục nhiều ngày mà không lo gián đoạn."
        }
      ];
    }

    let chipsHtml = "";
    chips.forEach((c) => {
      chipsHtml += `
        <div class="spec-telemetry-chip chip-telemetry-${c.type || "speed"}" tabindex="0" role="button">
          <i class="${c.icon} spec-icon"></i>
          <span>${c.text}</span>
          <i class="fa-regular fa-circle-question chip-info-btn"></i>
          <div class="spec-tooltip">
            <strong>${c.title}</strong>
            ${c.desc}
          </div>
        </div>
      `;
    });
    telemetryContainer.innerHTML = chipsHtml;
  }
  renderTelemetryChips();

  // =========================================================================
  // --- 10. BIẾN THỂ (VARIANTS) ---
  // =========================================================================
  if (colorOptionsRow) {
    colorOptionsRow.addEventListener("click", (e) => {
      const btn = e.target.closest(".color-swatch-btn");
      if (!btn) return;

      const colorVal = btn.getAttribute("data-color");
      const targetSrc = colorVal === "white" && currentProduct.image_hover ? currentProduct.image_hover : currentProduct.image;
      switchGalleryImage(targetSrc, colorVal);
    });
  }

  if (editionOptionsRow) {
    editionOptionsRow.addEventListener("click", (e) => {
      const btn = e.target.closest(".edition-pill-btn");
      if (!btn) return;

      editionOptionsRow.querySelectorAll(".edition-pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      selectedEdition = btn.getAttribute("data-label");
      if (selectedEditionLabel) selectedEditionLabel.textContent = selectedEdition;
    });
  }

  // 11. Số lượng mua
  const updateQty = (val) => {
    if (stockState === "out-of-stock") return;
    quantity = Math.max(1, Math.min(99, val));
    if (qtyInput) qtyInput.value = quantity;
  };

  if (qtyMinus) qtyMinus.addEventListener("click", () => updateQty(quantity - 1));
  if (qtyPlus) qtyPlus.addEventListener("click", () => updateQty(quantity + 1));
  if (qtyInput) {
    qtyInput.addEventListener("change", (e) => {
      const parsed = parseInt(e.target.value, 10);
      updateQty(isNaN(parsed) ? 1 : parsed);
    });
  }

  // 12. Thêm vào giỏ hàng
  if (btnAddToCart) {
    btnAddToCart.addEventListener("click", () => {
      if (stockState === "out-of-stock") return;
      const variantStr = `${selectedColor} | ${selectedEdition}`;
      if (window.addToCart) {
        window.addToCart(currentProduct.id, quantity, true, variantStr);
      }
    });
  }

  // =========================================================================
  // --- 13. EXPRESS CHECKOUT 2 BƯỚC (TÍCH HỢP BỘ THANH TOÁN TOÀN CỤC) ---
  // =========================================================================
  const closeCheckoutModal = () => {
    const modal = document.getElementById("checkout-modal");
    if (modal) modal.style.display = "none";
  };

  const openCheckoutFlow = () => {
    if (stockState === "out-of-stock") return;
    const variantStr = `${selectedColor} | ${selectedEdition}`;
    const unitPrice = currentProduct.sale_price ?? currentProduct.price;

    const singleItem = [{
      id: currentProduct.id,
      name: currentProduct.name,
      image: mainImgEl ? mainImgEl.src : currentProduct.image,
      price: unitPrice,
      quantity: quantity,
      variant: variantStr
    }];

    if (typeof window.openCartCheckoutFlow === "function") {
      window.openCartCheckoutFlow(singleItem, false);
    }
  };

  if (btnBuyNow) {
    btnBuyNow.addEventListener("click", openCheckoutFlow);
  }

  // =========================================================================
  // --- 14. BACK-IN-STOCK ALERT MODAL (LEAD CAPTURE CHO HẾT HÀNG) ---
  // =========================================================================
  const alertModal = document.getElementById("stock-alert-modal");
  const alertCloseBtn = document.getElementById("stock-alert-close");
  const alertForm = document.getElementById("stock-alert-form");
  const alertPreview = document.getElementById("alert-product-preview");

  if (btnNotify) {
    btnNotify.addEventListener("click", () => {
      if (alertPreview) {
        const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
        const pName = window.getProductName ? window.getProductName(currentProduct) : currentProduct.name;
        alertPreview.innerHTML = `
          <div class="alert-preview-card">
            <img class="alert-preview-img" src="${mainImgEl.src}" alt="${pName}">
            <div class="alert-preview-info">
              <strong class="alert-preview-name">${pName}</strong>
              <span class="alert-preview-variant">${isEn ? "Edition:" : "Phiên bản:"} ${selectedColor}</span>
            </div>
          </div>
        `;
      }
      if (alertModal) alertModal.style.display = "flex";
    });
  }

  if (alertCloseBtn) {
    alertCloseBtn.addEventListener("click", () => {
      if (alertModal) alertModal.style.display = "none";
    });
  }

  if (alertForm) {
    alertForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const aName = document.getElementById("alert-name").value;
      const aEmail = document.getElementById("alert-email").value;
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      if (alertModal) alertModal.style.display = "none";
      if (window.showToast) {
        const msg = isEn
          ? `Thank you ${aName}! Blue will send an email alert to ${aEmail} the moment gear arrives.`
          : `Cảm ơn ${aName}! Blue sẽ gửi thông báo đến ${aEmail} ngay khi có hàng.`;
        window.showToast(msg, "success", 4000);
      }
      alertForm.reset();
    });
  }

  // =========================================================================
  // --- 15. MACRO ZOOM LIGHTBOX MODAL (DELIGHT) ---
  // =========================================================================
  const lightboxModal = document.getElementById("img-lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (mainImgBox) {
    mainImgBox.addEventListener("click", (e) => {
      if (e.target.closest("#detail-wishlist-btn")) return;
      if (lightboxModal && lightboxImg) {
        lightboxImg.src = mainImgEl.src;
        if (lightboxCaption) {
          const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
          const pName = window.getProductName ? window.getProductName(currentProduct) : currentProduct.name;
          lightboxCaption.textContent = isEn
            ? `${pName} - Macro Close-up Coating & eSports Switch Details`
            : `${pName} - Soi chi tiết bề mặt Coating & Switch eSports`;
        }
        lightboxModal.style.display = "flex";
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      if (lightboxModal) lightboxModal.style.display = "none";
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) lightboxModal.style.display = "none";
    });
  }

  // =========================================================================
  // --- 16. STICKY MOBILE BUY BAR (ADAPT - STOCK AWARE) ---
  // =========================================================================
  const stickyBar = document.getElementById("mobile-sticky-bar");
  const stickyImg = document.getElementById("mobile-sticky-img");
  const stickyName = document.getElementById("mobile-sticky-name");
  const stickyPrice = document.getElementById("mobile-sticky-price");
  const stickyAddCart = document.getElementById("mobile-sticky-add-cart");
  const stickyBuyNow = document.getElementById("mobile-sticky-buynow");

  if (stickyBar) {
    const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
    const pName = window.getProductName ? window.getProductName(currentProduct) : currentProduct.name;
    if (stickyImg) stickyImg.src = currentProduct.image;
    if (stickyName) stickyName.textContent = pName;
    if (stickyPrice) stickyPrice.textContent = (window.I18N && window.I18N.formatCurrency) ? window.I18N.formatCurrency(currentProduct.sale_price ?? currentProduct.price) : format(currentProduct.sale_price ?? currentProduct.price);

    if (stockState === "out-of-stock") {
      if (stickyAddCart) stickyAddCart.style.display = "none";
      if (stickyBuyNow) {
        stickyBuyNow.textContent = isEn ? "Notify When Available" : "Báo Khi Có Hàng";
        stickyBuyNow.classList.add("btn-sticky-notify");
        stickyBuyNow.addEventListener("click", () => {
          if (btnNotify) btnNotify.click();
        });
      }
    } else {
      if (stockState === "pre-order") {
        if (stickyBuyNow) stickyBuyNow.textContent = isEn ? "Pre-Order Now" : "Đặt Hàng Trước";
      } else {
        if (stickyBuyNow) stickyBuyNow.textContent = isEn ? "Buy Now" : "Mua Ngay";
      }
      if (stickyAddCart) {
        stickyAddCart.addEventListener("click", () => {
          const variantStr = `${selectedColor} | ${selectedEdition}`;
          if (window.addToCart) window.addToCart(currentProduct.id, 1, true, variantStr);
        });
      }
      if (stickyBuyNow) {
        stickyBuyNow.addEventListener("click", openCheckoutFlow);
      }
    }

    window.addEventListener("scroll", () => {
      if (window.innerWidth <= 768) {
        const ctaTarget = stockState === "out-of-stock" ? btnNotify : btnBuyNow;
        const ctaRect = ctaTarget ? ctaTarget.getBoundingClientRect() : null;
        if (ctaRect && ctaRect.bottom < 0) {
          stickyBar.style.display = "block";
        } else {
          stickyBar.style.display = "none";
        }
      } else {
        stickyBar.style.display = "none";
      }
    });
  }

  // =========================================================================
  // --- 17. KEYBOARD SHORTCUTS ACCELERATORS (ALEX) ---
  // =========================================================================
  document.addEventListener("keydown", (e) => {
    // Không nhận phím tắt nếu người dùng đang gõ trong input hoặc textarea
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

    if (e.key === "Escape") {
      closeCheckoutModal();
      if (alertModal) alertModal.style.display = "none";
      if (lightboxModal) lightboxModal.style.display = "none";
    } else if (e.key === "ArrowLeft") {
      switchGalleryImage(productImages[0].src, "black");
    } else if (e.key === "ArrowRight") {
      switchGalleryImage(productImages[1].src, "white");
    } else if (e.key === "1") {
      switchGalleryImage(productImages[0].src, "black");
      if (window.showToast) window.showToast("Đã chọn màu: Đen nhám [Phím 1]", "info", 1500);
    } else if (e.key === "2") {
      switchGalleryImage(productImages[1].src, "white");
      if (window.showToast) window.showToast("Đã chọn màu: Trắng băng [Phím 2]", "info", 1500);
    } else if (e.key === "Enter") {
      e.preventDefault();
      openCheckoutFlow();
    }
  });

  // =========================================================================
  // --- 18. JUMP LINK ĐÁNH GIÁ (JORDAN & ALEX) ---
  // =========================================================================
  if (ratingJumpBtn) {
    ratingJumpBtn.addEventListener("click", () => {
      const reviewsTabBtn = document.getElementById("tab-nav-reviews");
      if (reviewsTabBtn) {
        reviewsTabBtn.click();
        const tabsSection = document.querySelector(".detail-tabs-section");
        if (tabsSection) {
          const headerOffset = 90;
          const elementPosition = tabsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  }

  // 19. Nút Yêu thích (Persistent Wishlist via localStorage)
  const getStoredWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem("blue_wishlist") || "[]");
    } catch (e) {
      return [];
    }
  };

  const setStoredWishlist = (list) => {
    try {
      localStorage.setItem("blue_wishlist", JSON.stringify(list));
    } catch (e) {}
  };

  if (wishlistBtn) {
    const heartIcon = wishlistBtn.querySelector("i");
    const initList = getStoredWishlist();
    const pidStr = String(currentProduct.id);
    if (initList.includes(pidStr) && heartIcon) {
      heartIcon.classList.remove("fa-regular");
      heartIcon.classList.add("fa-solid");
      wishlistBtn.style.color = "#dc2626";
      wishlistBtn.setAttribute("aria-label", "Xóa khỏi danh sách yêu thích");
    }

    wishlistBtn.addEventListener("click", () => {
      if (heartIcon) {
        let list = getStoredWishlist();
        const isFav = heartIcon.classList.contains("fa-solid");
        if (isFav) {
          list = list.filter((id) => id !== pidStr);
          setStoredWishlist(list);
          heartIcon.classList.remove("fa-solid");
          heartIcon.classList.add("fa-regular");
          wishlistBtn.style.color = "#64748b";
          wishlistBtn.setAttribute("aria-label", "Lưu vào yêu thích");
          if (window.showToast) window.showToast("Đã xóa khỏi danh sách yêu thích", "info");
        } else {
          if (!list.includes(pidStr)) list.push(pidStr);
          setStoredWishlist(list);
          heartIcon.classList.remove("fa-regular");
          heartIcon.classList.add("fa-solid");
          wishlistBtn.style.color = "#dc2626";
          wishlistBtn.setAttribute("aria-label", "Xóa khỏi danh sách yêu thích");
          if (window.showToast) window.showToast("Đã lưu vào danh sách yêu thích! ❤️", "success");
        }
      }
    });
  }

  // 20. Bảng Thông số kỹ thuật chi tiết
  function renderSpecsTable() {
    if (!specsTableBody) return;
    const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
    const isMouse = currentProduct.category === "Chuột";
    const isKeyboard = currentProduct.category === "Bàn phím";
    const isPad = currentProduct.category === "Lót chuột";

    const catName = isEn ? (window.getCategoryName ? window.getCategoryName(currentProduct.category) : currentProduct.category) : (currentProduct.category || "Gaming Gear");

    let specs = [
      { name: isEn ? "Brand" : "Thương hiệu", value: currentProduct.name.split(" ")[0] || (isEn ? "Official" : "Chính hãng") },
      { name: isEn ? "Category" : "Phân loại", value: catName },
      { name: isEn ? "Condition" : "Tình trạng", value: stockState === "pre-order" ? (isEn ? "Official Pre-Order" : "Hàng đặt trước chính hãng") : (isEn ? "100% Brand New In Box, Authorized Import" : "Mới 100% nguyên hộp, phân phối chính ngạch") },
      { name: isEn ? "Warranty" : "Chế độ bảo hành", value: isEn ? "24-Month Official 1:1 Replacement" : "24 tháng 1 đổi 1 chính hãng" },
    ];

    if (isMouse) {
      specs.push(
        { name: isEn ? "Sensor" : "Cảm biến (Sensor)", value: isEn ? "PixArt PAW3395 (26,000 DPI, 650 IPS, 50G Acceleration)" : "PixArt PAW3395 (26.000 DPI, 650 IPS, 50G gia tốc)" },
        { name: isEn ? "Polling Rate" : "Tần số gửi tín hiệu", value: isEn ? "Supported 1000Hz - 8000Hz (0.125ms Ultra-Low Latency)" : "Hỗ trợ 1000Hz - 8000Hz (Độ trễ phản hồi chỉ 0.125ms)" },
        { name: isEn ? "Tournament Weight" : "Trọng lượng thi đấu", value: isEn ? "Ultralight (~49g - 54g Balanced Center of Gravity)" : "Siêu nhẹ (~49g - 54g phân bổ trọng tâm cân bằng)" },
        { name: isEn ? "Main Switches" : "Switch chính", value: isEn ? "Omron Optical Switches (100M Click Durability)" : "Omron Optical Switches độ bền 100 triệu lượt click" },
        { name: isEn ? "Mouse Skates" : "Feet chuột", value: isEn ? "100% Pure Virgin PTFE Curved Edges" : "100% PTFE nguyên chất viền cong trơn tru" }
      );
    } else if (isKeyboard) {
      specs.push(
        { name: isEn ? "Layout" : "Layout", value: isEn ? "TKL / 75% Compact Layout for Optimal Desk Space" : "TKL / 75% gọn gàng tối ưu diện tích di chuột eSports" },
        { name: isEn ? "Switch Technology" : "Công nghệ Switch", value: isEn ? "Magnetic Hall Effect (Non-Mechanical Contact)" : "Magnetic Hall Effect (Không tiếp điểm cơ học)" },
        { name: isEn ? "eSports Features" : "Tính năng eSports", value: isEn ? "Rapid Trigger (0.1mm - 4.0mm), Dynamic Keystroke (DKS)" : "Rapid Trigger (0.1mm - 4.0mm), Dynamic Keystroke (DKS)" },
        { name: isEn ? "Keycaps" : "Keycap", value: isEn ? "PBT Double-Shot Shine & Wear Resistant" : "PBT Double-shot chống bóng và mờ ký tự" },
        { name: isEn ? "Chassis Build" : "Cấu trúc vỏ", value: isEn ? "CNC Anodized Aluminum + Poron Acoustic Gaskets" : "Khung nhôm CNC cao cấp + Đệm tiêu âm Poron" }
      );
    } else if (isPad) {
      specs.push(
        { name: isEn ? "Surface Material" : "Chất liệu bề mặt", value: isEn ? "Micro-Woven Hybrid Fabric (Speed & Control Balanced)" : "Vải dệt vi sợi Hybrid Speed & Control cân bằng" },
        { name: isEn ? "Base Material" : "Chất liệu đế", value: isEn ? "Premium Japanese PORON Foam (Zero Slip)" : "Cao su PORON cao cấp chống trượt tuyệt đối trên mặt bàn" },
        { name: isEn ? "Stitching" : "Viền bo", value: isEn ? "Low-Profile Sub-Surface Micro-Stitching" : "May bo viền phẳng dập thấp chống cấn cổ tay" },
        { name: isEn ? "Dimensions" : "Kích thước tiêu chuẩn", value: isEn ? "XL (490 x 420mm) - 4mm Thickness" : "XL (490 x 420mm) - Độ dày 4mm" }
      );
    } else {
      specs.push(
        { name: isEn ? "Connectivity" : "Kết nối", value: isEn ? "Tri-Mode (Wireless 2.4GHz + BT 5.3 + 3.5mm)" : "Wireless 2.4GHz + Bluetooth 5.3 + Jack 3.5mm" },
        { name: isEn ? "Battery Life" : "Thời lượng pin", value: isEn ? "Up to 50 - 70 Hours Continuous Play" : "Lên đến 50 - 70 giờ sử dụng liên tục" },
        { name: isEn ? "Ear Cushions" : "Đệm tai", value: isEn ? "Breathable Memory Foam Mesh (Passive Isolation)" : "Memory Foam bọc vải dệt thoáng khí, cách âm thụ động" }
      );
    }

    let tbodyHtml = "";
    specs.forEach((s) => {
      tbodyHtml += `
        <tr>
          <td class="spec-name">${s.name}</td>
          <td class="spec-value">${s.value}</td>
        </tr>
      `;
    });
    specsTableBody.innerHTML = tbodyHtml;
  }
  renderSpecsTable();

  // 21. Tabs Navigation (Hỗ trợ 4 tabs: Mô tả, Thông số, Chính sách, Đánh giá)
  const tabBtns = document.querySelectorAll(".tab-nav-btn");
  const tabPanes = document.querySelectorAll(".detail-tab-pane");

  tabBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.getAttribute("data-tab");
      tabBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanes.forEach((p) => {
        p.classList.remove("active");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) targetPane.classList.add("active");
    });

    // Phím tắt mũi tên chuyển tab (WAI-ARIA Tabs pattern)
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx = (idx + 1) % tabBtns.length;
        tabBtns[nextIdx].focus();
        tabBtns[nextIdx].click();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIdx = (idx - 1 + tabBtns.length) % tabBtns.length;
        tabBtns[prevIdx].focus();
        tabBtns[prevIdx].click();
      }
    });
  });

  // 22. Render Sản phẩm cùng danh mục (Related Products)
  function renderRelatedProducts() {
    if (!relatedGrid) return;
    const relatedList = allCatalog
      .filter((p) => p.category === currentProduct.category && p.id.toString() !== currentProduct.id.toString())
      .slice(0, 4);

    if (relatedList.length > 0) {
      const userWishlist = getStoredWishlist();
      let rHtml = "";
      relatedList.forEach((prod) => {
        const isRelSale = prod.sale_price !== null && prod.sale_price !== undefined;
        let badgeHtml = "";
        if (isRelSale) {
          const discount = Math.round(((prod.price - prod.sale_price) / prod.price) * 100);
          badgeHtml = `<div class="card-badge sale-badge">-${discount}%</div>`;
        }

        let priceHtml = "";
        if (isRelSale) {
          priceHtml = `
            <div class="card-price">
              <span class="old-price">${format(prod.price)}</span>
              <span class="new-price">${format(prod.sale_price)}</span>
            </div>`;
        } else {
          priceHtml = `<div class="card-price">${format(prod.price)}</div>`;
        }

        const isHeartActive = userWishlist.includes(String(prod.id));
        const rName = window.getProductName ? window.getProductName(prod) : prod.name;

        rHtml += `
          <div class="product-item" data-product-id="${prod.id}">
            <div class="card-image-wrapper">
              ${badgeHtml}
              <button class="card-heart ${isHeartActive ? "active" : ""}" data-id="${prod.id}" aria-label="Yêu thích" style="${isHeartActive ? "color: #ef4444;" : ""}">
                <i class="${isHeartActive ? "fa-solid" : "fa-regular"} fa-heart"></i>
              </button>
              <div class="image-swap-container">
                <img class="main-img" src="${prod.image}" alt="${rName}" loading="lazy">
                <img class="hover-img" src="${prod.image_hover || prod.image}" alt="${rName}" loading="lazy">
              </div>
              <button class="add-to-cart-btn" data-id="${prod.id}">
                <i class="fa-solid fa-cart-plus" style="margin-right: 6px;"></i>${window.I18N ? window.I18N.t("addToCartBtn") : "Add to Cart"}
              </button>
            </div>
            <div class="card-info">
              <h3 title="${rName}">${rName}</h3>
              ${priceHtml}
            </div>
          </div>
        `;
      });
      relatedGrid.innerHTML = rHtml;
    } else {
      const relSec = document.querySelector(".related-products-section");
      if (relSec) relSec.style.display = "none";
    }
  }

  if (relatedGrid) {
    renderRelatedProducts();
    relatedGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".product-item");
      if (!card) return;
      if (e.target.closest(".add-to-cart-btn, .card-heart")) return;
      const pid = card.getAttribute("data-product-id");
      if (pid) window.location.href = `product-detail.html?id=${pid}`;
    });
  }

  // 23. Lắng nghe sự kiện đổi ngôn ngữ để cập nhật giá tiền tức thì
  window.addEventListener("blue:language-change", () => {
    updateDetailTextInfo();
    updateStockBadge();
    renderDetailPrices();
    renderTelemetryChips();
    renderSpecsTable();
    renderRelatedProducts();
  });
});
