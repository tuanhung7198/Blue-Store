/**
 * i18n.js - HỆ THỐNG ĐA NGÔN NGỮ & ĐỔI TIỀN TỆ QUỐC TẾ TOÀN DIỆN
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
      catController: "Controllers",
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

      // Hero Carousel Slides (Bilingual)
      heroSlides: [
        {
          title: "ZERO+",
          subtitle: "Ultralight Wireless eSports Gaming Mouse",
          slogan: "Lightning Reflexes &nbsp;&nbsp;&nbsp; Absolute Victory",
          promo: "SAVE UP TO $16.00",
          badge: "Includes 2 Free Gifts: eSports Gaming Sleeve + ATK Magnetic Opener",
          ctaText: "Explore Gaming Mice",
          link: "products.html?category=Chuột"
        },
        {
          title: "BLAZING SKY",
          subtitle: "True 8000Hz Ultra-Polling Wireless Gaming Mouse",
          slogan: "Break All Limits in Competitive Gaming",
          promo: "STARTING AT $59.60",
          badge: "Free Insured Express Delivery on Today's Orders",
          ctaText: "Shop Now Today",
          link: "product-detail.html?id=26"
        },
        {
          title: "ATK RS7 PRO",
          subtitle: "Magnetic Hall Effect eSports Mechanical Keyboard",
          slogan: "Rapid Trigger 0.1mm &nbsp;&nbsp;&nbsp; Ultra-Low Latency",
          promo: "OFFICIAL 24-MONTH REPLACEMENT WARRANTY",
          badge: "Gift: Premium Coiled Cable & Switch Puller",
          ctaText: "Explore Keyboards",
          link: "products.html?category=Bàn%20phím"
        },
        {
          title: "ARTISAN ZERO",
          subtitle: "Tournament-Grade PORON Control Mousepad",
          slogan: "Precise Stopping Power &nbsp;&nbsp;&nbsp; Zero Slip Base",
          promo: "100% GENUINE IMPORTED FROM JAPAN",
          badge: "Exclusive: Teflon Skates & Microfiber Cleaning Cloth",
          ctaText: "Shop Mousepads",
          link: "products.html?category=Lót%20chuột"
        }
      ],

      // Trending Products Section
      secTrending: "TRENDING PRODUCTS",
      tabHot: "Featured",
      tabSale: "Best Sellers",
      tabNew: "New Arrivals",

      // Shop by Category Section
      catSectionTitle: "Shop by Gear Type",
      catSectionSub: "Explore gear by category and go straight to your battle station.",
      catViewAll: "VIEW ALL CATEGORIES",
      catMiceTitle: "Wireless Mice",
      catMiceDesc: "Ultralight ergonomics fine-tuned for speed, control, and tournament precision.",
      catKeyboardsTitle: "Gaming Keyboards",
      catKeyboardsDesc: "Magnetic, Hall Effect, and mechanical switches engineered for instantaneous actuation.",
      catMousepadsTitle: "eSports Mousepads",
      catMousepadsDesc: "High-grade PORON bases and micro-weave surfaces engineered for pixel-perfect aim.",
      catHeadsetsTitle: "eSports Headsets",
      catHeadsetsDesc: "Studio-grade spatial audio tuned for pinpoint footsteps and situational awareness.",
      exploreBtn: "Explore",

      // User Feedback Section
      feedbackTitle: "User Setup & Feedback Gallery",

      // Trust Badges
      trust1Title: "Free Express Shipping",
      trust1Desc: "Fast insured delivery on all orders",
      trust2Title: "24-Month Official Warranty",
      trust2Desc: "Instant 1-to-1 replacement for defects",
      trust3Title: "100% Genuine eSports Gear",
      trust3Desc: "Authorized distributor for top brands",
      trust4Title: "24/7 Gamer Support",
      trust4Desc: "Direct assistance via Discord & Hotline",

      // Footer
      footerDesc: "Delivering tournament-grade eSports gear and supreme gaming experiences. Standing by every victory you make.",
      footerAboutTitle: "About Us",
      footerBrandStory: "Brand Story",
      footerCareers: "Careers",
      footerTechNews: "Tech News",
      footerPrivacy: "Privacy Policy",
      footerServiceTitle: "Customer Service",
      footerWarranty: "Warranty Policy",
      footerShipping: "Shipping Guide",
      footerReturn: "1-to-1 Return Policy",
      footerFaq: "FAQ & Help Center",
      footerNewsletterTitle: "Stay Connected",
      footerNewsletterDesc: "Subscribe to receive exclusive drops, secret vouchers, and eSports tournament news.",
      footerEmailPlaceholder: "Enter your email address...",
      footerSubscribeBtn: "Subscribe",
      footerCopyright: "© 2026 Blue Gaming Gear Inc. All rights reserved. Built for champions.",

      // Cart Drawer
      cartTitle: "Shopping Cart",
      cartEmpty: "Your shopping cart is empty",
      cartEmptyDesc: "Explore our premium eSports collection to elevate your battlestation!",
      cartSubtotal: "Subtotal:",
      cartTaxNotice: "VAT included. Free shipping discount applied if threshold reached.",
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

      // Product Card Actions & Badges
      addToCartBtn: "Add to Cart",
      badgeHot: "HOT",
      badgeSale: "SALE",
      saveDiscount: "Save",

      // Catalog Page (products.html)
      catalogTitle: "ALL GAMING GEAR",
      catalogSubtitle: "Pro-grade gaming peripherals and battle-tested eSports hardware.",
      catalogBreadcrumbHome: "Home",
      catalogBreadcrumbAll: "All Products",
      filterHeader: "Filters",
      filterReset: "Reset All",
      filterCategory: "Category",
      filterBrand: "Brand",
      filterPrice: "Price Range",
      filterFeatures: "Specs & Features",
      filterStatus: "Availability",
      filterSort: "Sort by:",
      sortNewest: "Newest (Default)",
      sortPriceAsc: "Price: Low to High",
      sortPriceDesc: "Price: High to Low",
      sortHot: "Featured / Trending",
      sortNameAsc: "Name: A - Z",
      productsCountPrefix: "Showing",
      productsCountOf: "of",
      productsCountSuffix: "products",
      filterSearchPlaceholder: "Quick filter gear by name...",
      priceFrom: "From ($)",
      priceTo: "To ($)",
      btnApplyPrice: "Apply Price Range",
      pricePresetsLabel: "Popular price ranges:",
      presetAll: "All Prices",
      presetUnder1M: "< $40",
      preset1M2M: "$40 - $80",
      preset2M4M: "$80 - $160",
      presetOver4M: "> $160",
      statusAll: "All",
      statusSale: "On Sale",
      statusHot: "Featured",
      statusNew: "New Arrivals",
      allBrands: "All Brands",
      specAll: "All",
      specWireless: "Wireless",
      specWired: "Wired",
      specUltralight: "Ultralight",
      spec8k: "4K / 8K Polling",
      specMagnetic: "Magnetic / HE",

      // Product Detail (product-detail.html)
      detailTabDesc: "Description",
      detailTabSpecs: "Specifications",
      detailTabWarranty: "Warranty & Policy",
      detailTabReviews: "User Reviews",
      detailAddToCart: "Add to Cart",
      detailBuyNow: "Buy Now",
      detailPreOrder: "Pre-Order Now",
      detailNotify: "Notify When Available",
      detailRelatedTitle: "RELATED TOURNAMENT GEAR",
      stockIn: "In Stock (Ready for 24h dispatch)",
      stockPreorder: "Pre-order (Dispatches in 3 - 5 days)",
      stockOut: "Out of Stock (Restocking soon)",

      // Toasts
      toastSwitchLang: "Switched to English (USD)",
      toastAddToCart: "Added to cart successfully!"
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

      // Hero Carousel Slides (Bilingual)
      heroSlides: [
        {
          title: "ZERO+",
          subtitle: "Chuột Gaming Không Dây Siêu Nhẹ Chuẩn eSports",
          slogan: "Phản xạ thần tốc &nbsp;&nbsp;&nbsp; Chiến thắng tuyệt đối",
          promo: "TIẾT KIỆM ĐẾN 400.000₫",
          badge: "Tặng Kèm 2 Quà Tặng: Bao tay thi đấu eSports + Khui mở từ tính ATK",
          ctaText: "Khám Phá Chuột Gaming",
          link: "products.html?category=Chuột"
        },
        {
          title: "BLAZING SKY",
          subtitle: "Chuột Không Dây Tần Số Phản Hồi Cực Đại 8000Hz",
          slogan: "Bứt Phá Mọi Giới Hạn Thi Đấu Chuyên Nghiệp",
          promo: "CHỈ TỪ 1.490.000₫",
          badge: "Miễn Phí Giao Hàng Toàn Quốc Cho Đơn Hôm Nay",
          ctaText: "Mua Ngay Hôm Nay",
          link: "product-detail.html?id=26"
        },
        {
          title: "ATK RS7 PRO",
          subtitle: "Bàn Phím Cơ Từ Tính Magnetic Switch Chuẩn Thi Đấu",
          slogan: "Rapid Trigger 0.1mm &nbsp;&nbsp;&nbsp; Độ Trễ Cực Thấp",
          promo: "BẢO HÀNH CHÍNH HÃNG 24 THÁNG 1 ĐỔI 1",
          badge: "Tặng Kèm: Dây xoắn Custom cao cấp & Dụng cụ nhổ switch",
          ctaText: "Khám Phá Bàn Phím",
          link: "products.html?category=Bàn%20phím"
        },
        {
          title: "ARTISAN ZERO",
          subtitle: "Lót Chuột Cao Cấp Đế PORON Chuẩn Thi Đấu Quốc Tế",
          slogan: "Kiểm Soát Từng Pixel &nbsp;&nbsp;&nbsp; Dừng Chuột Hoàn Hảo",
          promo: "100% CHÍNH HÃNG NHẬP KHẨU TỪ NHẬT BẢN",
          badge: "Đặc quyền: Tặng kèm bộ feet dán chuột & khăn lau chuyên dụng",
          ctaText: "Xem Lót Chuột",
          link: "products.html?category=Lót%20chuột"
        }
      ],

      // Trending Products Section
      secTrending: "SẢN PHẨM THỊNH HÀNH",
      tabHot: "Nổi Bật",
      tabSale: "Bán Chạy Nhất",
      tabNew: "Mới Ra Mắt",

      // Shop by Category Section
      catSectionTitle: "Mua sắm theo loại gear",
      catSectionSub: "Khám phá gear theo danh mục và đi thẳng đến bộ setup bạn cần.",
      catViewAll: "XEM TẤT CẢ DANH MỤC",
      catMiceTitle: "Chuột không dây",
      catMiceDesc: "Form dáng siêu nhẹ được tinh chỉnh cho tốc độ, kiểm soát và độ chính xác thi đấu.",
      catKeyboardsTitle: "Bàn phím chơi game",
      catKeyboardsDesc: "Bàn phím Magnetic, Hall Effect và cơ học được tạo cho thao tác nhanh.",
      catMousepadsTitle: "Lót chuột thi đấu",
      catMousepadsDesc: "Bề mặt vải vi sợi và đế PORON bám bàn cho khả năng vẩy chuột chính xác.",
      catHeadsetsTitle: "Tai nghe gaming",
      catHeadsetsDesc: "Âm thanh vòm không gian chuẩn xác, tách bạch từng tiếng bước chân.",
      exploreBtn: "Khám phá",

      // User Feedback Section
      feedbackTitle: "Ảnh feedback từ người dùng",

      // Trust Badges
      trust1Title: "Giao Hàng Miễn Phí",
      trust1Desc: "Vận chuyển hỏa tốc toàn quốc",
      trust2Title: "Bảo Hành 24 Tháng",
      trust2Desc: "Đổi mới 1-1 trong 30 ngày nếu lỗi",
      trust3Title: "Chính Hãng 100%",
      trust3Desc: "Phân phối chính ngạch từ các thương hiệu",
      trust4Title: "Hỗ Trợ 24/7",
      trust4Desc: "Kỹ thuật viên tư vấn nhiệt tình",

      // Footer
      footerDesc: "Mang đến cho bạn những sản phẩm gear chất lượng và trải nghiệm chơi game tuyệt đỉnh. Luôn đồng hành cùng mọi chiến thắng của bạn.",
      footerAboutTitle: "Về Chúng Tôi",
      footerBrandStory: "Câu chuyện thương hiệu",
      footerCareers: "Tuyển dụng",
      footerTechNews: "Tin tức công nghệ",
      footerPrivacy: "Chính sách bảo mật",
      footerServiceTitle: "Chăm Sóc Khách Hàng",
      footerWarranty: "Chính sách bảo hành",
      footerShipping: "Hướng dẫn giao hàng",
      footerReturn: "Đổi trả hoàn tiền 1-1",
      footerFaq: "Câu hỏi thường gặp",
      footerNewsletterTitle: "Đăng Ký Nhận Tin",
      footerNewsletterDesc: "Nhận thông tin về các dòng sản phẩm mới, mã giảm giá độc quyền và sự kiện eSports.",
      footerEmailPlaceholder: "Nhập địa chỉ email của bạn...",
      footerSubscribeBtn: "Đăng ký",
      footerCopyright: "© 2026 Blue Gaming Gear Inc. Bảo lưu mọi quyền. Thiết kế dành cho game thủ chuyên nghiệp.",

      // Cart Drawer
      cartTitle: "Giỏ Hàng",
      cartEmpty: "Giỏ hàng của bạn đang trống",
      cartEmptyDesc: "Khám phá bộ sưu tập gaming gear cao cấp để nâng tầm setup của bạn!",
      cartSubtotal: "Tạm tính:",
      cartTaxNotice: "Đã bao gồm VAT. Phí giao hàng sẽ được áp dụng ưu đãi nếu đạt mốc.",
      cartCheckoutBtn: "Tiến hành thanh toán",
      cartContinueBtn: "Tiếp tục mua sắm",
      freeShippingNotice: "Miễn phí vận chuyển toàn quốc cho đơn hôm nay!",

      // Account Dropdown
      accountTitle: "Tài khoản",
      accountProfile: "Thông tin tài khoản",
      accountOrders: "Đơn hàng của tôi",
      accountAddresses: "Sổ địa chỉ",
      accountRewards: "Điểm & Voucher",
      accountLogout: "Đăng xuất",

      // Product Card Actions & Badges
      addToCartBtn: "Thêm Vào Giỏ Hàng",
      badgeHot: "HOT",
      badgeSale: "GIẢM",
      saveDiscount: "Tiết kiệm",

      // Catalog Page (products.html)
      catalogTitle: "TẤT CẢ SẢN PHẨM",
      catalogSubtitle: "Bộ sưu tập thiết bị gaming gear chuyên nghiệp, phục vụ các game thủ và thi đấu eSports đỉnh cao.",
      catalogBreadcrumbHome: "Trang chủ",
      catalogBreadcrumbAll: "Tất cả sản phẩm",
      filterHeader: "Bộ Lọc",
      filterReset: "Đặt lại",
      filterCategory: "Danh Mục",
      filterBrand: "Thương Hiệu",
      filterPrice: "Khoảng Giá",
      filterFeatures: "Thông Số & Tính Năng",
      filterStatus: "Tình Trạng",
      filterSort: "Sắp xếp:",
      sortNewest: "Mới nhất (Mặc định)",
      sortPriceAsc: "Giá: Thấp đến cao",
      sortPriceDesc: "Giá: Cao đến thấp",
      sortHot: "Sản phẩm Hot nhất",
      sortNameAsc: "Tên: A - Z",
      productsCountPrefix: "Hiển thị",
      productsCountOf: "trên tổng số",
      productsCountSuffix: "sản phẩm",
      filterSearchPlaceholder: "Lọc nhanh tên gear...",
      priceFrom: "Từ (₫)",
      priceTo: "Đến (₫)",
      btnApplyPrice: "Áp Dụng Khoảng Giá",
      pricePresetsLabel: "Mức giá phổ biến:",
      presetAll: "Mọi mức giá",
      presetUnder1M: "< 1 triệu",
      preset1M2M: "1tr - 2tr",
      preset2M4M: "2tr - 4tr",
      presetOver4M: "> 4 triệu",
      statusAll: "Tất cả",
      statusSale: "Đang giảm giá",
      statusHot: "Sản phẩm Nổi bật",
      statusNew: "Mới ra mắt",
      allBrands: "Tất cả thương hiệu",
      specAll: "Tất cả",
      specWireless: "Không Dây",
      specWired: "Có Dây",
      specUltralight: "Siêu Nhẹ",
      spec8k: "4K / 8K Polling",
      specMagnetic: "Từ Tính / HE",

      // Product Detail (product-detail.html)
      detailTabDesc: "Mô Tả Sản Phẩm",
      detailTabSpecs: "Thông Số Kỹ Thuật",
      detailTabWarranty: "Chính Sách Bảo Hành",
      detailTabReviews: "Đánh Giá Của Game Thủ",
      detailAddToCart: "Thêm Vào Giỏ Hàng",
      detailBuyNow: "Mua Ngay",
      detailPreOrder: "Đặt Hàng Trước",
      detailNotify: "Báo Khi Có Hàng",
      detailRelatedTitle: "SẢN PHẨM CÙNG HỆ SINH THÁI",
      stockIn: "Còn hàng (Sẵn sàng giao 24h)",
      stockPreorder: "Đặt trước (Giao sau 3 - 5 ngày)",
      stockOut: "Tạm hết hàng (Đang về đợt mới)",

      // Toasts
      toastSwitchLang: "Đã chuyển sang Tiếng Việt (VND)",
      toastAddToCart: "Đã thêm sản phẩm vào giỏ hàng!"
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

  // Từ điển tên sản phẩm tiếng Anh chuẩn quốc tế cho toàn bộ 32 sản phẩm
  const PRODUCT_NAMES_EN = {
    1: "Logitech G Pro X Superlight Wireless Gaming Mouse",
    2: "Razer Huntsman V2 Optical Gaming Keyboard",
    3: "Corsair HS80 RGB Wireless Gaming Headset",
    4: "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    5: "Keychron K8 Pro Wireless Mechanical Keyboard",
    6: "SteelSeries QcK Heavy Thick Cloth Gaming Mousepad",
    7: "LG UltraGear 27GN800 QHD 144Hz Gaming Monitor",
    8: "Secretlab Titan Evo 2022 Premium Gaming Chair",
    9: "HyperX Cloud III Wireless eSports Gaming Headset",
    10: "Logitech G102 Lightsync RGB Wired Gaming Mouse",
    11: "AKKO 3098B Multi-Mode Wireless Mechanical Keyboard",
    12: "Razer Goliathus Extended Chroma RGB Mousepad",
    13: "ASUS ROG Azoth 75% Custom Wireless Mechanical Keyboard",
    14: "SteelSeries Apex Pro TKL 2023 OmniPoint Mechanical Keyboard",
    15: "Corsair K70 RGB PRO Mechanical Gaming Keyboard",
    16: "MonsGeek M1W V3 Aluminum Wireless Mechanical Keyboard",
    17: "FL-Esports OG87 Retro White Mechanical Keyboard",
    18: "Aula F75 Wireless Gasket-Mount Mechanical Keyboard",
    19: "Varmilo VA87M Sea Melody Mechanical Keyboard",
    20: "ATK68 Magnetic Switch Hall Effect Gaming Keyboard",
    21: "Ducky One 3 Daybreak Hot-Swap Mechanical Keyboard",
    22: "Leopold FC900R PD Ash Yellow High-End Mechanical Keyboard",
    23: "Razer Viper V3 Pro Ultra-Lightweight Wireless Gaming Mouse",
    24: "Pulsar X2V2 Wireless Competitive eSports Mouse",
    25: "Zowie EC2-CW Ergonomic Wireless eSports Mouse",
    26: "ATK Blazing Sky F1 Pro 8000Hz Ultralight Wireless Mouse",
    27: "Ninjutso Sora V2 Ultralight 39g Wireless Mouse",
    28: "Endgame Gear OP1 8k Wired 8000Hz Competitive Mouse",
    29: "Lamzu Maya 4K Wireless eSports Gaming Mouse",
    30: "Artisan Ninja FX Zero XSoft Japanese Gaming Mousepad",
    31: "BenQ Zowie G-SR-SE Bi Competitive eSports Mousepad",
    32: "Pulsar Superglide Ultra-Fast Tempered Glass Mousepad"
  };

  const CATEGORY_MAP_EN = {
    "all": "All Products",
    "Chuột": "Mice",
    "Bàn phím": "Keyboards",
    "Lót chuột": "Mousepads",
    "Tai nghe": "Headsets",
    "Màn hình": "Monitors",
    "Ghế gaming": "Gaming Chairs",
    "Tay cầm": "Controllers",
    "Controller": "Controllers",
    "Phụ kiện": "Accessories",
    "Accessories": "Accessories",
    "Gift Cards": "Gift Cards"
  };

  function getProductName(product) {
    if (!product) return "";
    const lang = getCurrentLang();
    if (lang === "en") {
      const pid = product.id !== undefined ? Number(product.id) : null;
      if (pid && PRODUCT_NAMES_EN[pid]) {
        return PRODUCT_NAMES_EN[pid];
      }
      if (product.name_en) return product.name_en;
      return (product.name || "")
        .replace(/^Chuột Gaming Không Dây\s+/i, "Wireless Gaming Mouse ")
        .replace(/^Chuột Không Dây\s+/i, "Wireless Mouse ")
        .replace(/^Chuột Gaming Có Dây\s+/i, "Wired Gaming Mouse ")
        .replace(/^Chuột Có Dây\s+/i, "Wired Mouse ")
        .replace(/^Chuột\s+/i, "Mouse ")
        .replace(/^Bàn Phím Cơ Không Dây\s+/i, "Wireless Mechanical Keyboard ")
        .replace(/^Bàn Phím Cơ\s+/i, "Mechanical Keyboard ")
        .replace(/^Bàn Phím Từ Tính\s+/i, "Magnetic Switch Keyboard ")
        .replace(/^Lót Chuột Kính Cường Lực\s+/i, "Tempered Glass Mousepad ")
        .replace(/^Lót Chuột\s+/i, "Mousepad ")
        .replace(/^Tai Nghe Gaming\s+/i, "Gaming Headset ")
        .replace(/^Tai Nghe\s+/i, "Headset ")
        .replace(/^Màn Hình Gaming\s+/i, "Gaming Monitor ")
        .replace(/^Ghế Gaming\s+/i, "Gaming Chair ");
    }
    return product.name || "";
  }

  function getCategoryName(category) {
    if (!category) return "";
    if (getCurrentLang() === "en") {
      return CATEGORY_MAP_EN[category] || category;
    }
    return category;
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
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // 4. Cập nhật tất cả các thẻ có data-i18n-html (giữ cấu trúc HTML hoặc icons)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // 5. Cập nhật placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // 6. Cập nhật title tooltip
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (t[key] !== undefined) {
        el.title = t[key];
      }
    });

    // 7. Cập nhật document lang
    document.documentElement.lang = lang;

    // 8. Bắn sự kiện ra toàn bộ ứng dụng để các module khác (Cart, Products, Mega, Hero) tự cập nhật
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
    getProductName,
    getCategoryName,
    t: (key) => (I18N_DATA[getCurrentLang()] || I18N_DATA.en)[key] || key
  };
  window.formatCurrency = formatCurrency;
  window.getProductName = getProductName;
  window.getCategoryName = getCategoryName;

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
