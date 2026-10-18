/**
 * i18n.js - HỆ THỐNG ĐA NGÔN NGỮ & ĐỔI TIỀN TỆ QUỐC TẾ
 * Blue Gaming Gear - eSports E-Commerce Platform
 * 
 * Hỗ trợ:
 * - English (EN / USD) - MẶC ĐỊNH CHO NGƯỜI DÙNG MỚI THEO YÊU CẦU
 * - Tiếng Việt (VI / VND)
 */

(() => {
  const I18N_DATA = {
    en: {
      langLabel: "EN / USD",
      flagSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
      flagAlt: "EN",
      currency: "USD",
      currencySymbol: "$",
      rate: 1 / 25000,
      
      // Header Nav
      navAll: "All Products",
      navMice: "Mice",
      navKeyboards: "Keyboards",
      navMousepads: "Mousepads",
      navDeals: "Deals & Rewards",
      navSupport: "Support",
      langMenuHeader: "Language & Currency",

      // Mega Menu
      megaMiceTitle: "MICE",
      megaViewAll: "View All",
      catMice: "Mice",
      catKeyboards: "Keyboards",
      catMousepads: "Mousepads",
      catHeadphones: "Headphones",
      catController: "Controller",
      catAccessories: "Accessories",
      catGiftCards: "Gift Cards",

      // Search Modal
      searchPlaceholder: "Search mice, mechanical keyboards, mousepads, headsets...",
      quickSearchLabel: "Quick search:",
      searchTagMice: "Mice",
      searchTagKeyboards: "Keyboards",
      searchTagHeadsets: "Headsets",
      searchTagMousepads: "Mousepads",
      searchClose: "Close search",

      // Home Sections
      secTrending: "TRENDING PRODUCTS",
      secTrendingSub: "Top-tier tournament gear trusted by global eSports pros",
      secNew: "NEW ARRIVALS",
      secSale: "FLASH SALE - SPECIAL OFFERS",
      tabAll: "All Gear",
      tabMice: "Mice",
      tabKeyboards: "Keyboards",
      tabMousepads: "Mousepads",
      viewAllBtn: "View All Products",
      heroBuyNow: "SHOP NOW",

      // Trust Badges
      trust1Title: "Free Express Shipping",
      trust1Desc: "Fast insured delivery on all orders",
      trust2Title: "24-Month Official Warranty",
      trust2Desc: "Instant 1-to-1 replacement for defects",
      trust3Title: "100% Genuine eSports Gear",
      trust3Desc: "Authorized distributor for top brands",
      trust4Title: "24/7 Gamer Support",
      trust4Desc: "Direct assistance via Discord & Hotline",

      // Cart Drawer
      cartTitle: "Shopping Cart",
      cartEmpty: "Your shopping cart is empty",
      cartSubtotal: "Subtotal:",
      cartCheckoutBtn: "Proceed to Checkout",
      cartContinueBtn: "Continue Shopping",
      freeShippingNotice: "Free express shipping applied for today's orders!",

      // Account Dropdown
      accountTitle: "My Account",
      accountProfile: "My Profile",
      accountOrders: "My Orders",
      accountAddresses: "Address Book",
      accountRewards: "Points & Vouchers",
      accountLogout: "Sign Out",

      // Toasts
      toastSwitchLang: "Switched to English (USD)",
      toastAddToCart: "Added to cart successfully!",
    },

    vi: {
      langLabel: "VI / VND",
      flagSrc: "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
      flagAlt: "VI",
      currency: "VND",
      currencySymbol: "₫",
      rate: 1,

      // Header Nav
      navAll: "Tất cả sản phẩm",
      navMice: "Chuột",
      navKeyboards: "Bàn phím",
      navMousepads: "Lót chuột",
      navDeals: "Ưu đãi & Phần thưởng",
      navSupport: "Hỗ trợ",
      langMenuHeader: "Ngôn ngữ & Tiền tệ",

      // Mega Menu
      megaMiceTitle: "CHUỘT",
      megaViewAll: "Xem tất cả",
      catMice: "Chuột",
      catKeyboards: "Bàn phím",
      catMousepads: "Lót chuột",
      catHeadphones: "Headphones",
      catController: "Controller",
      catAccessories: "Accessories",
      catGiftCards: "Gift Cards",

      // Search Modal
      searchPlaceholder: "Tìm kiếm chuột, bàn phím cơ, lót chuột, tai nghe...",
      quickSearchLabel: "Tìm nhanh:",
      searchTagMice: "Chuột",
      searchTagKeyboards: "Bàn phím",
      searchTagHeadsets: "Tai nghe",
      searchTagMousepads: "Lót chuột",
      searchClose: "Đóng tìm kiếm",

      // Home Sections
      secTrending: "SẢN PHẨM NỔI BẬT",
      secTrendingSub: "Thiết bị thi đấu đỉnh cao được tin dùng bởi các tuyển thủ eSports hàng đầu",
      secNew: "SẢN PHẨM MỚI NHẤT",
      secSale: "ƯU ĐÃI ĐẶC BIỆT",
      tabAll: "Tất cả",
      tabMice: "Chuột",
      tabKeyboards: "Bàn phím",
      tabMousepads: "Lót chuột",
      viewAllBtn: "Xem tất cả sản phẩm",
      heroBuyNow: "MUA NGAY HÔM NAY",

      // Trust Badges
      trust1Title: "Giao Hàng Miễn Phí",
      trust1Desc: "Vận chuyển hỏa tốc toàn quốc",
      trust2Title: "Bảo Hành 24 Tháng",
      trust2Desc: "Đổi mới 1-1 trong 30 ngày nếu lỗi",
      trust3Title: "Chính Hãng 100%",
      trust3Desc: "Phân phối chính ngạch từ các thương hiệu",
      trust4Title: "Hỗ Trợ 24/7",
      trust4Desc: "Kỹ thuật viên tư vấn nhiệt tình",

      // Cart Drawer
      cartTitle: "Giỏ Hàng",
      cartEmpty: "Giỏ hàng của bạn đang trống",
      cartSubtotal: "Tạm tính:",
      cartCheckoutBtn: "Tiến hành thanh toán",
      cartContinueBtn: "Tiếp tục mua hàng",
      freeShippingNotice: "Miễn phí vận chuyển toàn quốc cho đơn hôm nay!",

      // Account Dropdown
      accountTitle: "Tài khoản",
      accountProfile: "Thông tin tài khoản",
      accountOrders: "Đơn hàng của tôi",
      accountAddresses: "Sổ địa chỉ",
      accountRewards: "Điểm & Voucher",
      accountLogout: "Đăng xuất",

      // Toasts
      toastSwitchLang: "Đã chuyển sang Tiếng Việt (VND)",
      toastAddToCart: "Đã thêm sản phẩm vào giỏ hàng!",
    }
  };

  // Lấy ngôn ngữ hiện tại: MẶC ĐỊNH LÀ "en" CHO NGƯỜI DÙNG MỚI THEO YÊU CẦU
  function getCurrentLang() {
    return localStorage.getItem("blue_language") || "en";
  }

  // Định dạng tiền tệ theo ngôn ngữ và tỷ giá
  function formatCurrency(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return getCurrentLang() === "en" ? "$0.00" : "0₫";
    }
    const lang = getCurrentLang();
    if (lang === "en") {
      // Tỷ giá 1 USD = 25.000 VND
      const usd = amount / 25000;
      return `$${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `${amount.toLocaleString("vi-VN")}₫`;
    }
  }

  // Áp dụng ngôn ngữ vào DOM
  function applyLanguage(lang) {
    const t = I18N_DATA[lang] || I18N_DATA.en;

    // 1. Cập nhật nút Header Language
    const flagEl = document.getElementById("header-lang-flag");
    const labelEl = document.getElementById("header-lang-label");
    if (flagEl) {
      flagEl.src = t.flagSrc;
      flagEl.alt = t.flagAlt;
    }
    if (labelEl) {
      labelEl.textContent = t.langLabel;
    }

    // 2. Cập nhật trạng thái active trong dropdown
    document.querySelectorAll(".lang-item").forEach((item) => {
      const itemLang = item.getAttribute("data-lang");
      if (itemLang === lang) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // 3. Cập nhật tất cả các thẻ có data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // 4. Cập nhật placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (t[key]) {
        el.placeholder = t[key];
      }
    });

    // 5. Cập nhật document lang
    document.documentElement.lang = lang;

    // 6. Bắn sự kiện ra toàn bộ ứng dụng để các module khác (Cart, Products, Mega) tự cập nhật
    window.dispatchEvent(new CustomEvent("blue:language-change", { detail: { lang, t } }));
  }

  // Chuyển đổi ngôn ngữ
  function switchLanguage(lang) {
    localStorage.setItem("blue_language", lang);
    applyLanguage(lang);
    const t = I18N_DATA[lang] || I18N_DATA.en;
    if (window.showToast) {
      window.showToast(t.toastSwitchLang, "info");
    }
  }

  // Gắn sự kiện cho Header Dropdown Menu
  function initLangDropdown() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#lang-currency-btn");
      const wrapper = document.getElementById("lang-currency-wrapper");

      // Click vào nút: bật/tắt dropdown
      if (btn && wrapper) {
        e.preventDefault();
        const isOpen = wrapper.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        return;
      }

      // Click chọn mục ngôn ngữ trong danh sách
      const langItem = e.target.closest(".lang-item");
      if (langItem) {
        e.preventDefault();
        const chosenLang = langItem.getAttribute("data-lang");
        if (chosenLang && chosenLang !== getCurrentLang()) {
          switchLanguage(chosenLang);
        }
        if (wrapper) wrapper.classList.remove("is-open");
        return;
      }

      // Click ra ngoài: đóng dropdown
      if (wrapper && wrapper.classList.contains("is-open")) {
        if (!e.target.closest("#lang-currency-wrapper")) {
          wrapper.classList.remove("is-open");
          const btnEl = document.getElementById("lang-currency-btn");
          if (btnEl) btnEl.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Phím Escape: đóng dropdown
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const wrapper = document.getElementById("lang-currency-wrapper");
        if (wrapper && wrapper.classList.contains("is-open")) {
          wrapper.classList.remove("is-open");
          const btnEl = document.getElementById("lang-currency-btn");
          if (btnEl) btnEl.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // Xuất ra toàn cục
  window.I18N = {
    getData: () => I18N_DATA,
    getCurrentLang,
    switchLanguage,
    applyLanguage,
    t: (key) => (I18N_DATA[getCurrentLang()] || I18N_DATA.en)[key] || key
  };
  window.formatCurrency = formatCurrency;

  // Khởi tạo ngay khi DOM sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      applyLanguage(getCurrentLang());
      initLangDropdown();
    });
  } else {
    applyLanguage(getCurrentLang());
    initLangDropdown();
  }
})();

