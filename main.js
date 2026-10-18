// Dữ liệu sản phẩm được nạp động từ Backend/db.json qua JSON-Server API hoặc products.json
let allProducts = [];

// Định dạng tiền tệ theo ngôn ngữ được nạp từ i18n.js
function formatCurrency(amount) {
  if (typeof window.formatCurrency === "function" && window.formatCurrency !== formatCurrency) {
    return window.formatCurrency(amount);
  }
  const currentLang = localStorage.getItem("blue_language") || "en";
  if (amount === null || amount === undefined || isNaN(amount)) {
    return currentLang === "en" ? "$0.00" : "0₫";
  }
  if (currentLang === "en") {
    const usd = amount / 25000;
    return `$${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${amount.toLocaleString("vi-VN")}₫`;
}
window.formatCurrency = formatCurrency;

function renderProducts(products, container) {
  const containerElement = document.querySelector(container);
  if (!containerElement) return;
  let html = "";
  products.forEach((product) => {
    const isNew = container === ".product-new";
    const newBadge = isNew ? `<div class="card-badge new-badge">New</div>` : "";

    // Xử lý logic giá tiền VND
    let priceHtml = "";
    if (product.sale_price !== null && product.sale_price !== undefined) {
      priceHtml = `<div class="card-price"><span class="old-price">${formatCurrency(product.price)}</span> <span class="new-price">${formatCurrency(product.sale_price)}</span></div>`;
    } else {
      priceHtml = `<div class="card-price">${formatCurrency(product.price)}</div>`;
    }

    const pName = window.getProductName ? window.getProductName(product) : product.name;
    html += `
        <div class="product-item" data-product-id="${product.id}">
            <div class="card-image-wrapper">
                ${newBadge}
                <button class="card-heart" data-id="${product.id}" aria-label="Yêu thích"><i class="fa-regular fa-heart"></i></button>
                <div class="image-swap-container">
                    <img class="main-img" src="${product.image}" alt="${pName}" loading="lazy">
                    <img class="hover-img" src="${product.image_hover || product.image}" alt="${pName}" loading="lazy">
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                  <i class="fa-solid fa-cart-plus" style="margin-right: 6px;"></i><span>${window.I18N && window.I18N.t ? window.I18N.t("addToCartBtn") : "Thêm Vào Giỏ Hàng"}</span>
                </button>
            </div>
            <div class="card-info">
                <h3 title="${pName}">${pName}</h3>
                ${priceHtml}
            </div>
        </div>
    `;
  });
  containerElement.innerHTML = html;
}

// Trạng thái của Mega Menu Carousel
let currentMegaCategory = "Chuột";
let currentMegaPageIndex = 0;
let currentMegaFiltered = [];

// Hàm cập nhật vị trí trượt và trạng thái nút điều khiển của Mega Menu Carousel
function updateMegaCarousel(pageIndex = 0) {
  const container = document.getElementById("mega-products");
  const prevBtn = document.getElementById("mega-prev-btn") || document.querySelector(".mega-carousel-controls .carousel-btn:first-child");
  const nextBtn = document.getElementById("mega-next-btn") || document.querySelector(".mega-carousel-controls .carousel-btn:last-child");
  if (!container) return;

  const totalItems = currentMegaFiltered.length;
  const VISIBLE_COUNT = 6;
  const totalPages = Math.ceil(totalItems / VISIBLE_COUNT);

  currentMegaPageIndex = Math.max(0, Math.min(pageIndex, Math.max(0, totalPages - 1)));

  // Tính toán stride (1 thẻ + khoảng cách 15px)
  let stride = 0;
  const firstCard = container.querySelector(".mega-product-card");
  if (firstCard && firstCard.offsetWidth > 0) {
    stride = firstCard.offsetWidth + 15;
  } else {
    const viewport = container.closest(".mega-products-viewport");
    const vpWidth = viewport ? viewport.offsetWidth : (container.parentElement ? container.parentElement.offsetWidth : 0);
    if (vpWidth > 0) {
      stride = (vpWidth - 75) / 6 + 15;
    }
  }

  let offset = 0;
  if (totalPages <= 1 || totalItems <= VISIBLE_COUNT || stride <= 0) {
    offset = 0;
  } else if (currentMegaPageIndex === 0) {
    offset = 0;
  } else if (currentMegaPageIndex === totalPages - 1) {
    // Trang cuối: slide vừa đủ để 6 thẻ cuối cùng hiển thị lấp đầy toàn bộ hàng
    offset = (totalItems - VISIBLE_COUNT) * stride;
  } else {
    offset = currentMegaPageIndex * VISIBLE_COUNT * stride;
  }

  container.style.transform = `translateX(-${Math.max(0, offset)}px)`;

  // Cập nhật trạng thái disabled cho 2 nút
  if (prevBtn) {
    const isPrevDisabled = currentMegaPageIndex === 0 || totalItems <= VISIBLE_COUNT;
    prevBtn.disabled = isPrevDisabled;
    prevBtn.classList.toggle("disabled", isPrevDisabled);
  }

  if (nextBtn) {
    const isNextDisabled = currentMegaPageIndex >= totalPages - 1 || totalItems <= VISIBLE_COUNT;
    nextBtn.disabled = isNextDisabled;
    nextBtn.classList.toggle("disabled", isNextDisabled);
  }
}

// Hàm render dữ liệu vào Mega Menu
function renderMegaMenu(category) {
  if (category) {
    currentMegaCategory = category;
  }
  const targetCategory = category || currentMegaCategory;
  const container = document.getElementById("mega-products");
  const title = document.getElementById("mega-current-cat") || document.getElementById("mega-category-title");
  const viewAllBtn = document.querySelector("#mega-menu .view-all") || document.querySelector("#mega-menu .view-all-link");
  if (!container) return;

  let filtered = allProducts;
  if (targetCategory && targetCategory !== "all") {
    filtered = allProducts.filter((p) => p.category === targetCategory);
  }

  if (filtered.length === 0 && allProducts.length > 0) {
    filtered = allProducts.filter((p) => p.hot === true);
    if (filtered.length === 0) filtered = allProducts;
  }

  currentMegaFiltered = filtered;
  currentMegaPageIndex = 0;

  let html = "";
  filtered.forEach((p) => {
    const pName = window.getProductName ? window.getProductName(p) : p.name;
    html += `
          <div class="mega-product-card" data-id="${p.id}" title="${pName}">
              <div class="mega-img-wrapper">
                  <img src="${p.image}" alt="${pName}" loading="lazy">
              </div>
              <p class="mega-product-name">${pName}</p>
          </div>
      `;
  });
  container.innerHTML = html;

  if (title) {
    const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
    const catMapEn = {
      "Chuột": "MICE",
      "Bàn phím": "KEYBOARDS",
      "Lót chuột": "MOUSEPADS",
      "Tai nghe": "HEADSETS",
      "Tay cầm": "CONTROLLERS",
      "Controller": "CONTROLLERS",
      "Phụ kiện": "ACCESSORIES",
      "Accessories": "ACCESSORIES",
      "Gift Cards": "GIFT CARDS",
      "all": "ALL PRODUCTS"
    };
    if (isEn) {
      title.textContent = catMapEn[targetCategory] || (targetCategory === "all" || !targetCategory ? "ALL PRODUCTS" : targetCategory.toUpperCase());
    } else {
      title.textContent = (targetCategory === "all" || !targetCategory ? "TẤT CẢ SẢN PHẨM" : targetCategory).toUpperCase();
    }
  }

  if (viewAllBtn) {
    if (targetCategory === "all" || !targetCategory) {
      viewAllBtn.href = "products.html";
    } else {
      viewAllBtn.href = `products.html?category=${encodeURIComponent(targetCategory)}`;
    }
  }

  // Cập nhật trạng thái hiển thị và vị trí của Carousel
  updateMegaCarousel(0);
}

async function getProducts() {
  let loadedProducts = null;

  // 1. Thử kết nối JSON-Server nếu đang ở môi trường local
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (response.ok) {
        loadedProducts = await response.json();
      }
    } catch (error) {
      // JSON-Server chưa bật hoặc lỗi kết nối, tự động chuyển sang đọc file tĩnh
    }
  }

  // 2. Môi trường Production (GitHub Pages, Vercel, Netlify) hoặc khi JSON-Server không chạy
  if (!loadedProducts || loadedProducts.length === 0) {
    try {
      const staticResponse = await fetch("products.json");
      if (staticResponse.ok) {
        const data = await staticResponse.json();
        loadedProducts = Array.isArray(data) ? data : (data && data.products ? data.products : []);
      }
    } catch (err) {
      console.warn("Lỗi nạp products.json:", err.message);
    }
  }

  allProducts = loadedProducts || [];
  window.allProducts = allProducts;

  // Khởi tạo Mega Menu với danh mục Chuột mặc định
  renderMegaMenu("Chuột");

  // Giới hạn hiển thị đúng tối đa 4 sản phẩm ở mỗi mục như cũ
  const hotProducts = allProducts.filter((item) => item.hot === true).slice(0, 4);
  renderProducts(hotProducts, ".product-hot");

  // Lấy 4 sản phẩm mới nhất dựa theo ID lớn nhất giảm dần trong database
  const newProducts = [...allProducts]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4);
  renderProducts(newProducts, ".product-new");

  const saleProducts = allProducts
    .filter((item) => item.sale_price !== null && item.sale_price !== undefined)
    .slice(0, 4);
  renderProducts(saleProducts, ".product-sale");
}
getProducts();

