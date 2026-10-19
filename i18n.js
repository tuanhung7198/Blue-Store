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
      flagSrc:
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
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
      searchPlaceholder:
        "Search mice, mechanical keyboards, mousepads, headsets...",
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
          badge:
            "Includes 2 Free Gifts: eSports Gaming Sleeve + ATK Magnetic Opener",
          ctaText: "Explore Gaming Mice",
          link: "products.html?category=Chuột",
        },
        {
          title: "BLAZING SKY",
          subtitle: "True 8000Hz Ultra-Polling Wireless Gaming Mouse",
          slogan: "Break All Limits in Competitive Gaming",
          promo: "STARTING AT $59.60",
          badge: "Free Insured Express Delivery on Today's Orders",
          ctaText: "Shop Now Today",
          link: "product-detail.html?id=26",
        },
        {
          title: "ATK RS7 PRO",
          subtitle: "Magnetic Hall Effect eSports Mechanical Keyboard",
          slogan: "Rapid Trigger 0.1mm &nbsp;&nbsp;&nbsp; Ultra-Low Latency",
          promo: "OFFICIAL 24-MONTH REPLACEMENT WARRANTY",
          badge: "Gift: Premium Coiled Cable & Switch Puller",
          ctaText: "Explore Keyboards",
          link: "products.html?category=Bàn%20phím",
        },
        {
          title: "ARTISAN ZERO",
          subtitle: "Tournament-Grade PORON Control Mousepad",
          slogan: "Precise Stopping Power &nbsp;&nbsp;&nbsp; Zero Slip Base",
          promo: "100% GENUINE IMPORTED FROM JAPAN",
          badge: "Exclusive: Teflon Skates & Microfiber Cleaning Cloth",
          ctaText: "Shop Mousepads",
          link: "products.html?category=Lót%20chuột",
        },
      ],

      // Trending Products Section
      secTrending: "TRENDING PRODUCTS",
      tabHot: "Featured",
      tabSale: "Best Sellers",
      tabNew: "New Arrivals",

      // Shop by Category Section
      catSectionTitle: "Shop by Gear Type",
      catSectionSub:
        "Explore gear by category and go straight to your battle station.",
      catViewAll: "VIEW ALL CATEGORIES",
      catMiceTitle: "Wireless Mice",
      catMiceDesc:
        "Ultralight ergonomics fine-tuned for speed, control, and tournament precision.",
      catKeyboardsTitle: "Gaming Keyboards",
      catKeyboardsDesc:
        "Magnetic, Hall Effect, and mechanical switches engineered for instantaneous actuation.",
      catMousepadsTitle: "eSports Mousepads",
      catMousepadsDesc:
        "High-grade PORON bases and micro-weave surfaces engineered for pixel-perfect aim.",
      catHeadsetsTitle: "eSports Headsets",
      catHeadsetsDesc:
        "Studio-grade spatial audio tuned for pinpoint footsteps and situational awareness.",
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
      footerDesc:
        "Delivering tournament-grade eSports gear and supreme gaming experiences. Standing by every victory you make.",
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
      footerNewsletterDesc:
        "Subscribe to receive exclusive drops, secret vouchers, and eSports tournament news.",
      footerEmailPlaceholder: "Enter your email address...",
      footerSubscribeBtn: "Subscribe",
      footerCopyright:
        "© 2026 Blue Gaming Gear Inc. All rights reserved. Built for champions.",

      // Cart Drawer
      cartTitle: "Shopping Cart",
      cartEmpty: "Your shopping cart is empty",
      cartEmptyDesc:
        "Explore our premium eSports collection to elevate your battlestation!",
      cartSubtotal: "Subtotal:",
      cartTaxNotice:
        "VAT included. Free shipping discount applied if threshold reached.",
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
      catalogSubtitle:
        "Pro-grade gaming peripherals and battle-tested eSports hardware.",
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

      // Stock Alert Modal
      stockAlertTitle: "Notify Me When Available",
      stockAlertSubtitle:
        "Leave your contact info and Blue Gaming Gear will notify you with an exclusive voucher as soon as new stock lands.",
      stockAlertNameLabel: "Full Name",
      stockAlertNamePlaceholder: "e.g. Alex Johnson",
      stockAlertEmailLabel: "Notification Email",
      stockAlertEmailPlaceholder: "e.g. gamer@domain.com",
      stockAlertPhoneLabel: "Phone Number (SMS / WhatsApp)",
      stockAlertPhonePlaceholder: "e.g. 0912345678",
      stockAlertSubmitBtn: "Subscribe for Restock Alert",
      stockAlertSuccessToast:
        "Subscribed successfully! We will notify you when gear arrives.",

      // Toasts
      toastSwitchLang: "Switched to English (USD)",
      toastAddToCart: "Added to cart successfully!",

      // Header Utilities & User Dropdown
      searchTitle: "Search (Ctrl+K)",
      accountBtnTitle: "Member Account",
      accountBtnAria: "Member Account",
      accountProfile: "My Profile",
      accountOrders: "My Orders",
      accountAddresses: "Address Book",
      accountRewards: "Points & Vouchers",
      accountLogout: "Sign Out",
      demoAlexName: "Alex Johnson (VIP Diamond)",
      demoJordanName: "Jordan Tran (Challenger)",
      userRankDiamond: "VIP Diamond",

      // Live Search Modal
      searchModalAria: "Search products",
      searchPlaceholder:
        "Search mice, mechanical keyboards, mousepads, headsets...",
      searchClearAria: "Clear search query",
      searchCloseAria: "Close search",
      searchQuickTagLabel: "Quick search:",
      searchEmptyPrompt:
        "Type product name, brand, or category for instant search.",
      searchFoundPrefix: "Found",
      searchFoundSuffix: "matching products:",
      searchNoResultsTitle: "No products found matching",
      searchNoResultsDesc:
        "Try keywords like: Mice, Keyboard, Razer, Logitech, Corsair...",
      searchAddBtnTitle: "Add to Cart",

      // Cart Drawer & Free Shipping
      cartDrawerAria: "Your shopping cart",
      cartCloseAria: "Close cart",
      cartDrawerTitle: "Shopping Cart",
      cartItemsCount: "items",
      cartItemSingle: "item",
      cartEmpty: "Your shopping cart is empty",
      cartEmptyDesc:
        "Explore our premium eSports collection to elevate your battlestation!",
      cartContinueBtn: "Shop Now",
      cartSubtotal: "Subtotal:",
      cartTaxNotice:
        "VAT included. Free shipping discount applied if threshold reached.",
      cartCheckoutBtn: "PROCEED TO CHECKOUT",
      shippingDefault: "Free express delivery nationwide on orders over $40",
      shippingFreeUnlocked: "You unlocked FREE Express Shipping!",
      shippingAddMorePrefix: "Add",
      shippingAddMoreSuffix: "more to get FREE shipping!",

      // Express Checkout 2-Step Modal
      checkoutModalTitle: "Express Checkout",
      checkoutCloseAria: "Close checkout",
      step1NavTitle: "Step 1: Shipping address",
      step2NavTitle: "Step 2: Payment & confirmation",
      step1Label: "Shipping Address",
      step2Label: "Payment & Review",
      step1PaneTitle: "Express Delivery Information",
      step1PaneSubtitle:
        "Fast 24h delivery with parcel inspection prior to payment.",
      labelCustName: "Recipient Full Name",
      placeholderCustName: "e.g. Alex Johnson",
      labelCustPhone: "Contact Phone Number",
      placeholderCustPhone: "e.g. 0912345678",
      labelCustAddress: "Detailed Street Address (House No, Street, Ward)",
      placeholderCustAddress: "e.g. 18 Grand Avenue, Central District",
      labelCustCity: "City / Province",
      cityHanoi: "Hanoi (Express 2h - 24h)",
      cityHcm: "Ho Chi Minh City (24h - 48h)",
      cityDanang: "Da Nang",
      cityHaiphong: "Hai Phong",
      cityCantho: "Can Tho",
      cityOther: "Other Provinces (Nationwide)",
      labelCustNote: "Delivery Notes (Optional)",
      placeholderCustNote: "e.g. Call before delivery, allow parcel check",
      btnGotoStep2: "Continue to Payment",
      step2PaneTitle: "Payment Method",
      step2PaneSubtitle:
        "Select a secure, encrypted payment method for eSports gear.",
      pmCodTitle: "Cash on Delivery (COD)",
      pmCodDesc: "Inspect parcel upon receipt, pay directly to courier",
      pmMomoTitle: "MoMo E-Wallet",
      pmMomoDesc: "Instant scan QR code payment, get $0.80 instant discount",
      pmVnpayTitle: "VNPAY / Banking App",
      pmVnpayDesc: "Supports VietQR, all local & international bank apps",
      pmBankTitle: "Direct Bank Wire Transfer",
      pmBankDesc: "Manual bank transfer to Blue Gaming Gear corporate account",
      checkoutOrderReview: "Order Summary Review:",
      checkoutSummarySubtotal: "Subtotal",
      checkoutSummaryShipping: "Shipping Fee",
      checkoutSummaryShippingFree: "FREE",
      checkoutSummaryDiscount: "MoMo Discount",
      checkoutSummaryTotal: "Total Amount",
      btnBacktoStep1: "Back to Shipping Info",
      btnConfirmOrder: "Confirm Order Now",
      step3SuccessTitle: "Order Placed Successfully!",
      orderCodePrefix: "Order Code:",
      orderSuccessText:
        "Thank you for shopping with Blue Gaming Gear. Your order is being packed and prepared for express courier pickup.",
      timelineStep1: "Order Received",
      timelineStep2: "Packing Gear",
      timelineStep3: "Handover to Courier",
      btnCompleteShopping: "Complete Shopping",

      // Account Page (account.html)
      accPageTitle: "eSports Member Account | Blue Gaming Gear",
      accBreadcrumbHome: "Home",
      accBreadcrumbCurrent: "Member Account",
      authPassportBadge: "BLUE PASSPORT",
      authHeroTitle: "MEMBER ACCOUNT",
      authHeroDesc:
        "Sign in to unlock VIP perks, track orders in real time, and manage official eSports warranty.",
      tabLogin: "Sign In",
      tabRegister: "Create Account",
      labelLoginEmail: "Email Address",
      placeholderLoginEmail: "e.g. gamer@blue.vn",
      labelLoginPassword: "Password",
      placeholderLoginPassword: "Enter your password",
      linkForgotPassword: "Forgot password?",
      labelRememberLogin: "Remember my login on this device",
      btnSubmitLogin: "Sign In Now",
      demoAccountsCardTitle: "Demo Accounts (1-Click Tester Login):",
      labelRegName: "Full Name",
      placeholderRegName: "Alex Johnson",
      labelRegEmail: "Email Address",
      placeholderRegEmail: "gamer@domain.com",
      labelRegPhone: "Contact Phone",
      placeholderRegPhone: "09xxxxxxxx",
      labelRegPassword: "Password",
      placeholderRegPassword: "At least 6 characters",
      labelRegConfirmPassword: "Confirm Password",
      placeholderRegConfirmPassword: "Re-enter your password",
      labelTermsAgree:
        "I agree to Blue Gaming Gear's Terms of Service & Privacy Policy",
      btnSubmitRegister: "Create Account (Earn 200 Points)",

      // Account Dashboard
      btnChangeAvatarTitle: "Change profile avatar",
      pointsUnit: "Points",
      dashTabProfile: "Profile Information",
      dashTabOrders: "My Orders",
      dashTabAddresses: "Shipping Addresses",
      dashTabRewards: "Points & Vouchers",
      dashTabSecurity: "Security & Password",
      dashTabLogout: "Sign Out",

      paneProfileTitle: "ACCOUNT PROFILE",
      paneProfileDesc:
        "Manage security settings and personal info to protect your account and receive eSports drops.",
      profNameLabel: "Full Name",
      profEmailLabel: "Email (Read-only)",
      profPhoneLabel: "Phone Number",
      profCityLabel: "City / Province",
      profAddressLabel: "Detailed Address (Street, Number, Ward)",
      profAddressPlaceholder: "e.g. 18 Grand Avenue, Central District",
      profGenderLabel: "Gender",
      genderMale: "Male",
      genderFemale: "Female",
      genderOther: "Undisclosed",
      profBirthdateLabel: "Date of Birth",
      btnSaveProfile: "Save Changes",

      paneOrdersTitle: "MY ORDERS",
      paneOrdersDesc:
        "Track order history, live delivery status, and warranty for your eSports gaming gear.",
      orderFilterAll: "All",
      orderFilterProcessing: "Processing",
      orderFilterShipping: "Shipping",
      orderFilterCompleted: "Completed",
      orderFilterCancelled: "Cancelled",
      ordersEmptyTitle: "No orders found",
      ordersEmptyDesc:
        "You don't have any orders with this status. Discover pro eSports gear now!",
      btnShopNow: "Explore Gear Now",
      orderCodeText: "Order ID:",
      orderDeliverToText: "Deliver to:",
      orderTotalText: "Total Amount:",
      btnCancelOrder: "Cancel Order",
      btnRepurchase: "Buy Again",

      paneAddressesTitle: "SHIPPING ADDRESSES",
      paneAddressesDesc:
        "Save preferred addresses for instant 1-click checkout.",
      addrHomeTitle: "Home",
      badgeDefaultAddr: "Default",
      btnEditAddr: "Edit",
      btnAddNewAddr: "Add New Shipping Address",

      paneRewardsTitle: "REWARD POINTS & VIP VOUCHERS",
      paneRewardsDesc:
        "Earn points with every purchase and redeem exclusive pro-gamer discounts.",
      tierCurrentLabel: "CURRENT VIP TIER",
      vouchersSectionTitle: "Exclusive Vouchers Available For You:",
      voucher10Title: "10% OFF ALL GEAR",
      voucher10Desc: "Valid on orders over $40",
      voucherFreeTitle: "FREE EXPRESS SHIPPING",
      voucherFreeDesc: "Fast insured delivery nationwide on any order",
      voucher50kTitle: "$2.00 WELCOME GIFT",
      voucher50kDesc: "Welcome reward for first-time gear buyers",
      btnCopyCode: "Copy",
      copiedCode: "Copied!",

      paneSecurityTitle: "ACCOUNT SECURITY",
      paneSecurityDesc:
        "Update your password regularly to secure your orders and account privileges.",
      passCurrentLabel: "Current Password",
      passCurrentPlaceholder: "Enter current password",
      passNewLabel: "New Password",
      passNewPlaceholder: "At least 6 characters",
      passConfirmLabel: "Confirm New Password",
      passConfirmPlaceholder: "Re-enter new password",
      btnUpdatePass: "Update Password",

      // Password Strength Meter
      pwdStrengthDefault: "Password strength: None",
      pwdStrengthWeak: "Weak",
      pwdStrengthFair: "Fair",
      pwdStrengthGood: "Good",
      pwdStrengthStrong: "Strong (eSports Grade)",
      pwdStrengthHint: "8+ chars with uppercase, number & symbol",

      // Forgot Password Modal
      forgotModalTitle: "RESET BLUE PASSPORT",
      forgotModalSubtitle: "Enter your registered email to receive a password reset verification code.",
      forgotModalEmailLabel: "Registered Email",
      forgotModalEmailPlaceholder: "e.g. gamer@blue.vn",
      forgotModalBtnSend: "Send Verification Code",
      forgotModalSuccessTitle: "Verification Code Sent!",
      forgotModalSuccessDesc: "We dispatched a 6-digit recovery code to",
      forgotModalHotlineNote: "Need urgent access? Contact 24/7 Gamer Hotline: 1900 6868",
      forgotModalClose: "Close",

      // Address Book Modal & Actions
      paneAddressesHeaderAdd: "Add Address",
      addrTagLabel: "Address Label / Type",
      addrTagHome: "Home",
      addrTagOffice: "Office / Studio",
      addrTagGaming: "Gaming Team House",
      addrTagOther: "Other",
      addrRecipientName: "Recipient Name",
      addrPhone: "Contact Phone",
      addrStreet: "Street Address",
      addrCity: "City / Province",
      addrIsDefault: "Set as default shipping address",
      addrBtnSave: "Save Address",
      addrBtnCancel: "Cancel",
      addrModalAddTitle: "ADD NEW SHIPPING ADDRESS",
      addrModalEditTitle: "EDIT SHIPPING ADDRESS",
      btnSetDefaultAddr: "Set Default",
      btnDeleteAddr: "Delete",
      confirmDeleteAddrTitle: "Delete Shipping Address?",
      confirmDeleteAddrMsg: "Are you sure you want to remove this address from your Blue Passport?",
      toastAddrSaved: "Shipping address saved successfully!",
      toastAddrDeleted: "Shipping address deleted!",
      toastAddrDefaultSet: "Default shipping address updated!",

      // Confirmation Modals
      confirmSignOutTitle: "Sign Out of Blue Passport?",
      confirmSignOutMsg: "Are you sure you want to end your current session? You will need to sign in again to access VIP rewards and order history.",
      confirmCancelOrderTitle: "Cancel Order",
      confirmCancelOrderMsg: "Are you sure you want to cancel order",
      btnModalConfirm: "Confirm",
      btnModalCancel: "Dismiss",
    },

    vi: {
      langLabel: "VI / VND",
      flagSrc:
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
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
          badge:
            "Tặng Kèm 2 Quà Tặng: Bao tay thi đấu eSports + Khui mở từ tính ATK",
          ctaText: "Khám Phá Chuột Gaming",
          link: "products.html?category=Chuột",
        },
        {
          title: "BLAZING SKY",
          subtitle: "Chuột Không Dây Tần Số Phản Hồi Cực Đại 8000Hz",
          slogan: "Bứt Phá Mọi Giới Hạn Thi Đấu Chuyên Nghiệp",
          promo: "CHỈ TỪ 1.490.000₫",
          badge: "Miễn Phí Giao Hàng Toàn Quốc Cho Đơn Hôm Nay",
          ctaText: "Mua Ngay Hôm Nay",
          link: "product-detail.html?id=26",
        },
        {
          title: "ATK RS7 PRO",
          subtitle: "Bàn Phím Cơ Từ Tính Magnetic Switch Chuẩn Thi Đấu",
          slogan: "Rapid Trigger 0.1mm &nbsp;&nbsp;&nbsp; Độ Trễ Cực Thấp",
          promo: "BẢO HÀNH CHÍNH HÃNG 24 THÁNG 1 ĐỔI 1",
          badge: "Tặng Kèm: Dây xoắn Custom cao cấp & Dụng cụ nhổ switch",
          ctaText: "Khám Phá Bàn Phím",
          link: "products.html?category=Bàn%20phím",
        },
        {
          title: "ARTISAN ZERO",
          subtitle: "Lót Chuột Cao Cấp Đế PORON Chuẩn Thi Đấu Quốc Tế",
          slogan: "Kiểm Soát Từng Pixel &nbsp;&nbsp;&nbsp; Dừng Chuột Hoàn Hảo",
          promo: "100% CHÍNH HÃNG NHẬP KHẨU TỪ NHẬT BẢN",
          badge: "Đặc quyền: Tặng kèm bộ feet dán chuột & khăn lau chuyên dụng",
          ctaText: "Xem Lót Chuột",
          link: "products.html?category=Lót%20chuột",
        },
      ],

      // Trending Products Section
      secTrending: "SẢN PHẨM THỊNH HÀNH",
      tabHot: "Nổi Bật",
      tabSale: "Bán Chạy Nhất",
      tabNew: "Mới Ra Mắt",

      // Shop by Category Section
      catSectionTitle: "Mua sắm theo loại gear",
      catSectionSub:
        "Khám phá gear theo danh mục và đi thẳng đến bộ setup bạn cần.",
      catViewAll: "XEM TẤT CẢ DANH MỤC",
      catMiceTitle: "Chuột không dây",
      catMiceDesc:
        "Form dáng siêu nhẹ được tinh chỉnh cho tốc độ, kiểm soát và độ chính xác thi đấu.",
      catKeyboardsTitle: "Bàn phím chơi game",
      catKeyboardsDesc:
        "Bàn phím Magnetic, Hall Effect và cơ học được tạo cho thao tác nhanh.",
      catMousepadsTitle: "Lót chuột thi đấu",
      catMousepadsDesc:
        "Bề mặt vải vi sợi và đế PORON bám bàn cho khả năng vẩy chuột chính xác.",
      catHeadsetsTitle: "Tai nghe gaming",
      catHeadsetsDesc:
        "Âm thanh vòm không gian chuẩn xác, tách bạch từng tiếng bước chân.",
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
      footerDesc:
        "Mang đến cho bạn những sản phẩm gear chất lượng và trải nghiệm chơi game tuyệt đỉnh. Luôn đồng hành cùng mọi chiến thắng của bạn.",
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
      footerNewsletterDesc:
        "Nhận thông tin về các dòng sản phẩm mới, mã giảm giá độc quyền và sự kiện eSports.",
      footerEmailPlaceholder: "Nhập địa chỉ email của bạn...",
      footerSubscribeBtn: "Đăng ký",
      footerCopyright:
        "© 2026 Blue Gaming Gear Inc. Bảo lưu mọi quyền. Thiết kế dành cho game thủ chuyên nghiệp.",

      // Cart Drawer
      cartTitle: "Giỏ Hàng",
      cartEmpty: "Giỏ hàng của bạn đang trống",
      cartEmptyDesc:
        "Khám phá bộ sưu tập gaming gear cao cấp để nâng tầm setup của bạn!",
      cartSubtotal: "Tạm tính:",
      cartTaxNotice:
        "Đã bao gồm VAT. Phí giao hàng sẽ được áp dụng ưu đãi nếu đạt mốc.",
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
      catalogSubtitle:
        "Bộ sưu tập thiết bị gaming gear chuyên nghiệp, phục vụ các game thủ và thi đấu eSports đỉnh cao.",
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

      // Stock Alert Modal
      stockAlertTitle: "Nhận Thông Báo Khi Hàng Về",
      stockAlertSubtitle:
        "Để lại thông tin liên hệ, Blue Gaming Gear sẽ gửi thông báo và tặng voucher độc quyền ngay khi lô hàng cập bến kho.",
      stockAlertNameLabel: "Họ và tên của bạn",
      stockAlertNamePlaceholder: "Ví dụ: Hoàng Long",
      stockAlertEmailLabel: "Địa chỉ Email nhận tin",
      stockAlertEmailPlaceholder: "Ví dụ: gamer@gmail.com",
      stockAlertPhoneLabel: "Số điện thoại nhận tin SMS / Zalo",
      stockAlertPhonePlaceholder: "Ví dụ: 0912345678",
      stockAlertSubmitBtn: "Đăng ký nhận tin miễn phí",
      stockAlertSuccessToast:
        "Đăng ký nhận thông báo thành công! Blue sẽ báo bạn sớm nhất.",

      // Toasts
      toastSwitchLang: "Đã chuyển sang Tiếng Việt (VND)",
      toastAddToCart: "Đã thêm sản phẩm vào giỏ hàng!",

      // Header Utilities & User Dropdown
      searchTitle: "Tìm kiếm (Ctrl+K)",
      accountBtnTitle: "Tài khoản thành viên",
      accountBtnAria: "Tài khoản thành viên",
      accountProfile: "Thông tin tài khoản",
      accountOrders: "Đơn hàng của tôi",
      accountAddresses: "Sổ địa chỉ",
      accountRewards: "Điểm & Voucher",
      accountLogout: "Đăng xuất",
      demoAlexName: "Alex Nguyễn (VIP Diamond)",
      demoJordanName: "Jordan Trần (Challenger)",
      userRankDiamond: "VIP Diamond",

      // Live Search Modal
      searchModalAria: "Tìm kiếm sản phẩm",
      searchPlaceholder: "Tìm kiếm chuột, bàn phím cơ, lót chuột, tai nghe...",
      searchClearAria: "Xóa từ khóa",
      searchCloseAria: "Đóng tìm kiếm",
      searchQuickTagLabel: "Tìm nhanh:",
      searchEmptyPrompt:
        "Nhập tên sản phẩm, thương hiệu hoặc danh mục để tìm kiếm tức thì.",
      searchFoundPrefix: "Tìm thấy",
      searchFoundSuffix: "sản phẩm phù hợp:",
      searchNoResultsTitle: "Không tìm thấy sản phẩm nào khớp với",
      searchNoResultsDesc:
        "Vui lòng thử từ khóa khác như: Chuột, Bàn phím, Razer, Logitech, Corsair...",
      searchAddBtnTitle: "Thêm vào giỏ",

      // Cart Drawer & Free Shipping
      cartDrawerAria: "Giỏ hàng của bạn",
      cartCloseAria: "Đóng giỏ hàng",
      cartDrawerTitle: "Giỏ Hàng",
      cartItemsCount: "món",
      cartItemSingle: "món",
      cartEmpty: "Giỏ hàng của bạn đang trống",
      cartEmptyDesc:
        "Khám phá bộ sưu tập gaming gear cao cấp để nâng tầm setup của bạn!",
      cartContinueBtn: "Mua sắm ngay",
      cartSubtotal: "Tạm tính:",
      cartTaxNotice:
        "Đã bao gồm VAT. Phí giao hàng sẽ được áp dụng ưu đãi nếu đạt mốc.",
      cartCheckoutBtn: "TIẾN HÀNH THANH TOÁN",
      shippingDefault: "Miễn phí giao hàng toàn quốc cho đơn từ 1.000.000₫",
      shippingFreeUnlocked: "Bạn được MIỄN PHÍ vận chuyển!",
      shippingAddMorePrefix: "Mua thêm",
      shippingAddMoreSuffix: "để được MIỄN PHÍ vận chuyển!",

      // Express Checkout 2-Step Modal
      checkoutModalTitle: "Đặt Hàng Siêu Tốc",
      checkoutCloseAria: "Đóng thanh toán",
      step1NavTitle: "Bước 1: Địa chỉ nhận hàng",
      step2NavTitle: "Bước 2: Thanh toán & xác nhận",
      step1Label: "Địa Chỉ Nhận Hàng",
      step2Label: "Thanh Toán & Xác Nhận",
      step1PaneTitle: "Thông Tin Giao Hàng Siêu Tốc",
      step1PaneSubtitle:
        "Giao nhanh 24h & hỗ trợ đồng kiểm bưu tá trước khi thanh toán.",
      labelCustName: "Họ và tên người nhận",
      placeholderCustName: "Ví dụ: Hoàng Long",
      labelCustPhone: "Số điện thoại liên hệ",
      placeholderCustPhone: "Ví dụ: 0912345678",
      labelCustAddress: "Địa chỉ chi tiết (Số nhà, tên đường, phường/xã)",
      placeholderCustAddress: "Ví dụ: 88 Phố Cầu Giấy, P. Dịch Vọng",
      labelCustCity: "Tỉnh / Thành phố",
      cityHanoi: "Hà Nội (Hỏa tốc 2h - 24h)",
      cityHcm: "TP. Hồ Chí Minh (Giao 24h - 48h)",
      cityDanang: "Đà Nẵng",
      cityHaiphong: "Hải Phòng",
      cityCantho: "Cần Thơ",
      cityOther: "Tỉnh thành khác (Toàn quốc)",
      labelCustNote: "Ghi chú giao hàng (Tùy chọn)",
      placeholderCustNote: "Ví dụ: Cho đồng kiểm, gọi trước khi giao",
      btnGotoStep2: "Tiếp tục sang thanh toán",
      step2PaneTitle: "Phương Thức Thanh Toán",
      step2PaneSubtitle:
        "Lựa chọn cổng thanh toán an toàn, bảo mật tiêu chuẩn eSports.",
      pmCodTitle: "Thanh toán khi nhận hàng (COD)",
      pmCodDesc: "Đồng kiểm bưu tá khi nhận hàng, thanh toán tiền mặt",
      pmMomoTitle: "Ví điện tử MoMo",
      pmMomoDesc:
        "Quét mã QR thanh toán tức thì, nhận ngay voucher giảm 20.000₫",
      pmVnpayTitle: "Cổng thanh toán VNPAY / Ngân hàng",
      pmVnpayDesc: "Hỗ trợ quét VietQR qua 40+ ứng dụng ngân hàng nội địa",
      pmBankTitle: "Chuyển khoản ngân hàng trực tiếp",
      pmBankDesc:
        "Chuyển khoản trực tiếp tới tài khoản công ty Blue Gaming Gear",
      checkoutOrderReview: "Tóm Tắt Đơn Hàng:",
      checkoutSummarySubtotal: "Tiền hàng",
      checkoutSummaryShipping: "Phí vận chuyển",
      checkoutSummaryShippingFree: "MIỄN PHÍ",
      checkoutSummaryDiscount: "Giảm giá MoMo",
      checkoutSummaryTotal: "Tổng thanh toán",
      btnBacktoStep1: "Quay lại thông tin giao hàng",
      btnConfirmOrder: "Xác Nhận Đặt Hàng Ngay",
      step3SuccessTitle: "Đặt Hàng Thành Công!",
      orderCodePrefix: "Mã đơn hàng:",
      orderSuccessText:
        "Cảm ơn bạn đã lựa chọn Blue Gaming Gear. Đơn hàng của bạn đang được đóng gói và chuẩn bị giao.",
      timelineStep1: "Đã tiếp nhận",
      timelineStep2: "Đang đóng gói",
      timelineStep3: "Bàn giao bưu tá",
      btnCompleteShopping: "Hoàn tất mua sắm",

      // Account Page (account.html)
      accPageTitle: "Tài Khoản Thành Viên eSports | Blue Gaming Gear",
      accBreadcrumbHome: "Trang chủ",
      accBreadcrumbCurrent: "Tài khoản thành viên",
      authPassportBadge: "BLUE PASSPORT",
      authHeroTitle: "TÀI KHOẢN THÀNH VIÊN",
      authHeroDesc:
        "Đăng nhập để nhận ưu đãi VIP, theo dõi đơn hàng thời gian thực và quản lý bảo hành điện tử chính hãng.",
      tabLogin: "Đăng Nhập",
      tabRegister: "Tạo Tài Khoản Mới",
      labelLoginEmail: "Địa chỉ Email",
      placeholderLoginEmail: "ví dụ: gamer@blue.vn",
      labelLoginPassword: "Mật khẩu",
      placeholderLoginPassword: "Nhập mật khẩu của bạn",
      linkForgotPassword: "Quên mật khẩu?",
      labelRememberLogin: "Ghi nhớ phiên đăng nhập trên thiết bị này",
      btnSubmitLogin: "Đăng Nhập Ngay",
      demoAccountsCardTitle:
        "Tài Khoản Dùng Thử (1-Click Test cho Giảng Viên):",
      labelRegName: "Họ và Tên",
      placeholderRegName: "Nguyễn Văn A",
      labelRegEmail: "Email đăng ký",
      placeholderRegEmail: "gamer@domain.com",
      labelRegPhone: "Số điện thoại liên hệ",
      placeholderRegPhone: "09xxxxxxxx",
      labelRegPassword: "Mật khẩu",
      placeholderRegPassword: "Tối thiểu 6 ký tự",
      labelRegConfirmPassword: "Xác nhận mật khẩu",
      placeholderRegConfirmPassword: "Nhập lại mật khẩu",
      labelTermsAgree:
        "Tôi đồng ý với Điều khoản dịch vụ & Chính sách bảo mật của Blue Gaming Gear",
      btnSubmitRegister: "Đăng Ký Tài Khoản (Nhận 200 Điểm)",

      // Account Dashboard
      btnChangeAvatarTitle: "Đổi ảnh đại diện",
      pointsUnit: "Điểm",
      dashTabProfile: "Thông tin tài khoản",
      dashTabOrders: "Đơn hàng của tôi",
      dashTabAddresses: "Sổ địa chỉ giao hàng",
      dashTabRewards: "Điểm thưởng & Voucher",
      dashTabSecurity: "Bảo mật & Đổi mật khẩu",
      dashTabLogout: "Đăng xuất",

      paneProfileTitle: "HỒ SƠ TÀI KHOẢN",
      paneProfileDesc:
        "Quản lý thông tin hồ sơ bảo mật để bảo vệ tài khoản và nhận ưu đãi eSports.",
      profNameLabel: "Họ và Tên",
      profEmailLabel: "Email (Không thể thay đổi)",
      profPhoneLabel: "Số điện thoại",
      profCityLabel: "Tỉnh / Thành phố",
      profAddressLabel: "Địa chỉ chi tiết (Số nhà, ngõ, tên đường)",
      profAddressPlaceholder: "Ví dụ: Số 18, Phố Tràng Thi, Hoàn Kiếm",
      profGenderLabel: "Giới tính",
      genderMale: "Nam",
      genderFemale: "Nữ",
      genderOther: "Không tiết lộ",
      profBirthdateLabel: "Ngày sinh",
      btnSaveProfile: "Lưu Thay Đổi",

      paneOrdersTitle: "ĐƠN HÀNG CỦA TÔI",
      paneOrdersDesc:
        "Tra cứu lịch sử mua hàng, tiến độ vận chuyển và bảo hành sản phẩm eSports.",
      orderFilterAll: "Tất cả",
      orderFilterProcessing: "Chờ xác nhận",
      orderFilterShipping: "Đang giao",
      orderFilterCompleted: "Hoàn thành",
      orderFilterCancelled: "Đã hủy",
      ordersEmptyTitle: "Không có đơn hàng nào",
      ordersEmptyDesc:
        "Bạn chưa có đơn hàng nào ở trạng thái này. Khám phá kho gear eSports và sở hữu ngay hôm nay!",
      btnShopNow: "Khám Phá Sản Phẩm Ngay",
      orderCodeText: "Mã đơn:",
      orderDeliverToText: "Giao tới:",
      orderTotalText: "Tổng thanh toán:",
      btnCancelOrder: "Hủy đơn",
      btnRepurchase: "Mua lại",

      paneAddressesTitle: "SỔ ĐỊA CHỈ GIAO HÀNG",
      paneAddressesDesc:
        "Lưu sẵn địa chỉ nhận hàng để thanh toán nhanh chỉ với 1 thao tác.",
      addrHomeTitle: "Nhà Riêng",
      badgeDefaultAddr: "Mặc định",
      btnEditAddr: "Chỉnh sửa",
      btnAddNewAddr: "Thêm địa chỉ nhận hàng mới",

      paneRewardsTitle: "ĐIỂM THƯỞNG & MÃ ƯU ĐÃI VIP",
      paneRewardsDesc:
        "Tích lũy điểm khi mua sắm thiết bị và đổi lấy voucher giảm giá độc quyền.",
      tierCurrentLabel: "HẠNG THÀNH VIÊN HIỆN TẠI",
      vouchersSectionTitle: "Mã Giảm Giá Độc Quyền Dành Cho Bạn:",
      voucher10Title: "GIẢM 10% TẤT CẢ GEAR",
      voucher10Desc: "Áp dụng cho đơn hàng từ 1.000.000₫",
      voucherFreeTitle: "MIỄN PHÍ VẬN CHUYỂN",
      voucherFreeDesc: "Giao hỏa tốc toàn quốc, áp dụng đơn bất kỳ",
      voucher50kTitle: "GIẢM NGAY 50.000₫",
      voucher50kDesc: "Quà tặng tân thủ eSports cho lần đầu mua gear",
      btnCopyCode: "Sao chép",
      copiedCode: "Đã chép!",

      paneSecurityTitle: "BẢO MẬT TÀI KHOẢN",
      paneSecurityDesc:
        "Đổi mật khẩu định kỳ để bảo vệ an toàn cho tài khoản và các đơn hàng của bạn.",
      passCurrentLabel: "Mật khẩu hiện tại",
      passCurrentPlaceholder: "Nhập mật khẩu hiện tại",
      passNewLabel: "Mật khẩu mới",
      passNewPlaceholder: "Tối thiểu 6 ký tự",
      passConfirmLabel: "Xác nhận mật khẩu mới",
      passConfirmPlaceholder: "Nhập lại mật khẩu mới",
      btnUpdatePass: "Cập Nhật Mật Khẩu",

      // Password Strength Meter
      pwdStrengthDefault: "Độ mạnh mật khẩu: Chưa nhập",
      pwdStrengthWeak: "Yếu",
      pwdStrengthFair: "Trung bình",
      pwdStrengthGood: "Tốt",
      pwdStrengthStrong: "Mạnh (Chuẩn eSports)",
      pwdStrengthHint: "8+ ký tự gồm chữ hoa, số và ký tự đặc biệt",

      // Forgot Password Modal
      forgotModalTitle: "KHÔI PHỤC BLUE PASSPORT",
      forgotModalSubtitle: "Nhập email đã đăng ký để nhận mã xác thực đặt lại mật khẩu.",
      forgotModalEmailLabel: "Email đăng ký",
      forgotModalEmailPlaceholder: "Ví dụ: gamer@blue.vn",
      forgotModalBtnSend: "Gửi Mã Khôi Phục",
      forgotModalSuccessTitle: "Đã Gửi Mã Xác Thực!",
      forgotModalSuccessDesc: "Chúng tôi đã gửi mã xác thực 6 số đến",
      forgotModalHotlineNote: "Cần hỗ trợ khẩn cấp? Hotline CSKH 24/7: 1900 6868",
      forgotModalClose: "Đóng",

      // Address Book Modal & Actions
      paneAddressesHeaderAdd: "Thêm địa chỉ",
      addrTagLabel: "Loại địa chỉ",
      addrTagHome: "Nhà riêng",
      addrTagOffice: "Văn phòng / Studio",
      addrTagGaming: "Gaming Team House",
      addrTagOther: "Khác",
      addrRecipientName: "Tên người nhận",
      addrPhone: "Số điện thoại",
      addrStreet: "Địa chỉ chi tiết (Số nhà, đường)",
      addrCity: "Tỉnh / Thành phố",
      addrIsDefault: "Đặt làm địa chỉ giao hàng mặc định",
      addrBtnSave: "Lưu Địa Chỉ",
      addrBtnCancel: "Hủy bỏ",
      addrModalAddTitle: "THÊM ĐỊA CHỈ GIAO HÀNG MỚI",
      addrModalEditTitle: "CHỈNH SỬA ĐỊA CHỈ GIAO HÀNG",
      btnSetDefaultAddr: "Đặt mặc định",
      btnDeleteAddr: "Xóa",
      confirmDeleteAddrTitle: "Xóa địa chỉ này?",
      confirmDeleteAddrMsg: "Bạn có chắc chắn muốn xóa địa chỉ này khỏi Blue Passport không?",
      toastAddrSaved: "Đã lưu địa chỉ giao hàng thành công!",
      toastAddrDeleted: "Đã xóa địa chỉ giao hàng!",
      toastAddrDefaultSet: "Đã cập nhật địa chỉ mặc định!",

      // Confirmation Modals
      confirmSignOutTitle: "Đăng xuất Blue Passport?",
      confirmSignOutMsg: "Bạn có chắc chắn muốn kết thúc phiên đăng nhập? Bạn sẽ cần đăng nhập lại để xem điểm VIP và quản lý đơn hàng.",
      confirmCancelOrderTitle: "Hủy đơn hàng",
      confirmCancelOrderMsg: "Bạn có chắc chắn muốn hủy đơn hàng",
      btnModalConfirm: "Xác nhận",
      btnModalCancel: "Đóng",
    },
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
    32: "Pulsar Superglide Ultra-Fast Tempered Glass Mousepad",
  };

  const CATEGORY_MAP_EN = {
    all: "All Products",
    Chuột: "Mice",
    "Bàn phím": "Keyboards",
    "Lót chuột": "Mousepads",
    "Tai nghe": "Headsets",
    "Màn hình": "Monitors",
    "Ghế gaming": "Gaming Chairs",
    "Tay cầm": "Controllers",
    Controller: "Controllers",
    "Phụ kiện": "Accessories",
    Accessories: "Accessories",
    "Gift Cards": "Gift Cards",
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
      const checkIcon = item.querySelector(".lang-check");
      if (itemLang === lang) {
        item.classList.add("active");
        if (checkIcon) checkIcon.style.display = "inline-block";
      } else {
        item.classList.remove("active");
        if (checkIcon) checkIcon.style.display = "none";
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

    // 7. Cập nhật aria-label
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (t[key] !== undefined) {
        el.setAttribute("aria-label", t[key]);
      }
    });

    // 8. Cập nhật tên mặc định và điểm trong Header Dropdown nếu chưa đăng nhập
    if (!window.AuthModel || !window.AuthModel.isLoggedIn()) {
      const ddName = document.getElementById("user-dd-name");
      const ddPoints = document.getElementById("user-dd-points");
      if (ddName)
        ddName.textContent = lang === "en" ? "Alex Johnson" : "Alex Nguyễn";
      if (ddPoints)
        ddPoints.textContent = lang === "en" ? "1,850 Points" : "1.850 điểm";
    }

    // 9. Cập nhật tiêu đề trang (Document Title)
    const currentPath = window.location.pathname;
    if (currentPath.includes("products.html")) {
      document.title =
        lang === "en"
          ? "All Gaming Gear | Blue Gaming Gear"
          : "Tất Cả Sản Phẩm Gaming Gear | Blue";
    } else if (currentPath.includes("account.html")) {
      document.title =
        lang === "en"
          ? "Member Account | Blue Gaming Gear"
          : "Tài Khoản Thành Viên eSports | Blue Gaming Gear";
    } else if (currentPath.includes("product-detail.html")) {
      const pTitle = document.getElementById("detail-product-title");
      const name =
        pTitle &&
        pTitle.textContent &&
        !pTitle.textContent.includes("Loading") &&
        !pTitle.textContent.includes("Đang tải")
          ? pTitle.textContent
          : lang === "en"
            ? "Product Details"
            : "Chi Tiết Sản Phẩm";
      document.title = `${name} | Blue Gaming Gear`;
    } else if (
      currentPath.includes("index.html") ||
      currentPath.endsWith("/") ||
      currentPath === ""
    ) {
      document.title =
        lang === "en"
          ? "Blue Gaming Gear | Pro Tournament Hardware"
          : "Blue Gaming Gear | Thiết Bị eSports Thi Đấu Đỉnh Cao";
    }

    // 10. Cập nhật document lang
    document.documentElement.lang = lang;

    // 11. Bắn sự kiện ra toàn bộ ứng dụng để các module khác (Cart, Products, Mega, Hero) tự cập nhật
    window.dispatchEvent(
      new CustomEvent("blue:language-change", { detail: { lang, t } }),
    );
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
    t: (key) => (I18N_DATA[getCurrentLang()] || I18N_DATA.en)[key] || key,
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