// Lắng nghe sự kiện đổi ngôn ngữ toàn cục để cập nhật lại sản phẩm và giỏ hàng
window.addEventListener("blue:language-change", () => {
  if (allProducts && allProducts.length > 0) {
    const hotProducts = allProducts.filter((item) => item.hot === true).slice(0, 4);
    renderProducts(hotProducts, ".product-hot");

    const newProducts = [...allProducts]
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 4);
    renderProducts(newProducts, ".product-new");

    const saleProducts = allProducts
      .filter((item) => item.sale_price !== null && item.sale_price !== undefined)
      .slice(0, 4);
    renderProducts(saleProducts, ".product-sale");

    if (typeof renderMegaMenu === "function") {
      renderMegaMenu(currentMegaCategory);
    }
    if (typeof updateCartUI === "function") {
      updateCartUI();
    }
  }
  if (typeof window.renderHeroCarousel === "function") {
    window.renderHeroCarousel();
  }
});

// --- Logic giao diện Mega Menu (Hover tất cả các mục header: Tất cả sản phẩm, Chuột, Bàn phím, Lót chuột) ---
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");
  const megaTriggers = document.querySelectorAll(".nav-links a[data-mega]");
  const catItems = document.querySelectorAll(".cat-item");
  const allNavLinks = document.querySelectorAll(".nav-links a");
  let hoverTimeout;

  function activateMegaCategory(catId, triggerElement) {
    clearTimeout(hoverTimeout);

    // Cập nhật đường kẻ active-underline cho nav link trên header
    allNavLinks.forEach((link) => link.classList.remove("active-underline"));
    if (triggerElement) {
      triggerElement.classList.add("active-underline");
    } else {
      const matchingTrigger = document.querySelector(`.nav-links a[data-mega="${catId}"]`);
      if (matchingTrigger) {
        matchingTrigger.classList.add("active-underline");
      } else if (catId === "all") {
        const allTrigger = document.querySelector('.nav-links a[data-mega="all"]');
        if (allTrigger) allTrigger.classList.add("active-underline");
      }
    }

    // Xác định danh mục render
    const categoryToRender = catId === "all" ? "Chuột" : catId;
    renderMegaMenu(categoryToRender);

    // Đồng bộ đường kẻ inner line (::before) và trạng thái active trong sidebar
    catItems.forEach((ci) => {
      const ciId = ci.getAttribute("data-id");
      if (ciId === categoryToRender) {
        ci.classList.add("active");
      } else {
        ci.classList.remove("active");
      }
    });

    if (header) {
      header.classList.add("mega-open");
      requestAnimationFrame(() => {
        updateMegaCarousel(currentMegaPageIndex);
      });
    }
  }

  // Lắng nghe click nút điều hướng carousel trong dropdown Mega Menu (Trái / Phải)
  document.addEventListener("click", (e) => {
    const prevBtn = e.target.closest("#mega-prev-btn, .mega-carousel-controls .mega-prev-btn, .mega-carousel-controls .carousel-btn:first-child");
    if (prevBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (!prevBtn.disabled && currentMegaPageIndex > 0) {
        currentMegaPageIndex--;
        updateMegaCarousel(currentMegaPageIndex);
      }
      return;
    }

    const nextBtn = e.target.closest("#mega-next-btn, .mega-carousel-controls .mega-next-btn, .mega-carousel-controls .carousel-btn:last-child");
    if (nextBtn) {
      e.preventDefault();
      e.stopPropagation();
      const totalItems = currentMegaFiltered.length;
      const VISIBLE_COUNT = 6;
      const totalPages = Math.ceil(totalItems / VISIBLE_COUNT);
      if (!nextBtn.disabled && currentMegaPageIndex < totalPages - 1) {
        currentMegaPageIndex++;
        updateMegaCarousel(currentMegaPageIndex);
      }
      return;
    }
  });

  // Tự động căn chỉnh lại khi thay đổi kích thước màn hình
  let megaResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(megaResizeTimer);
    megaResizeTimer = setTimeout(() => {
      updateMegaCarousel(currentMegaPageIndex);
    }, 120);
  });

  // Lắng nghe khi trỏ chuột vào các mục header (Tất cả sản phẩm, Chuột, Bàn phím, Lót chuột)
  megaTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => {
      const cat = trigger.getAttribute("data-mega");
      activateMegaCategory(cat, trigger);
    });
  });

  // Lắng nghe khi trỏ chuột vào các mục trong sidebar của dropdown Mega Menu
  catItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const catId = item.getAttribute("data-id");
      activateMegaCategory(catId, null);
    });
  });

  // Khi trỏ chuột vào các mục nav khác không có dropdown (Ưu đãi, Hỗ trợ) -> đóng dropdown
  const nonMegaLinks = document.querySelectorAll(".nav-links a:not([data-mega])");
  nonMegaLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (header) header.classList.remove("mega-open");
      allNavLinks.forEach((l) => l.classList.remove("active-underline"));
    });
  });

  // Khi rời chuột khỏi toàn bộ header và dropdown
  if (header) {
    header.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        header.classList.remove("mega-open");
        allNavLinks.forEach((l) => l.classList.remove("active-underline"));
      }, 180);
    });

    header.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
    });
  }
});

// ==========================================
// --- HERO CAROUSEL BANNER LOGIC ---
// ==========================================
// Bọc trong IIFE để tránh xung đột với các hàm hiện có
(() => {
  const heroSlideImages = [
    "https://www.atk.store/cdn/shop/files/c5fffce82cca11be1e96b75a10a809f2.png?v=1779182532&width=1200",
    "https://www.atk.store/cdn/shop/files/20260714-191013.jpg?v=1784027464&width=1200",
    "https://www.atk.store/cdn/shop/files/b987fbdf989c16ab216fb7d2fec77348_70a6cff7-4f3c-4c0f-a58b-c1633a4159e9.png?v=1776050485&width=1200",
    "https://file.hstatic.net/200000722513/file/chuot-atk-blazing-sky-f1-pro-max-black-3_cb1dd62479f64bf485e925bdfebde9a9.png"
  ];

  function getHeroSlides() {
    const lang = (window.I18N && window.I18N.getCurrentLang) ? window.I18N.getCurrentLang() : (localStorage.getItem("blue_language") || "en");
    const data = (window.I18N && window.I18N.getData) ? window.I18N.getData() : null;
    const slides = (data && data[lang] && data[lang].heroSlides) ? data[lang].heroSlides : null;
    if (slides && slides.length > 0) {
      return slides.map((s, idx) => ({
        ...s,
        id: idx + 1,
        image: heroSlideImages[idx] || heroSlideImages[0]
      }));
    }
    return [
      {
        id: 1,
        title: "ZERO+",
        subtitle: lang === "en" ? "Ultralight Wireless eSports Gaming Mouse" : "Chuột Gaming Không Dây Siêu Nhẹ Chuẩn eSports",
        slogan: lang === "en" ? "Lightning Reflexes &nbsp;&nbsp;&nbsp; Absolute Victory" : "Phản xạ thần tốc &nbsp;&nbsp;&nbsp; Chiến thắng tuyệt đối",
        promo: lang === "en" ? "SAVE UP TO $16.00" : "TIẾT KIỆM ĐẾN 400.000₫",
        badge: lang === "en" ? "Includes 2 Free Gifts: eSports Gaming Sleeve + ATK Magnetic Opener" : "Tặng Kèm 2 Quà Tặng: Bao tay thi đấu eSports + Khui mở từ tính ATK",
        image: heroSlideImages[0],
        ctaText: lang === "en" ? "Explore Gaming Mice" : "Khám Phá Chuột Gaming",
        link: "products.html?category=Chuột"
      },
      {
        id: 2,
        title: "BLAZING SKY",
        subtitle: lang === "en" ? "True 8000Hz Ultra-Polling Wireless Gaming Mouse" : "Chuột Không Dây Tần Số Phản Hồi Cực Đại 8000Hz",
        slogan: lang === "en" ? "Break All Limits in Competitive Gaming" : "Bứt Phá Mọi Giới Hạn Thi Đấu Chuyên Nghiệp",
        promo: lang === "en" ? "STARTING AT $59.60" : "CHỈ TỪ 1.490.000₫",
        badge: lang === "en" ? "Free Insured Express Delivery on Today's Orders" : "Miễn Phí Giao Hàng Toàn Quốc Cho Đơn Hôm Nay",
        image: heroSlideImages[1],
        ctaText: lang === "en" ? "Shop Now Today" : "Mua Ngay Hôm Nay",
        link: "product-detail.html?id=26"
      },
      {
        id: 3,
        title: "ATK68",
        subtitle: lang === "en" ? "Magnetic Hall Effect eSports Mechanical Keyboard" : "Bàn Phím Từ Tính Rapid Trigger Siêu Nhạy 0.1mm",
        slogan: lang === "en" ? "Rapid Trigger 0.1mm &nbsp;&nbsp;&nbsp; Ultra-Low Latency" : "Công Nghệ Rapid Trigger Định Đoạt Chiến Thắng",
        promo: lang === "en" ? "OFFICIAL 24-MONTH REPLACEMENT WARRANTY" : "TIẾT KIỆM 360.000₫",
        badge: lang === "en" ? "Gift: Premium Coiled Cable & Switch Puller" : "Tặng Kèm Dây Cáp Xoắn Coiled Cable Cao Cấp",
        image: heroSlideImages[2],
        ctaText: lang === "en" ? "Explore Keyboards" : "Xem Chi Tiết ATK68",
        link: "products.html?category=Bàn%20phím"
      },
      {
        id: 4,
        title: "VXE MAD R",
        subtitle: lang === "en" ? "Ultralight 39g Wireless Gaming Mouse with PAW3395" : "Chuột Không Dây Trọng Lượng Siêu Nhẹ 39g Mắt Đọc PAW3395",
        slogan: lang === "en" ? "Dominate Every FPS Battlefield" : "Làm Chủ Mọi Đấu Trường FPS Đỉnh Cao",
        promo: lang === "en" ? "STARTING AT $35.60" : "CHỈ TỪ 890.000₫",
        badge: lang === "en" ? "Trusted by World-Class eSports Champions" : "Được Tin Dùng Bởi Tuyển Thủ eSports Hàng Đầu",
        image: heroSlideImages[3],
        ctaText: lang === "en" ? "Shop Now $35.60" : "Săn Ngay 890K",
        link: "products.html?category=Chuột"
      }
    ];
  }

  const SLIDE_DURATION = 4000; // 4 giây hiển thị mỗi banner theo yêu cầu
  let currentSlide = 0;
  let rafId = null;
  let startTime = null;
  let elapsedBeforePause = 0;
  let isPaused = false;
  let heroSlidesData = [];

  function renderHeroCarousel() {
    const wrapper = document.getElementById("hero-slides-wrapper");
    const indicatorsContainer = document.getElementById("hero-indicators");

    if (!wrapper || !indicatorsContainer) return;

    heroSlidesData = getHeroSlides();
    let slidesHTML = "";
    let indicatorsHTML = "";

    heroSlidesData.forEach((slide, index) => {
      const isZero = slide.title === "ZERO+";
      const titleHTML = isZero ? `ZERO<span>+</span>` : slide.title;

      slidesHTML += `
          <div class="hero-slide ${index === 0 ? "active" : ""}" data-index="${index}">
            <div class="hero-text-content">
              <h1 class="hero-title-main">${titleHTML}</h1>
              <p class="hero-subtitle">${slide.subtitle}</p>
              <p class="hero-slogan">${slide.slogan}</p>
              <p class="hero-promo">${slide.promo}</p>
              <div class="hero-badge">${slide.badge}</div>
              <a href="${slide.link}" class="hero-cta-btn">${slide.ctaText} <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div class="hero-visual-center">
              <a href="${slide.link}" class="hero-visual-link" title="Xem chi tiết ${slide.title}" aria-label="Xem chi tiết ${slide.title}">
                ${
                  isZero
                    ? `
                  <div class="hero-zero-mice-stack">
                    <img src="${slide.image}" style="position:absolute; top:40%; left:20%; transform:translate(-50%,-50%) rotate(-30deg) scale(1.3); filter: hue-rotate(270deg) brightness(0.6) drop-shadow(0 10px 15px rgba(0,0,0,0.5)); z-index:1;" alt="${slide.title}">
                    <img src="${slide.image}" style="position:absolute; top:45%; left:35%; transform:translate(-50%,-50%) rotate(-15deg) scale(1.5); filter: brightness(0.2) drop-shadow(0 10px 15px rgba(0,0,0,0.5)); z-index:2;" alt="${slide.title}">
                    <img src="${slide.image}" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(0deg) scale(1.7); filter: hue-rotate(15deg) sepia(0.8) drop-shadow(0 10px 15px rgba(0,0,0,0.5)); z-index:3;" alt="${slide.title}">
                    <img src="${slide.image}" style="position:absolute; top:55%; left:65%; transform:translate(-50%,-50%) rotate(15deg) scale(1.9); filter: hue-rotate(300deg) brightness(1.1) drop-shadow(0 10px 15px rgba(0,0,0,0.5)); z-index:4;" alt="${slide.title}">
                    <img src="${slide.image}" style="position:absolute; top:60%; left:80%; transform:translate(-50%,-50%) rotate(30deg) scale(2.2); filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6)); z-index:5;" alt="${slide.title}">
                  </div>
                `
                    : `
                  <img class="hero-single-img" src="${slide.image}" alt="${slide.title}">
                `
                }
              </a>
            </div>
          </div>
        `;

      indicatorsHTML += `
          <button type="button" class="hero-indicator-bar ${index === 0 ? "active" : ""}" data-index="${index}" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-label="Chuyển sang banner ${index + 1}: ${slide.title}">
            <span class="indicator-progress-fill"></span>
          </button>
        `;
    });

    wrapper.innerHTML = slidesHTML;
    indicatorsContainer.innerHTML = indicatorsHTML;

    bindCarouselEvents();
    goToSlide(0);
  }

  function startProgress() {
    if (rafId) cancelAnimationFrame(rafId);
    startTime = performance.now();
    elapsedBeforePause = 0;

    function step(now) {
      if (isPaused) {
        rafId = requestAnimationFrame(step);
        return;
      }

      const elapsed = (now - startTime) + elapsedBeforePause;
      const progress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);

      const activeFill = document.querySelector(".hero-indicator-bar.active .indicator-progress-fill");
      if (activeFill) {
        activeFill.style.width = `${progress}%`;
      }

      if (elapsed >= SLIDE_DURATION) {
        nextSlide();
        return;
      }

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
  }

  function resetAllFills() {
    const fills = document.querySelectorAll(".hero-indicator-bar .indicator-progress-fill");
    fills.forEach((f) => {
      f.style.width = "0%";
    });
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll(".hero-slide");
    const indicators = document.querySelectorAll(".hero-indicator-bar");

    slides.forEach((s) => s.classList.remove("active"));
    indicators.forEach((i) => {
      i.classList.remove("active");
      i.setAttribute("aria-selected", "false");
    });
    resetAllFills();

    if (slides[index] && indicators[index]) {
      slides[index].classList.add("active");
      indicators[index].classList.add("active");
      indicators[index].setAttribute("aria-selected", "true");
      currentSlide = index;
    }

    isPaused = false;
    startProgress();
  }

  function nextSlide() {
    const slides = document.querySelectorAll(".hero-slide");
    const count = slides.length || (heroSlidesData && heroSlidesData.length) || 4;
    let next = currentSlide + 1;
    if (next >= count) next = 0;
    goToSlide(next);
  }

  function pauseCarousel() {
    if (!isPaused && startTime !== null) {
      isPaused = true;
      elapsedBeforePause += performance.now() - startTime;
    }
  }

  function resumeCarousel() {
    if (isPaused) {
      isPaused = false;
      startTime = performance.now();
    }
  }

  function bindCarouselEvents() {
    const indicators = document.querySelectorAll(".hero-indicator-bar");
    indicators.forEach((ind) => {
      ind.addEventListener("click", (e) => {
        const btn = e.target.closest(".hero-indicator-bar");
        if (!btn) return;
        const idx = parseInt(btn.getAttribute("data-index"));
        if (!isNaN(idx)) {
          goToSlide(idx);
        }
      });
    });

    // Chạy liên tục không gián đoạn ngay cả khi trỏ chuột vào banner (liên tục 4 giây/slide)

    // Tự động tạm dừng khi tab trình duyệt không active để tiết kiệm tài nguyên
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pauseCarousel();
      } else {
        resumeCarousel();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderHeroCarousel);
  } else {
    renderHeroCarousel();
  }
  window.renderHeroCarousel = renderHeroCarousel;
})();

// ==========================================
// --- TRENDING TABS LOGIC ---
// ==========================================
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active classes
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => (c.style.display = "none"));

        // Set new active tab
        tab.classList.add("active");
        const targetId = tab.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.style.display = "block";
        }
      });
    });
  });
})();

// ==========================================
// --- USER FEEDBACK CAROUSEL LOGIC ---
// ==========================================
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".feedback-track");
    const prevBtn = document.querySelector(".feedback-prev");
    const nextBtn = document.querySelector(".feedback-next");
    const progressFill = document.querySelector(".progress-bar-fill");

    if (!track || !prevBtn || !nextBtn || !progressFill) return;

    let currentIndex = 0;
    // Tổng số trạng thái (nấc) để lướt hết 6 ảnh (hiển thị ~2.5 ảnh/lần)
    // Mình sẽ chia làm 4 nấc (index 0, 1, 2, 3)
    const maxIndex = 3;

    function updateCarousel() {
      const card = document.querySelector(".feedback-card");
      if (!card) return;

      const cardWidth = card.offsetWidth;
      const gap = 20; // Khớp với gap trong CSS

      let translateX = 0;

      if (currentIndex === maxIndex) {
        // Ở nấc cuối cùng, dịch chuyển tối đa để vừa khít cạnh phải
        const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
        translateX = maxScroll;
      } else {
        // Các nấc bình thường dịch chuyển theo chiều rộng thẻ + gap
        translateX = currentIndex * (cardWidth + gap);
      }

      track.style.transform = `translateX(-${translateX}px)`;

      // Cập nhật độ dài thanh tiến độ
      const progressPercentage = ((currentIndex + 1) / (maxIndex + 1)) * 100;
      progressFill.style.width = `${progressPercentage}%`;

      // Cập nhật trạng thái nút bấm
      if (currentIndex === 0) {
        prevBtn.classList.add("disabled");
      } else {
        prevBtn.classList.remove("disabled");
      }

      if (currentIndex === maxIndex) {
        nextBtn.classList.add("disabled");
      } else {
        nextBtn.classList.remove("disabled");
      }
    }

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Khởi tạo trạng thái ban đầu và update khi resize
    setTimeout(updateCarousel, 100);
    window.addEventListener("resize", updateCarousel);
  });
})();

// ==========================================
// --- TOAST NOTIFICATION SYSTEM ---
// ==========================================
function showToast(message, type = "success", duration = 3500) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;

  const iconClass =
    type === "success"
      ? "fa-solid fa-circle-check"
      : type === "info"
        ? "fa-solid fa-circle-info"
        : "fa-solid fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <div class="toast-message">${message}</div>
    <button class="toast-close-btn" aria-label="Đóng thông báo"><i class="fa-solid fa-xmark"></i></button>
  `;

  container.appendChild(toast);

  const closeToast = () => {
    toast.classList.add("toast-leaving");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 250);
  };

  toast.querySelector(".toast-close-btn").addEventListener("click", closeToast);

  const timer = setTimeout(closeToast, duration);
  toast.addEventListener("mouseenter", () => clearTimeout(timer));
}

// ==========================================
// --- CART MANAGEMENT SYSTEM ---
// ==========================================
const CART_STORAGE_KEY = "blue_cart_items";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Lỗi đọc giỏ hàng:", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Lỗi lưu giỏ hàng:", e);
  }
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(productId, quantity = 1, openDrawer = true, variant = "") {
  // Tìm sản phẩm linh hoạt (so sánh String để tương thích cả ID dạng chuỗi từ JSON-Server lẫn số)
  const product = allProducts.find((p) => String(p.id) === String(productId));
  if (!product) {
    showToast("Không tìm thấy thông tin sản phẩm!", "error");
    return;
  }

  const effectivePrice =
    product.sale_price !== null && product.sale_price !== undefined
      ? product.sale_price
      : product.price;

  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) => String(item.id) === String(productId) && (item.variant || "") === (variant || "")
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity = Math.min(cart[existingIndex].quantity + quantity, 99);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: effectivePrice,
      original_price: product.price,
      image: product.image,
      category: product.category,
      variant: variant || "",
      quantity: Math.max(1, quantity)
    });
  }

  saveCart(cart);
  const variantText = variant ? ` (${variant})` : "";
  showToast(`Đã thêm <strong>${product.name}${variantText}</strong> vào giỏ hàng!`, "success");

  // Hiệu ứng nảy badge
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
  }

  if (openDrawer) {
    openCartDrawer();
  }
}

function updateCartQuantity(productId, delta) {
  let cart = getCart();
  const index = cart.findIndex((item) => String(item.id) === String(productId));
  if (index === -1) return;

  const newQty = cart[index].quantity + delta;
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  cart[index].quantity = Math.min(newQty, 99);
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  const item = cart.find((i) => String(i.id) === String(productId));
  cart = cart.filter((i) => String(i.id) !== String(productId));
  saveCart(cart);
  if (item) {
    showToast(`Đã xóa <strong>${item.name}</strong> khỏi giỏ hàng.`, "info");
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  if (!drawer || !overlay) return;

  renderCartDrawer();
  overlay.style.display = "block";
  requestAnimationFrame(() => {
    overlay.classList.add("open");
    drawer.classList.add("open");
  });
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  if (!drawer || !overlay) return;

  overlay.classList.remove("open");
  drawer.classList.remove("open");
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-badge");
  const drawerBadge = document.getElementById("cart-drawer-badge");

  if (badge) badge.textContent = totalItems;
  if (drawerBadge) drawerBadge.textContent = `${totalItems} món`;
}

function renderCartDrawer() {
  const cart = getCart();
  const emptyState = document.getElementById("cart-empty-state");
  const itemsList = document.getElementById("cart-items-list");
  const footer = document.getElementById("cart-drawer-footer");
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingText = document.getElementById("shipping-text");
  const shippingFill = document.getElementById("shipping-progress-fill");

  if (!itemsList || !emptyState || !footer) return;

  if (cart.length === 0) {
    emptyState.style.display = "flex";
    itemsList.style.display = "none";
    footer.style.display = "none";
    if (shippingFill) shippingFill.style.width = "0%";
    if (shippingText) shippingText.textContent = "Miễn phí giao hàng toàn quốc cho đơn từ 1.000.000₫";
    return;
  }

  emptyState.style.display = "none";
  itemsList.style.display = "flex";
  footer.style.display = "block";

  let subtotal = 0;
  let html = "";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    html += `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          ${item.variant ? `<div class="cart-item-variant" style="font-size: 11px; color: #64748b; margin: 2px 0 4px 0;"><i class="fa-solid fa-tag" style="margin-right: 4px; font-size: 10px;"></i>${item.variant}</div>` : ""}
          <div class="cart-item-price-unit">${formatCurrency(item.price)}</div>
          <div class="cart-item-actions">
            <div class="cart-qty-control">
              <button class="cart-qty-btn btn-minus" data-id="${item.id}" aria-label="Giảm số lượng">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="cart-qty-value">${item.quantity}</span>
              <button class="cart-qty-btn btn-plus" data-id="${item.id}" aria-label="Tăng số lượng">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <button class="cart-remove-btn" data-id="${item.id}" aria-label="Xóa sản phẩm">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  itemsList.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

  // Thanh tiến độ miễn phí vận chuyển (mốc 1.000.000₫)
  const FREE_SHIPPING_THRESHOLD = 1000000;
  if (shippingFill && shippingText) {
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    shippingFill.style.width = `${progress}%`;
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingText.innerHTML = `<strong style="color: #10b981;"><i class="fa-solid fa-check"></i> Bạn được MIỄN PHÍ vận chuyển!</strong>`;
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      shippingText.textContent = `Mua thêm ${formatCurrency(remaining)} để được MIỄN PHÍ vận chuyển!`;
    }
  }
}

// ==========================================
// --- LIVE SEARCH SYSTEM ---
// ==========================================
let searchDebounceTimer = null;

function openSearchModal() {
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("live-search-input");
  if (!overlay || !input) return;

  overlay.style.display = "flex";
  requestAnimationFrame(() => {
    overlay.classList.add("open");
    input.focus();
  });
  document.body.style.overflow = "hidden";
}

function closeSearchModal() {
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("live-search-input");
  if (!overlay) return;

  overlay.classList.remove("open");
  setTimeout(() => {
    overlay.style.display = "none";
    if (input) input.value = "";
    resetSearchState();
    document.body.style.overflow = "";
  }, 250);
}

function resetSearchState() {
  const prompt = document.getElementById("search-empty-prompt");
  const list = document.getElementById("search-results-list");
  const clearBtn = document.getElementById("search-clear-btn");
  if (prompt) prompt.style.display = "flex";
  if (list) {
    list.style.display = "none";
    list.innerHTML = "";
  }
  if (clearBtn) clearBtn.style.display = "none";
}

function executeLiveSearch(query) {
  const trimmed = query.trim().toLowerCase();
  const prompt = document.getElementById("search-empty-prompt");
  const list = document.getElementById("search-results-list");
  const clearBtn = document.getElementById("search-clear-btn");

  if (!list || !prompt) return;

  if (clearBtn) {
    clearBtn.style.display = trimmed.length > 0 ? "block" : "none";
  }

  if (!trimmed) {
    resetSearchState();
    return;
  }

  prompt.style.display = "none";
  list.style.display = "block";

  // Lọc sản phẩm theo tên hoặc danh mục
  const matches = allProducts.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(trimmed);
    const catMatch = product.category && product.category.toLowerCase().includes(trimmed);
    return nameMatch || catMatch;
  });

  if (matches.length === 0) {
    list.innerHTML = `
      <div class="search-no-results">
        <i class="fa-solid fa-magnifying-glass"></i>
        <h4>Không tìm thấy sản phẩm nào khớp với "${escapeHtml(query)}"</h4>
        <p>Vui lòng thử từ khóa khác như: Chuột, Bàn phím, Razer, Logitech, Corsair...</p>
      </div>
    `;
    return;
  }

  let html = `<div class="search-results-count">Tìm thấy <strong>${matches.length}</strong> sản phẩm phù hợp:</div>`;
  html += `<div class="search-results-grid">`;

  matches.forEach((p) => {
    const priceDisplay =
      p.sale_price !== null && p.sale_price !== undefined
        ? `<span class="s-old-price">${formatCurrency(p.price)}</span> <span class="s-new-price">${formatCurrency(p.sale_price)}</span>`
        : `<span class="s-price">${formatCurrency(p.price)}</span>`;

    html += `
      <div class="search-result-card" data-id="${p.id}">
        <div class="s-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="s-info">
          <span class="s-category-tag">${p.category || "Gear"}</span>
          <h4 class="s-title">${highlightQuery(p.name, trimmed)}</h4>
          <div class="s-price-row">${priceDisplay}</div>
        </div>
        <button class="s-add-btn" data-id="${p.id}" title="Thêm vào giỏ">
          <i class="fa-solid fa-cart-plus"></i> Thêm
        </button>
      </div>
    `;
  });

  html += `</div>`;
  list.innerHTML = html;
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[tag] || tag));
}

function highlightQuery(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return escapeHtml(text).replace(regex, '<mark class="search-highlight">$1</mark>');
}

// ==========================================
// --- GLOBAL EVENT LISTENERS & INITIALIZATION ---
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Cập nhật badge giỏ hàng từ localStorage khi tải trang
  updateCartBadge();

  // Khởi tạo và đồng bộ giao diện Dark eSports / Light Mode toàn cục (Glass Pill Control Center)
  const renderThemeToggleContent = (btn, isDark) => {
    btn.setAttribute("aria-label", isDark ? "Chế độ hiện tại: Dark eSports. Bấm để chuyển sang Sáng" : "Chế độ hiện tại: Sáng. Bấm để chuyển sang Dark eSports");
    btn.title = isDark ? "Chế độ Dark eSports (Bấm để chuyển sang Sáng)" : "Giao diện Sáng (Bấm để chuyển sang Dark eSports)";
    btn.innerHTML = `
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
  };

  const initGlobalTheme = () => {
    const savedTheme = localStorage.getItem("blue_esports_theme") || "light";
    const isDark = savedTheme === "dark";
    document.body.classList.toggle("theme-dark", isDark);

    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach((btn) => renderThemeToggleContent(btn, isDark));
  };
  initGlobalTheme();
  window.initGlobalTheme = initGlobalTheme;

  // Nút mở/đóng Cart Drawer
  const cartTrigger = document.getElementById("cart-trigger-btn");
  const cartClose = document.getElementById("cart-drawer-close");
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const continueBtn = document.getElementById("cart-continue-btn");

  if (cartTrigger) cartTrigger.addEventListener("click", openCartDrawer);
  if (cartClose) cartClose.addEventListener("click", closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);
  if (continueBtn) continueBtn.addEventListener("click", closeCartDrawer);

  // Nút mở/đóng Live Search
  const searchTrigger = document.getElementById("search-trigger-btn");
  const searchClose = document.getElementById("search-close-btn");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("live-search-input");
  const searchClear = document.getElementById("search-clear-btn");

  if (searchTrigger) searchTrigger.addEventListener("click", openSearchModal);
  if (searchClose) searchClose.addEventListener("click", closeSearchModal);
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) closeSearchModal();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        executeLiveSearch(e.target.value);
      }, 180);
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      resetSearchState();
      searchInput.focus();
    });
  }

  // Quick Tags tìm kiếm
  const quickTags = document.querySelectorAll(".quick-tag-btn");
  quickTags.forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-query");
      if (searchInput && q) {
        searchInput.value = q;
        executeLiveSearch(q);
        searchInput.focus();
      }
    });
  });

  // ==========================================
  // --- 2-STEP EXPRESS CHECKOUT MODAL FLOW ---
  // ==========================================
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutCloseIcon = document.getElementById("checkout-modal-close-icon");
  const checkoutCloseBtn = document.getElementById("checkout-modal-close");
  const step1Pane = document.getElementById("checkout-step-1");
  const step2Pane = document.getElementById("checkout-step-2");
  const step3Pane = document.getElementById("checkout-step-3");
  const stepNode1 = document.getElementById("step-node-1");
  const stepNode2 = document.getElementById("step-node-2");
  const btnGotoStep2 = document.getElementById("btn-goto-step2");
  const btnBacktoStep1 = document.getElementById("btn-backto-step1");
  const btnConfirmOrder = document.getElementById("btn-confirm-order");
  const miniSummary = document.getElementById("checkout-mini-summary");
  const finalSummary = document.getElementById("checkout-final-summary");
  const orderCodeBadge = document.getElementById("order-code-badge");

  let activeCheckoutItems = [];
  let isCheckingOutCart = true;

  let checkoutCustomerData = {
    name: "",
    phone: "",
    address: "",
    city: "Hà Nội",
    note: "",
    paymentMethod: "COD"
  };

  const openCartCheckoutFlow = (customItems = null) => {
    const items = customItems || getCart();
    if (!items || items.length === 0) {
      if (window.showToast) {
        window.showToast("Giỏ hàng của bạn đang trống!", "warning");
      }
      return;
    }

    // [MVC AUTH GUARD] - Yêu cầu đăng nhập trước khi tiến hành thanh toán
    if (window.AuthModel && !window.AuthModel.isLoggedIn() && window.AuthController) {
      window.AuthController.requireLogin((user) => {
        openCartCheckoutFlow(customItems);
      }, "Vui lòng đăng nhập tài khoản để tiến hành thanh toán và tích lũy điểm thưởng thành viên eSports!");
      return;
    }

    activeCheckoutItems = items;
    isCheckingOutCart = !customItems;
    closeCartDrawer();

    // Điền sẵn thông tin khách hàng nếu đã đăng nhập
    if (window.AuthModel && window.AuthModel.isLoggedIn()) {
      const u = window.AuthModel.getCurrentUser();
      if (u) {
        setTimeout(() => {
          const nameInput = document.getElementById("cust-name");
          const phoneInput = document.getElementById("cust-phone");
          const addrInput = document.getElementById("cust-address");
          const cityInput = document.getElementById("cust-city");
          if (nameInput && !nameInput.value) nameInput.value = u.name || "";
          if (phoneInput && !phoneInput.value) phoneInput.value = u.phone || "";
          if (addrInput && !addrInput.value) addrInput.value = u.address || "";
          if (cityInput && u.city) cityInput.value = u.city;
        }, 50);
      }
    }

    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Reset về Step 1
    if (step1Pane) step1Pane.style.display = "block";
    if (step2Pane) step2Pane.style.display = "none";
    if (step3Pane) step3Pane.style.display = "none";
    if (stepNode1) {
      stepNode1.className = "step-node active";
      stepNode1.setAttribute("aria-current", "step");
    }
    if (stepNode2) {
      stepNode2.className = "step-node";
      stepNode2.removeAttribute("aria-current");
      stepNode2.setAttribute("disabled", "true");
    }

    // Nạp danh sách tóm tắt sản phẩm vào Step 1
    if (miniSummary) {
      let itemsListHTML = items.map((item) => `
        <div class="checkout-item-summary-row" style="display:flex; align-items:center; gap:12px; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.06);">
          <img src="${item.image}" alt="${item.name}" style="width:48px; height:48px; object-fit:contain; border-radius:6px; background:rgba(0,0,0,0.06); flex-shrink:0;">
          <div style="flex:1; min-width:0;">
            <strong style="font-size:13px; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</strong>
            <span style="font-size:12px; color:#64748b;">${item.variant ? `Phiên bản: ${item.variant} | ` : ""}${item.quantity} × ${formatCurrency(item.price)}</span>
          </div>
          <strong style="font-size:13px; color:var(--color-primary); flex-shrink:0;">${formatCurrency(item.price * item.quantity)}</strong>
        </div>
      `).join("");

      miniSummary.innerHTML = `
        <div class="checkout-items-scrollable" style="max-height:160px; overflow-y:auto; padding-right:4px;">
          ${itemsListHTML}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding-top:8px; border-top:1.5px solid rgba(0,102,255,0.25);">
          <span style="font-size:13px; font-weight:600;">Tổng tạm tính (${totalQty} món):</span>
          <span style="font-size:15px; font-weight:800; color:var(--color-primary);">${formatCurrency(subtotal)}</span>
        </div>
      `;
    }

    if (checkoutModal) {
      checkoutModal.style.display = "flex";
    }
  };
  window.openCartCheckoutFlow = openCartCheckoutFlow;

  const checkoutBtn = document.getElementById("cart-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      openCartCheckoutFlow();
    });
  }

  // Chuyển Step 1 -> Step 2
  if (btnGotoStep2) {
    btnGotoStep2.addEventListener("click", () => {
      const nameInput = document.getElementById("cust-name");
      const phoneInput = document.getElementById("cust-phone");
      const addrInput = document.getElementById("cust-address");
      const cityInput = document.getElementById("cust-city");
      const noteInput = document.getElementById("cust-note");

      if (!nameInput || !nameInput.value.trim()) {
        if (window.showToast) window.showToast("Vui lòng nhập họ và tên người nhận!", "error");
        if (nameInput) nameInput.focus();
        return;
      }
      if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 9) {
        if (window.showToast) window.showToast("Vui lòng nhập số điện thoại hợp lệ!", "error");
        if (phoneInput) phoneInput.focus();
        return;
      }
      if (!addrInput || !addrInput.value.trim()) {
        if (window.showToast) window.showToast("Vui lòng nhập địa chỉ nhận hàng!", "error");
        if (addrInput) addrInput.focus();
        return;
      }

      checkoutCustomerData.name = nameInput.value.trim();
      checkoutCustomerData.phone = phoneInput.value.trim();
      checkoutCustomerData.address = addrInput.value.trim();
      checkoutCustomerData.city = cityInput ? cityInput.value : "Hà Nội";
      checkoutCustomerData.note = noteInput ? noteInput.value.trim() : "";

      // Tính tổng tiền Step 2
      const totalQty = activeCheckoutItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = activeCheckoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discountMoMo = checkoutCustomerData.paymentMethod === "MOMO" ? 20000 : 0;
      const grandTotal = Math.max(0, subtotal - discountMoMo);

      if (finalSummary) {
        finalSummary.innerHTML = `
          <div class="summary-row-item">
            <span>Người nhận:</span>
            <strong>${checkoutCustomerData.name} (${checkoutCustomerData.phone})</strong>
          </div>
          <div class="summary-row-item">
            <span>Địa chỉ:</span>
            <span>${checkoutCustomerData.address}, ${checkoutCustomerData.city}</span>
          </div>
          <div class="summary-row-item">
            <span>Tạm tính (${totalQty} món):</span>
            <span>${formatCurrency(subtotal)}</span>
          </div>
          <div class="summary-row-item">
            <span>Phí giao hàng:</span>
            <span style="color:#10b981; font-weight:700;">MIỄN PHÍ VẬN CHUYỂN</span>
          </div>
          ${discountMoMo > 0 ? `<div class="summary-row-item" style="color:#dc2626;"><span>Ưu đãi MoMo:</span><span>-20.000₫</span></div>` : ""}
          <div class="summary-row-item total-row">
            <span>Tổng thanh toán:</span>
            <span>${formatCurrency(grandTotal)}</span>
          </div>
        `;
      }

      if (step1Pane) step1Pane.style.display = "none";
      if (step2Pane) step2Pane.style.display = "block";
      if (stepNode1) {
        stepNode1.className = "step-node";
        stepNode1.removeAttribute("aria-current");
      }
      if (stepNode2) {
        stepNode2.className = "step-node active";
        stepNode2.setAttribute("aria-current", "step");
        stepNode2.removeAttribute("disabled");
      }
    });
  }

  // Quay lại Step 1
  const returnToStep1 = () => {
    if (step2Pane) step2Pane.style.display = "none";
    if (step1Pane) step1Pane.style.display = "block";
    if (stepNode1) {
      stepNode1.className = "step-node active";
      stepNode1.setAttribute("aria-current", "step");
    }
    if (stepNode2) {
      stepNode2.className = "step-node";
      stepNode2.removeAttribute("aria-current");
    }
  };

  if (btnBacktoStep1) {
    btnBacktoStep1.addEventListener("click", returnToStep1);
  }

  if (stepNode1) {
    stepNode1.addEventListener("click", () => {
      if (step2Pane && step2Pane.style.display !== "none") {
        returnToStep1();
      }
    });
  }

  // Chọn phương thức thanh toán
  const pmCards = document.querySelectorAll(".payment-method-card");
  pmCards.forEach((card) => {
    card.addEventListener("click", () => {
      pmCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      checkoutCustomerData.paymentMethod = radio ? radio.value : "COD";

      // Cập nhật lại tổng tiền Step 2
      const subtotal = activeCheckoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discountMoMo = checkoutCustomerData.paymentMethod === "MOMO" ? 20000 : 0;
      const grandTotal = Math.max(0, subtotal - discountMoMo);

      const totalRowVal = document.querySelector(".summary-row-item.total-row span:last-child");
      if (totalRowVal) totalRowVal.textContent = formatCurrency(grandTotal);
    });
  });

  // Xác nhận đặt hàng -> Step 3
  if (btnConfirmOrder) {
    btnConfirmOrder.addEventListener("click", () => {
      const randCode = "BL-" + Math.floor(10000 + Math.random() * 90000);
      if (orderCodeBadge) orderCodeBadge.textContent = `Mã đơn hàng: ${randCode}`;

      const totalQty = activeCheckoutItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = activeCheckoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discountMoMo = checkoutCustomerData.paymentMethod === "MOMO" ? 20000 : 0;
      const grandTotal = Math.max(0, subtotal - discountMoMo);

      const summaryText = document.getElementById("checkout-order-summary");
      if (summaryText) {
        summaryText.innerHTML = `
          Cảm ơn bạn <strong>${checkoutCustomerData.name}</strong> đã đặt mua thành công <strong>${totalQty} sản phẩm</strong> (${formatCurrency(grandTotal)}).<br>
          Đơn hàng sẽ được giao tới: <em>${checkoutCustomerData.address}, ${checkoutCustomerData.city}</em>.<br>
          Phương thức thanh toán: <strong>${checkoutCustomerData.paymentMethod}</strong>. CSKH sẽ liên hệ xác nhận trong ít phút!
        `;
      }

      // Lưu đơn hàng vào AuthModel (lịch sử đơn hàng của tài khoản)
      if (window.AuthModel) {
        window.AuthModel.addOrder({
          id: randCode,
          customerName: checkoutCustomerData.name,
          phone: checkoutCustomerData.phone,
          address: checkoutCustomerData.address,
          city: checkoutCustomerData.city,
          items: activeCheckoutItems,
          paymentMethod: checkoutCustomerData.paymentMethod,
          total: grandTotal,
        });
      }

      // Xóa giỏ hàng nếu thanh toán từ giỏ
      if (isCheckingOutCart) {
        saveCart([]);
        updateCartBadge();
        renderCartItems();
      }

      if (step2Pane) step2Pane.style.display = "none";
      if (step3Pane) step3Pane.style.display = "block";
      if (window.showToast) {
        window.showToast(`Đặt hàng thành công! Mã đơn: ${randCode}`, "success", 4000);
      }
    });
  }

  const closeCheckoutModal = () => {
    if (checkoutModal) checkoutModal.style.display = "none";
  };
  if (checkoutCloseIcon) checkoutCloseIcon.addEventListener("click", closeCheckoutModal);
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener("click", closeCheckoutModal);

  // Phím tắt Enter trong Step 1
  const step1InputIds = ["cust-name", "cust-phone", "cust-address", "cust-city", "cust-note"];
  step1InputIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (btnGotoStep2) btnGotoStep2.click();
        }
      });
    }
  });

  // Phím tắt toàn cục: Escape đóng modal/drawer, Ctrl+K mở tìm kiếm
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeSearchModal();
      closeSupportModal();
      if (checkoutModal) checkoutModal.style.display = "none";
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    }
  });

  // Event Delegation cho toàn bộ các nút Thêm Vào Giỏ, Tăng/Giảm SL, Yêu thích, Theme, Hỗ trợ
  document.addEventListener("click", (e) => {
    // 0. Mở Modal Hỗ Trợ & Chính Sách eSports
    const supportTrigger = e.target.closest(".support-modal-trigger");
    if (supportTrigger) {
      e.preventDefault();
      const tab = supportTrigger.getAttribute("data-support-tab") || "warranty";
      openSupportModal(tab);
      return;
    }

    // 0.1. Chuyển đổi Dark / Light Theme
    const themeBtn = e.target.closest(".theme-toggle-btn");
    if (themeBtn) {
      e.preventDefault();
      const isCurrentlyDark = document.body.classList.contains("theme-dark");
      const nextTheme = isCurrentlyDark ? "light" : "dark";
      document.body.classList.toggle("theme-dark", !isCurrentlyDark);
      localStorage.setItem("blue_esports_theme", nextTheme);
      initGlobalTheme();
      if (window.showToast) {
        window.showToast(nextTheme === "dark" ? "Đã bật chế độ Dark eSports 🌙" : "Đã bật chế độ Sáng ☀️", "info", 1800);
      }
      return;
    }

    // 1. Thêm vào giỏ hàng
    const addBtn = e.target.closest(".add-to-cart-btn, .s-add-btn");
    if (addBtn) {
      e.preventDefault();
      const pid = addBtn.getAttribute("data-id");
      if (pid) {
        // Đóng search modal nếu đang mở (khi thêm từ kết quả tìm kiếm)
        if (addBtn.closest(".search-overlay")) {
          closeSearchModal();
        }
        addToCart(pid, 1, true);
      }
      return;
    }

    // 2. Tăng số lượng trong drawer
    const plusBtn = e.target.closest(".btn-plus");
    if (plusBtn) {
      const pid = plusBtn.getAttribute("data-id");
      if (pid) updateCartQuantity(pid, 1);
      return;
    }

    // 3. Giảm số lượng trong drawer
    const minusBtn = e.target.closest(".btn-minus");
    if (minusBtn) {
      const pid = minusBtn.getAttribute("data-id");
      if (pid) updateCartQuantity(pid, -1);
      return;
    }

    // 4. Xóa sản phẩm khỏi drawer
    const removeBtn = e.target.closest(".cart-remove-btn");
    if (removeBtn) {
      const pid = removeBtn.getAttribute("data-id");
      if (pid) removeFromCart(pid);
      return;
    }

    // 5. Yêu thích (Wishlist heart toggle)
    const heartBtn = e.target.closest(".card-heart");
    if (heartBtn) {
      e.preventDefault();
      const icon = heartBtn.querySelector("i");
      const pid = heartBtn.getAttribute("data-id") || (heartBtn.closest(".product-item") ? heartBtn.closest(".product-item").getAttribute("data-product-id") : null);
      if (icon) {
        let list = [];
        try {
          list = JSON.parse(localStorage.getItem("blue_wishlist") || "[]");
        } catch (err) {}

        const isSolid = icon.classList.contains("fa-solid");
        if (isSolid) {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          heartBtn.style.color = "";
          if (pid) {
            list = list.filter((id) => String(id) !== String(pid));
            try { localStorage.setItem("blue_wishlist", JSON.stringify(list)); } catch (err) {}
          }
          showToast("Đã xóa khỏi danh sách yêu thích.", "info");
        } else {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
          heartBtn.style.color = "#ef4444";
          if (pid && !list.includes(String(pid))) {
            list.push(String(pid));
            try { localStorage.setItem("blue_wishlist", JSON.stringify(list)); } catch (err) {}
          }
          showToast("Đã thêm vào danh sách yêu thích! ❤️", "success");
        }
      }
      return;
    }

    // 6. Click vào thẻ sản phẩm chuyển sang trang chi tiết (khi không bấm nút giỏ hàng hoặc tim)
    const productCard = e.target.closest(".product-item");
    if (productCard && !e.target.closest(".add-to-cart-btn, .card-heart")) {
      const pid = productCard.getAttribute("data-product-id");
      if (pid) {
        window.location.href = `product-detail.html?id=${pid}`;
      }
      return;
    }

    // 7. Click vào kết quả trong modal tìm kiếm
    const searchCard = e.target.closest(".search-result-card");
    if (searchCard && !e.target.closest(".s-add-btn")) {
      const pid = searchCard.getAttribute("data-id");
      if (pid) {
        closeSearchModal();
        window.location.href = `product-detail.html?id=${pid}`;
      }
      return;
    }

    // 8. Click vào thẻ sản phẩm trong Mega Menu
    const megaCard = e.target.closest(".mega-product-card");
    if (megaCard) {
      const pid = megaCard.getAttribute("data-id");
      if (pid) {
        window.location.href = `product-detail.html?id=${pid}`;
      }
      return;
    }
  });
});

// ==========================================
// --- QUICK SUPPORT & WARRANTY POLICY MODAL ---
// ==========================================
function ensureSupportModalElement() {
  let modal = document.getElementById("support-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "support-modal";
  modal.className = "support-modal-overlay";
  modal.style.display = "none";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "support-modal-title");

  modal.innerHTML = `
    <div class="support-modal-dialog">
      <div class="support-modal-header">
        <div class="support-modal-title-group">
          <div class="support-header-icon-wrap">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h3 id="support-modal-title">Trung Tâm Hỗ Trợ & Chính Sách eSports</h3>
            <p class="support-modal-subtitle">Cam kết chính hãng 100% • Bảo hành 24 tháng • Đổi mới 1:1 trong 30 ngày</p>
          </div>
        </div>
        <button id="support-modal-close" class="support-modal-close-btn" aria-label="Đóng cửa sổ hỗ trợ">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="support-modal-nav" role="tablist">
        <button class="support-nav-btn active" data-tab="warranty" role="tab" aria-selected="true">
          <i class="fa-solid fa-medal"></i> Bảo Hành 24T
        </button>
        <button class="support-nav-btn" data-tab="returns" role="tab" aria-selected="false">
          <i class="fa-solid fa-arrow-rotate-left"></i> Đổi Trả 7 Ngày
        </button>
        <button class="support-nav-btn" data-tab="guide" role="tab" aria-selected="false">
          <i class="fa-solid fa-truck-fast"></i> Mua Hàng & Ship
        </button>
        <button class="support-nav-btn" data-tab="tech" role="tab" aria-selected="false">
          <i class="fa-solid fa-headset"></i> Hỗ Trợ Kỹ Thuật
        </button>
        <button class="support-nav-btn" data-tab="brand" role="tab" aria-selected="false">
          <i class="fa-solid fa-trophy"></i> Về Blue
        </button>
        <button class="support-nav-btn" data-tab="account" role="tab" aria-selected="false">
          <i class="fa-solid fa-crown"></i> VIP Club
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="support-modal-body">
        <!-- 1. WARRANTY TAB -->
        <div class="support-tab-pane active" id="pane-warranty" role="tabpanel">
          <div class="support-banner-pill">
            <i class="fa-solid fa-circle-check"></i>
            <span>BẢO HÀNH CHÍNH HÃNG 24 THÁNG — ĐỔI MỚI 1:1 TRONG 30 NGÀY ĐẦU TIÊN</span>
          </div>
          <div class="support-grid-cards">
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-rotate"></i></div>
              <h4>Đổi Mới 1:1 Siêu Tốc</h4>
              <p>Nếu sản phẩm phát sinh lỗi kỹ thuật từ nhà sản xuất (double click, lỗi mắt đọc, liệt switch, pin sụt nhanh) trong 30 ngày đầu, Blue đổi mới ngay sản phẩm nguyên seal.</p>
            </div>
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-bolt"></i></div>
              <h4>Xử Lý Trong 48 Giờ</h4>
              <p>Cam kết thẩm định và hoàn tất bảo hành trong vòng tối đa 48 giờ làm việc. Tuyệt đối không giữ gear quá lâu làm gián đoạn việc luyện tập thi đấu của game thủ.</p>
            </div>
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-gamepad"></i></div>
              <h4>Hỗ Trợ Mượn Gear Thay Thế</h4>
              <p>Tuyển thủ hoặc streamer có lịch thi đấu / lên sóng được Blue cung cấp thiết bị thi đấu tương đương dùng tạm trong suốt thời gian bảo hành.</p>
            </div>
          </div>
          <div class="support-info-highlight">
            <h5><i class="fa-solid fa-location-dot"></i> Điểm Tiếp Nhận Bảo Hành Trực Tiếp</h5>
            <div class="support-location-list">
              <div class="loc-item"><strong>TP. Hồ Chí Minh:</strong> 123 Đường Công Nghệ, Quận 1 • Hotline: 1900 1234 (Phím 1)</div>
              <div class="loc-item"><strong>Hà Nội:</strong> 88 Phố Game Thủ, Cầu Giấy • Hotline: 1900 1234 (Phím 2)</div>
              <div class="loc-item"><strong>Đà Nẵng:</strong> 45 Đường Hải Phòng, Hải Châu • Hotline: 1900 1234 (Phím 3)</div>
            </div>
          </div>
        </div>

        <!-- 2. RETURNS TAB -->
        <div class="support-tab-pane" id="pane-returns" role="tabpanel" style="display: none;">
          <div class="support-banner-pill">
            <i class="fa-solid fa-shield-heart"></i>
            <span>TRẢI NGHIỆM KHÔNG RỦI RO — ĐỔI TRẢ MIỄN PHÍ TRONG VÒNG 7 NGÀY</span>
          </div>
          <div class="support-steps-list">
            <div class="support-step-card">
              <span class="step-badge">01</span>
              <div>
                <h4>Đổi Form Tay & Switch Thoải Mái</h4>
                <p>Nếu cảm giác cầm chuột chưa vừa lòng bàn tay hoặc muốn đổi sang lực nhấn switch khác, game thủ được hỗ trợ đổi mẫu trong vòng 7 ngày đầu.</p>
              </div>
            </div>
            <div class="support-step-card">
              <span class="step-badge">02</span>
              <div>
                <h4>Điều Kiện Đơn Giản, Minh Bạch</h4>
                <p>Sản phẩm không trầy xước nặng, giữ nguyên hộp sản phẩm và đầy đủ phụ kiện đi kèm (cáp, đầu thu wireless dongle, feet dự phòng, sách hướng dẫn).</p>
              </div>
            </div>
            <div class="support-step-card">
              <span class="step-badge">03</span>
              <div>
                <h4>Hoàn Tiền 100% Trong 24 Giờ</h4>
                <p>Trường hợp hoàn trả hàng, Blue giải ngân hoàn tiền 100% giá trị sản phẩm qua tài khoản ngân hàng, MoMo hoặc VNPay chỉ trong 24 giờ sau khi kiểm tra ngoại quan.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. GUIDE & SHIPPING TAB -->
        <div class="support-tab-pane" id="pane-guide" role="tabpanel" style="display: none;">
          <div class="support-banner-pill">
            <i class="fa-solid fa-truck-fast"></i>
            <span>GIAO HỎA TỐC 2 GIỜ & ĐỒNG KIỂM HÀNG TẬN TAY</span>
          </div>
          <div class="support-grid-cards">
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-box-open"></i></div>
              <h4>Đồng Kiểm Trước Khi Nhận</h4>
              <p>Khách hàng được quyền mở thùng carton kiểm tra tem niêm phong và ngoại quan hộp gear trước khi thanh toán cho shipper.</p>
            </div>
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-motorcycle"></i></div>
              <h4>Hỏa Tốc 2 Giờ Nội Thành</h4>
              <p>Áp dụng tại TP. HCM và Hà Nội. Đặt hàng trước 17:00 nhận hàng ngay trong ngày để sẵn sàng cho các trận đấu tối.</p>
            </div>
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-wallet"></i></div>
              <h4>Phương Thức Thanh Toán Đa Dạng</h4>
              <p>Hỗ trợ COD (tiền mặt), Thẻ ngân hàng ATM/Visa/MasterCard, ví điện tử MoMo, VNPay-QR và chuyển khoản ngân hàng 24/7.</p>
            </div>
          </div>
        </div>

        <!-- 4. TECH SUPPORT TAB -->
        <div class="support-tab-pane" id="pane-tech" role="tabpanel" style="display: none;">
          <div class="support-banner-pill">
            <i class="fa-solid fa-microchip"></i>
            <span>HỖ TRỢ WEB DRIVER, TỐI ƯU 8000Hz & PROFILES THI ĐẤU</span>
          </div>
          <div class="support-contacts-grid">
            <div class="support-contact-card">
              <i class="fa-solid fa-phone contact-card-icon"></i>
              <div>
                <h4>Tổng Đài Kỹ Thuật 24/7</h4>
                <p>Hotline: <strong>1900 1234</strong> (Miễn phí cước gọi nội bộ)</p>
                <span class="contact-hint">Hỗ trợ setup Rapid Trigger, macro, cân chỉnh DPI</span>
              </div>
            </div>
            <div class="support-contact-card">
              <i class="fa-brands fa-discord contact-card-icon" style="color: #5865f2;"></i>
              <div>
                <h4>Discord Server eSports</h4>
                <p><a href="https://discord.gg/bluegaming" target="_blank" rel="noopener noreferrer">discord.gg/bluegaming</a></p>
                <span class="contact-hint">Kênh trao đổi cấu hình, firmware beta và giao lưu scrim</span>
              </div>
            </div>
            <div class="support-contact-card">
              <i class="fa-solid fa-envelope contact-card-icon" style="color: #0066ff;"></i>
              <div>
                <h4>Email Kỹ Thuật & Tra Cứu Serial</h4>
                <p><a href="mailto:support@blue.vn">support@blue.vn</a></p>
                <span class="contact-hint">Phản hồi chi tiết và gửi file firmware trong vòng 60 phút</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. ABOUT BRAND TAB -->
        <div class="support-tab-pane" id="pane-brand" role="tabpanel" style="display: none;">
          <div class="support-banner-pill">
            <i class="fa-solid fa-trophy"></i>
            <span>BLUE GAMING GEAR — THIẾT BỊ ESPORTS THI ĐẤU ĐỈNH CAO</span>
          </div>
          <div class="support-prose-box">
            <p><strong>Blue Gaming Gear</strong> được thành lập bởi đội ngũ cựu tuyển thủ eSports và các kỹ sư phần cứng ngoại vi hàng đầu Việt Nam. Chúng tôi cam kết đưa những công nghệ thi đấu tiên tiến nhất thế giới — mắt đọc quang học PAW3395 26.000 DPI, polling rate cực đại 8000Hz, switch từ tính Hall Effect Rapid Trigger 0.1mm — đến tận tay game thủ với mức giá dễ tiếp cận nhất.</p>
            <p>100% sản phẩm phân phối bởi Blue đều có tem bảo hành chính hãng, nguồn gốc minh bạch và được hỗ trợ kỹ thuật trọn đời sản phẩm.</p>
          </div>
        </div>

        <!-- 6. VIP ACCOUNT TAB -->
        <div class="support-tab-pane" id="pane-account" role="tabpanel" style="display: none;">
          <div class="support-banner-pill">
            <i class="fa-solid fa-crown"></i>
            <span>HỆ THỐNG THÀNH VIÊN BLUE GAMER VIP CLUB</span>
          </div>
          <div class="support-grid-cards">
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-coins"></i></div>
              <h4>Tích Lũy Điểm Thưởng</h4>
              <p>Mỗi 100.000₫ mua sắm quy đổi thành 1 Blue Point. Điểm thưởng có thể dùng trực tiếp để trừ tiền mặt cho đơn hàng tiếp theo.</p>
            </div>
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-gift"></i></div>
              <h4>Quà Tặng Sinh Nhật Tuyển Thủ</h4>
              <p>Nhận ngay mã giảm giá 15% độc quyền cùng quà tặng gear lưu niệm trong tháng sinh nhật của bạn.</p>
            </div>
            <div class="support-feature-box">
              <div class="feature-icon"><i class="fa-solid fa-fire"></i></div>
              <h4>Quyền Mua Sớm Đợt Hàng Giới Hạn</h4>
              <p>Thành viên VIP được thông báo trước 24 giờ và ưu tiên đặt trước các phiên bản chuột giới hạn (Special / Signature Edition).</p>
            </div>
          </div>
        </div>
      </div>

      <div class="support-modal-footer">
        <div class="support-footer-hotline">
          <i class="fa-solid fa-headset"></i> Cần hỗ trợ trực tiếp? Gọi hotline <strong>1900 1234</strong> (8:00 - 22:00 hàng ngày)
        </div>
        <button id="support-modal-confirm-btn" class="support-confirm-btn">Đã Hiểu</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Bind close buttons
  const closeBtn = modal.querySelector("#support-modal-close");
  const confirmBtn = modal.querySelector("#support-modal-confirm-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeSupportModal);
  if (confirmBtn) confirmBtn.addEventListener("click", closeSupportModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSupportModal();
  });

  // Bind tab switching
  const navBtns = modal.querySelectorAll(".support-nav-btn");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabKey = btn.getAttribute("data-tab");
      switchSupportTab(tabKey);
    });
  });

  return modal;
}

function switchSupportTab(tabKey) {
  const modal = document.getElementById("support-modal");
  if (!modal) return;

  const validTabs = ["warranty", "returns", "guide", "tech", "brand", "account"];
  const targetKey = validTabs.includes(tabKey) ? tabKey : "warranty";

  const navBtns = modal.querySelectorAll(".support-nav-btn");
  navBtns.forEach((btn) => {
    const isTarget = btn.getAttribute("data-tab") === targetKey;
    btn.classList.toggle("active", isTarget);
    btn.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  const panes = modal.querySelectorAll(".support-tab-pane");
  panes.forEach((pane) => {
    if (pane.id === `pane-${targetKey}`) {
      pane.style.display = "block";
      pane.classList.add("active");
    } else {
      pane.style.display = "none";
      pane.classList.remove("active");
    }
  });
}

function openSupportModal(tabKey = "warranty") {
  const modal = ensureSupportModalElement();
  switchSupportTab(tabKey);
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("open");
  });
}

function closeSupportModal() {
  const modal = document.getElementById("support-modal");
  if (!modal) return;
  modal.classList.remove("open");
  setTimeout(() => {
    modal.style.display = "none";
  }, 200);
}

// Expose các tiện ích ra window để các trang con dùng chung
window.formatCurrency = formatCurrency;
window.showToast = showToast;
window.addToCart = addToCart;
window.openCartDrawer = openCartDrawer;
window.openSupportModal = openSupportModal;
window.closeSupportModal = closeSupportModal;
window.allProducts = allProducts;

