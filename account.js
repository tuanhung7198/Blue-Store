/**
 * account.js - LOGIC TRANG QUẢN LÝ TÀI KHOẢN (account.html)
 * Blue Gaming Gear - eSports E-Commerce Platform
 * 
 * Kiến trúc MVC:
 * - Model: Sử dụng window.AuthModel
 * - View: Render Auth Forms & Dashboard Profile, Orders, Addresses, Rewards
 * - Controller: Xử lý sự kiện đăng nhập, đăng ký, cập nhật hồ sơ, đổi mật khẩu, hủy đơn
 */

document.addEventListener("DOMContentLoaded", () => {
  const model = window.AuthModel;
  if (!model) {
    console.error("AuthModel chưa được nạp!");
    return;
  }

  // Các container chính
  const authContainer = document.getElementById("auth-forms-container");
  const dashboardContainer = document.getElementById("account-dashboard-container");

  // Auth Forms elements
  const tabLoginBtn = document.getElementById("tab-login-btn");
  const tabRegisterBtn = document.getElementById("tab-register-btn");
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");
  const authAlertBox = document.getElementById("auth-alert-box");

  // Dashboard Sidebar elements
  const userAvatarImg = document.getElementById("dash-user-avatar");
  const userNameText = document.getElementById("dash-user-name");
  const userEmailText = document.getElementById("dash-user-email");
  const userRankBadge = document.getElementById("dash-user-rank");
  const userPointsBadge = document.getElementById("dash-user-points");
  const navTabs = document.querySelectorAll(".dash-nav-item[data-tab]");
  const tabPanes = document.querySelectorAll(".dash-tab-pane");

  // Profile Form elements
  const profileForm = document.getElementById("form-user-profile");
  const passwordForm = document.getElementById("form-change-password");

  // Orders elements
  const ordersListContainer = document.getElementById("orders-list-container");
  const ordersFilterBtns = document.querySelectorAll(".order-filter-btn");

  // =========================================================================
  // 1. [VIEW] - RENDER VÀ CẬP NHẬT GIAO DIỆN
  // =========================================================================
  const AccountPageRenderer = {
    // Hiển thị thông báo trong Auth Form
    showAuthAlert(message, type = "error") {
      if (!authAlertBox) return;
      authAlertBox.className = `auth-alert-box ${type}`;
      authAlertBox.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>
      `;
      authAlertBox.style.display = "flex";
      authAlertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },

    clearAuthAlert() {
      if (authAlertBox) authAlertBox.style.display = "none";
    },

    // Chuyển đổi giữa 2 view chính: Đăng nhập vs Dashboard
    switchMainView() {
      const user = model.getCurrentUser();
      this.clearAuthAlert();

      if (user) {
        if (authContainer) authContainer.style.display = "none";
        if (dashboardContainer) dashboardContainer.style.display = "block";
        this.renderDashboardHeader(user);
        this.fillProfileForm(user);
        this.renderOrders("all");
        this.renderAddresses();
      } else {
        if (authContainer) authContainer.style.display = "block";
        if (dashboardContainer) dashboardContainer.style.display = "none";
      }
    },

    // Render thông tin tóm tắt trên Sidebar Dashboard
    renderDashboardHeader(user) {
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      if (userAvatarImg) userAvatarImg.src = user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80";
      if (userNameText) userNameText.textContent = user.name;
      if (userEmailText) userEmailText.textContent = user.email;
      if (userRankBadge) userRankBadge.textContent = user.rank || "VIP Diamond";
      if (userPointsBadge) {
        userPointsBadge.textContent = isEn
          ? `${(user.points || 0).toLocaleString("en-US")} Points`
          : `${(user.points || 0).toLocaleString("vi-VN")} Điểm`;
      }

      // Cập nhật số lượng đơn hàng trên badge menu
      const orders = model.getUserOrders();
      const orderCountBadge = document.getElementById("badge-order-count");
      if (orderCountBadge) {
        orderCountBadge.textContent = orders.length;
      }
    },

    // Điền dữ liệu vào form thông tin cá nhân
    fillProfileForm(user) {
      if (!profileForm) return;
      const fName = profileForm.querySelector("#prof-name");
      const fEmail = profileForm.querySelector("#prof-email");
      const fPhone = profileForm.querySelector("#prof-phone");
      const fAddress = profileForm.querySelector("#prof-address");
      const fCity = profileForm.querySelector("#prof-city");
      const fGender = profileForm.querySelector("#prof-gender");
      const fBirth = profileForm.querySelector("#prof-birthdate");

      if (fName) fName.value = user.name || "";
      if (fEmail) fEmail.value = user.email || "";
      if (fPhone) fPhone.value = user.phone || "";
      if (fAddress) fAddress.value = user.address || "";
      if (fCity) fCity.value = user.city || "Hà Nội";
      if (fGender) fGender.value = user.gender || "Nam";
      if (fBirth) fBirth.value = user.birthdate || "2000-01-01";
    },

    // Render danh sách đơn hàng theo trạng thái
    renderOrders(filterStatus = "all") {
      if (!ordersListContainer) return;
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const allOrders = model.getUserOrders();

      let filtered = allOrders;
      if (filterStatus !== "all") {
        filtered = allOrders.filter((o) => o.status === filterStatus);
      }

      if (filtered.length === 0) {
        ordersListContainer.innerHTML = `
          <div class="orders-empty-state">
            <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
            <h4>${isEn ? "No orders found" : "Không có đơn hàng nào"}</h4>
            <p>${isEn ? "You don't have any orders with this status. Discover pro eSports gear now!" : "Bạn chưa có đơn hàng nào ở trạng thái này. Khám phá kho gear eSports và sở hữu ngay hôm nay!"}</p>
            <a href="products.html" class="btn-shop-now">
              <i class="fa-solid fa-gamepad"></i> ${isEn ? "Explore Gear Now" : "Khám Phá Sản Phẩm Ngay"}
            </a>
          </div>
        `;
        return;
      }

      const statusMapEn = {
        processing: { label: "Processing & Packing", class: "status-processing", icon: "fa-box" },
        shipping: { label: "Out for Delivery", class: "status-shipping", icon: "fa-truck-fast" },
        completed: { label: "Delivered", class: "status-completed", icon: "fa-circle-check" },
        cancelled: { label: "Cancelled", class: "status-cancelled", icon: "fa-circle-xmark" },
      };
      const statusMapVi = {
        processing: { label: "Chờ xác nhận & Đóng gói", class: "status-processing", icon: "fa-box" },
        shipping: { label: "Đang giao hàng", class: "status-shipping", icon: "fa-truck-fast" },
        completed: { label: "Giao thành công", class: "status-completed", icon: "fa-circle-check" },
        cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "fa-circle-xmark" },
      };
      const statusMap = isEn ? statusMapEn : statusMapVi;

      let html = filtered
        .map((order) => {
          const st = statusMap[order.status] || { label: order.statusLabel || order.status, class: "status-processing", icon: "fa-info-circle" };
          const formattedDate = new Date(order.date).toLocaleDateString(isEn ? "en-US" : "vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const itemsHTML = (order.items || [])
            .map(
              (it) => {
                const pName = window.getProductName ? window.getProductName(it) : it.name;
                const qtyLabel = isEn ? "Qty:" : "Số lượng:";
                return `
            <div class="order-product-row">
              <img src="${it.image}" alt="${pName}" class="order-product-thumb" />
              <div class="order-product-info">
                <strong>${pName}</strong>
                <span>${qtyLabel} ${it.quantity} × ${window.formatCurrency ? window.formatCurrency(it.price) : it.price.toLocaleString("vi-VN") + "₫"}</span>
              </div>
              <div class="order-product-price">
                ${window.formatCurrency ? window.formatCurrency(it.price * it.quantity) : (it.price * it.quantity).toLocaleString("vi-VN") + "₫"}
              </div>
            </div>
          `;
              }
            )
            .join("");

          const canCancel = order.status === "processing" || order.status === "shipping";

          return `
            <div class="order-card" data-order-id="${order.id}">
              <div class="order-card-header">
                <div class="order-id-wrap">
                  <span class="order-code-text">${isEn ? "Order ID:" : "Mã đơn:"} <strong>${order.id}</strong></span>
                  <span class="order-date-text"><i class="fa-regular fa-clock"></i> ${formattedDate}</span>
                </div>
                <div class="order-status-pill ${st.class}">
                  <i class="fa-solid ${st.icon}"></i> ${st.label}
                </div>
              </div>

              <div class="order-card-body">
                ${itemsHTML}
              </div>

              <div class="order-card-footer">
                <div class="order-delivery-meta">
                  <i class="fa-solid fa-location-dot"></i>
                  <span>${isEn ? "Deliver to:" : "Giao tới:"} <strong>${order.customerName}</strong> (${order.phone}) - ${order.address}, ${order.city}</span>
                </div>
                <div class="order-total-block">
                  <div class="order-total-val">
                    <span>${isEn ? "Total Amount:" : "Tổng thanh toán:"}</span>
                    <strong>${window.formatCurrency ? window.formatCurrency(order.total) : order.total.toLocaleString("vi-VN") + "₫"}</strong>
                  </div>
                  <div class="order-actions-btns">
                    ${
                      canCancel
                        ? `<button type="button" class="btn-cancel-order" data-cancel-id="${order.id}">
                            <i class="fa-solid fa-ban"></i> ${isEn ? "Cancel Order" : "Hủy đơn"}
                          </button>`
                        : ""
                    }
                    <button type="button" class="btn-repurchase" data-order-id="${order.id}">
                      <i class="fa-solid fa-rotate-right"></i> ${isEn ? "Buy Again" : "Mua lại"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      ordersListContainer.innerHTML = html;
    },

    // Render danh sách sổ địa chỉ giao hàng động
    renderAddresses() {
      const grid = document.getElementById("address-cards-grid");
      if (!grid) return;
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const addresses = model.getUserAddresses();

      const tagMap = {
        Home: isEn ? "Home" : "Nhà riêng",
        "Office / Studio": isEn ? "Office / Studio" : "Văn phòng / Studio",
        "Gaming Team House": isEn ? "Gaming Team House" : "Gaming Team House",
        Other: isEn ? "Other" : "Khác",
      };

      let html = addresses
        .map((addr) => {
          const tagLabel = tagMap[addr.tag] || addr.tag || (isEn ? "Address" : "Địa chỉ");
          return `
            <div class="address-card ${addr.isDefault ? "is-default" : ""}" data-addr-id="${addr.id}">
              <div class="address-card-header">
                <div class="addr-header-title">
                  <span class="addr-tag-pill">${tagLabel}</span>
                  <strong>${addr.tag || "Shipping Address"}</strong>
                </div>
                ${
                  addr.isDefault
                    ? `<span class="badge-default-addr"><i class="fa-solid fa-circle-check"></i> ${isEn ? "Default" : "Mặc định"}</span>`
                    : ""
                }
              </div>
              <div class="address-card-body">
                <div class="addr-line name-phone">
                  <i class="fa-regular fa-user"></i> <span><strong>${addr.recipientName || "Recipient"}</strong> (${addr.phone || "N/A"})</span>
                </div>
                <div class="addr-line detail">
                  <i class="fa-solid fa-location-dot"></i> <span>${addr.street || ""}, ${addr.city || ""}</span>
                </div>
              </div>
              <div class="address-card-actions">
                <button type="button" class="btn-addr-action btn-edit-addr" data-addr-id="${addr.id}">
                  <i class="fa-solid fa-pen"></i> <span>${isEn ? "Edit" : "Sửa"}</span>
                </button>
                ${
                  !addr.isDefault
                    ? `
                    <button type="button" class="btn-addr-action btn-set-default-addr" data-addr-id="${addr.id}">
                      <i class="fa-regular fa-star"></i> <span>${isEn ? "Set Default" : "Đặt mặc định"}</span>
                    </button>
                    <button type="button" class="btn-addr-action btn-delete-addr text-danger" data-addr-id="${addr.id}">
                      <i class="fa-regular fa-trash-can"></i> <span>${isEn ? "Delete" : "Xóa"}</span>
                    </button>
                  `
                    : ""
                }
              </div>
            </div>
          `;
        })
        .join("");

      // Thẻ bấm để thêm địa chỉ mới
      html += `
        <div class="address-card add-new-card" id="btn-open-add-addr-card" role="button" tabindex="0">
          <div class="add-new-inner">
            <i class="fa-solid fa-plus"></i>
            <span>${isEn ? "Add New Shipping Address" : "Thêm Địa Chỉ Giao Hàng Mới"}</span>
          </div>
        </div>
      `;

      grid.innerHTML = html;
    },
  };

  // =========================================================================
  // 2. [CONTROLLER] - XỬ LÝ SỰ KIỆN TƯƠNG TÁC
  // =========================================================================

  // Chuyển Tab Đăng Nhập / Đăng Ký
  if (tabLoginBtn && tabRegisterBtn) {
    tabLoginBtn.addEventListener("click", () => {
      tabLoginBtn.classList.add("active");
      tabRegisterBtn.classList.remove("active");
      formLogin.style.display = "block";
      formRegister.style.display = "none";
      AccountPageRenderer.clearAuthAlert();
    });

    tabRegisterBtn.addEventListener("click", () => {
      tabRegisterBtn.classList.add("active");
      tabLoginBtn.classList.remove("active");
      formRegister.style.display = "block";
      formLogin.style.display = "none";
      AccountPageRenderer.clearAuthAlert();
    });
  }

  // Toggle ẩn/hiện mật khẩu
  document.querySelectorAll(".btn-toggle-eye").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetInputId = btn.getAttribute("data-target");
      const input = document.getElementById(targetInputId);
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      } else {
        input.type = "password";
        btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      }
    });
  });

  // 1-Click Demo Accounts (Cho giảng viên và người chấm bài)
  document.querySelectorAll(".btn-quick-demo-user").forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email");
      const pass = btn.getAttribute("data-pass");

      const emailInput = document.getElementById("login-email");
      const passInput = document.getElementById("login-password");
      if (emailInput) emailInput.value = email;
      if (passInput) passInput.value = pass;

      // Submit đăng nhập luôn
      if (formLogin) {
        formLogin.dispatchEvent(new Event("submit"));
      }
    });
  });

  // Submit Form Đăng Nhập
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      AccountPageRenderer.clearAuthAlert();
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";

      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-password").value.trim();
      const remember = !!document.getElementById("login-remember")?.checked;

      const res = model.login(email, pass, remember);
      if (res.success) {
        AccountPageRenderer.showAuthAlert(isEn ? `Sign in successful! Welcome back, ${res.user.name}.` : `Đăng nhập thành công! Chào mừng ${res.user.name}.`, "success");
        setTimeout(() => {
          // Kiểm tra URL nếu có redirect
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get("redirect") === "checkout") {
            window.location.href = "index.html";
            return;
          }
          AccountPageRenderer.switchMainView();
        }, 600);
      } else {
        AccountPageRenderer.showAuthAlert(res.message, "error");
      }
    });
  }

  // Submit Form Đăng Ký
  if (formRegister) {
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      AccountPageRenderer.clearAuthAlert();
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";

      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const pass = document.getElementById("reg-password").value.trim();
      const passConfirm = document.getElementById("reg-password-confirm").value.trim();
      const agree = document.getElementById("reg-agree")?.checked;

      if (!agree) {
        AccountPageRenderer.showAuthAlert(isEn ? "Please accept the Blue eSports terms of service!" : "Vui lòng đồng ý với điều khoản sử dụng eSports Blue!", "error");
        return;
      }
      if (pass !== passConfirm) {
        AccountPageRenderer.showAuthAlert(isEn ? "Password confirmation does not match!" : "Mật khẩu xác nhận không khớp!", "error");
        return;
      }
      if (pass.length < 6) {
        AccountPageRenderer.showAuthAlert(isEn ? "Password must contain at least 6 characters!" : "Mật khẩu phải chứa ít nhất 6 ký tự!", "error");
        return;
      }

      const res = model.register({ name, email, phone, password: pass });
      if (res.success) {
        AccountPageRenderer.showAuthAlert(isEn ? "Registration successful! You received 200 starter points." : "Đăng ký thành công! Bạn nhận được 200 điểm tân thủ.", "success");
        setTimeout(() => {
          AccountPageRenderer.switchMainView();
        }, 800);
      } else {
        AccountPageRenderer.showAuthAlert(res.message, "error");
      }
    });
  }

  // Chuyển Tab bên trong Dashboard (Hồ sơ, Đơn hàng, Địa chỉ, Điểm thưởng, Bảo mật)
  navTabs.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const tabTarget = tabBtn.getAttribute("data-tab");
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";

      if (tabTarget === "logout") {
        const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};
        const executeLogout = () => {
          model.logout();
          if (window.showToast) window.showToast(isEn ? "Signed out successfully!" : "Đã đăng xuất tài khoản!", "info");
          AccountPageRenderer.switchMainView();
        };

        if (typeof window.showCyberConfirm === "function") {
          window.showCyberConfirm({
            title: t.confirmSignOutTitle || (isEn ? "Sign Out of Blue Passport?" : "Đăng xuất Blue Passport?"),
            message: t.confirmSignOutMsg || (isEn ? "Are you sure you want to end your current session? You will need to sign in again to access VIP rewards and order history." : "Bạn có chắc chắn muốn kết thúc phiên đăng nhập? Bạn sẽ cần đăng nhập lại để xem điểm VIP và quản lý đơn hàng."),
            confirmText: isEn ? "Sign Out" : "Đăng xuất",
            cancelText: isEn ? "Stay Signed In" : "Ở lại",
            isDanger: true,
            onConfirm: executeLogout,
          });
        } else {
          if (confirm(isEn ? "Are you sure you want to sign out?" : "Bạn có chắc chắn muốn đăng xuất tài khoản?")) {
            executeLogout();
          }
        }
        return;
      }

      navTabs.forEach((t) => t.classList.remove("active"));
      tabBtn.classList.add("active");

      tabPanes.forEach((pane) => {
        pane.style.display = pane.id === `pane-${tabTarget}` ? "block" : "none";
      });

      // Cập nhật URL hash để người dùng có thể bookmark
      window.history.replaceState(null, "", `account.html?tab=${tabTarget}`);
    });
  });

  // Submit Form Lưu Thông Tin Cá Nhân
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const name = profileForm.querySelector("#prof-name")?.value.trim();
      const phone = profileForm.querySelector("#prof-phone")?.value.trim();
      const address = profileForm.querySelector("#prof-address")?.value.trim();
      const city = profileForm.querySelector("#prof-city")?.value;
      const gender = profileForm.querySelector("#prof-gender")?.value;
      const birthdate = profileForm.querySelector("#prof-birthdate")?.value;

      const res = model.updateProfile({ name, phone, address, city, gender, birthdate });
      if (res.success) {
        AccountPageRenderer.renderDashboardHeader(res.user);
        if (window.showToast) {
          window.showToast(isEn ? "Account profile saved successfully!" : "Đã lưu thông tin tài khoản thành công!", "success");
        }
      } else {
        if (window.showToast) window.showToast(res.message, "error");
      }
    });
  }

  // Đổi Avatar nhanh (Random hoặc chọn preset)
  const btnChangeAvatar = document.getElementById("btn-change-avatar");
  if (btnChangeAvatar) {
    const avatarList = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    ];
    btnChangeAvatar.addEventListener("click", () => {
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const current = model.getCurrentUser();
      const nextAvatar = avatarList[(avatarList.indexOf(current?.avatar) + 1) % avatarList.length] || avatarList[0];
      model.updateProfile({ avatar: nextAvatar });
      AccountPageRenderer.renderDashboardHeader(model.getCurrentUser());
      if (window.showToast) window.showToast(isEn ? "Profile avatar updated successfully!" : "Đã cập nhật ảnh đại diện mới!", "success");
    });
  }

  // Submit Form Đổi Mật Khẩu
  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const oldPass = document.getElementById("pass-current").value;
      const newPass = document.getElementById("pass-new").value;
      const confirmPass = document.getElementById("pass-confirm").value;

      if (newPass !== confirmPass) {
        if (window.showToast) window.showToast(isEn ? "New password confirmation does not match!" : "Mật khẩu mới xác nhận không khớp!", "error");
        return;
      }

      const res = model.changePassword(oldPass, newPass);
      if (res.success) {
        passwordForm.reset();
        if (window.showToast) window.showToast(res.message, "success");
      } else {
        if (window.showToast) window.showToast(res.message, "error");
      }
    });
  }

  // Lọc Đơn Hàng theo Tab
  ordersFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      ordersFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const status = btn.getAttribute("data-status");
      AccountPageRenderer.renderOrders(status);
    });
  });

  // Hủy Đơn Hàng & Mua Lại (Buy Again)
  if (ordersListContainer) {
    ordersListContainer.addEventListener("click", (e) => {
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};

      // 1. Hủy đơn hàng với Cyber Confirm Modal
      const cancelBtn = e.target.closest(".btn-cancel-order");
      if (cancelBtn) {
        const orderId = cancelBtn.getAttribute("data-cancel-id");
        const executeCancel = () => {
          const res = model.cancelOrder(orderId);
          if (res.success) {
            const successMsg = isEn ? "Order cancelled successfully!" : (res.message || "Hủy đơn hàng thành công!");
            if (window.showToast) window.showToast(successMsg, "success");
            const activeFilter = document.querySelector(".order-filter-btn.active")?.getAttribute("data-status") || "all";
            AccountPageRenderer.renderOrders(activeFilter);
          } else {
            if (window.showToast) window.showToast(res.message, "error");
          }
        };

        if (typeof window.showCyberConfirm === "function") {
          window.showCyberConfirm({
            title: `${t.confirmCancelOrderTitle || (isEn ? "Cancel Order" : "Hủy đơn hàng")} #${orderId}`,
            message: `${t.confirmCancelOrderMsg || (isEn ? "Are you sure you want to cancel order" : "Bạn có chắc chắn muốn hủy đơn hàng")} ${orderId}? ${isEn ? "This action cannot be undone." : "Thao tác này không thể hoàn tác."}`,
            confirmText: isEn ? "Cancel Order" : "Hủy đơn hàng",
            cancelText: isEn ? "Keep Order" : "Giữ đơn",
            isDanger: true,
            onConfirm: executeCancel,
          });
        } else {
          if (confirm(isEn ? `Are you sure you want to cancel order ${orderId}?` : `Bạn có chắc chắn muốn hủy đơn hàng ${orderId}?`)) {
            executeCancel();
          }
        }
        return;
      }

      // 2. Mua lại (Buy Again): Nạp toàn bộ item của đơn hàng vào giỏ và mở Cart Drawer
      const repurchaseBtn = e.target.closest(".btn-repurchase");
      if (repurchaseBtn) {
        const orderId = repurchaseBtn.getAttribute("data-order-id");
        const allOrders = model.getUserOrders();
        const order = allOrders.find((o) => String(o.id) === String(orderId));

        if (!order || !order.items || order.items.length === 0) {
          window.location.href = "products.html";
          return;
        }

        let cart = [];
        try {
          cart = JSON.parse(localStorage.getItem("blue_cart")) || [];
        } catch (err) {
          cart = [];
        }

        order.items.forEach((item) => {
          const existingIdx = cart.findIndex(
            (c) => String(c.id) === String(item.id) && (c.variant || "") === (item.variant || "")
          );
          if (existingIdx > -1) {
            cart[existingIdx].quantity = Math.min((cart[existingIdx].quantity || 1) + (item.quantity || 1), 99);
          } else {
            cart.push({
              id: item.id,
              name: item.name,
              price: item.price,
              original_price: item.original_price || item.price,
              image: item.image,
              category: item.category || "Gaming Gear",
              variant: item.variant || "",
              quantity: item.quantity || 1,
            });
          }
        });

        try {
          localStorage.setItem("blue_cart", JSON.stringify(cart));
        } catch (err) {
          console.error("Lỗi lưu giỏ hàng:", err);
        }

        // Cập nhật Cart Badge & UI
        if (typeof window.updateCartUI === "function") {
          window.updateCartUI();
        } else {
          const badge = document.getElementById("cart-badge");
          if (badge) {
            badge.textContent = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
          }
        }

        window.dispatchEvent(new CustomEvent("blue:cart-updated"));

        if (window.showToast) {
          const msg = isEn
            ? `Re-added ${order.items.length} items from order ${order.id} to your cart!`
            : `Đã thêm lại ${order.items.length} sản phẩm từ đơn ${order.id} vào giỏ hàng!`;
          window.showToast(msg, "success");
        }

        // Mở drawer giỏ hàng ngay lập tức
        if (typeof window.openCartDrawer === "function") {
          window.openCartDrawer();
        }
      }
    });
  }

  // Sao chép mã Voucher (1-Click Copy)
  document.querySelectorAll(".btn-copy-code").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> ${isEn ? "Copied!" : "Đã chép!"}`;
        btn.classList.add("copied");
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  });

  // =========================================================================
  // 3. SỔ ĐỊA CHỈ GIAO HÀNG (ADDRESS BOOK MANAGEMENT)
  // =========================================================================
  const addressModal = document.getElementById("modal-address");
  const addressForm = document.getElementById("form-manage-address");
  const addressModalTitle = document.getElementById("modal-address-title");
  const addrIdInput = document.getElementById("addr-id-input");
  const addrTagSelect = document.getElementById("addr-tag-select");
  const addrNameInput = document.getElementById("addr-name-input");
  const addrPhoneInput = document.getElementById("addr-phone-input");
  const addrStreetInput = document.getElementById("addr-street-input");
  const addrCitySelect = document.getElementById("addr-city-select");
  const addrIsDefaultCheck = document.getElementById("addr-is-default-checkbox");

  function openAddressModal(editData = null) {
    if (!addressModal) return;
    const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
    const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};

    if (editData) {
      if (addressModalTitle) {
        addressModalTitle.textContent =
          t.addrModalEditTitle || (isEn ? "EDIT SHIPPING ADDRESS" : "CHỈNH SỬA ĐỊA CHỈ GIAO HÀNG");
      }
      if (addrIdInput) addrIdInput.value = editData.id || "";
      if (addrTagSelect) addrTagSelect.value = editData.tag || "Home";
      if (addrNameInput) addrNameInput.value = editData.recipientName || "";
      if (addrPhoneInput) addrPhoneInput.value = editData.phone || "";
      if (addrStreetInput) addrStreetInput.value = editData.street || "";
      if (addrCitySelect) addrCitySelect.value = editData.city || "Hà Nội";
      if (addrIsDefaultCheck) addrIsDefaultCheck.checked = !!editData.isDefault;
    } else {
      if (addressModalTitle) {
        addressModalTitle.textContent =
          t.addrModalAddTitle || (isEn ? "ADD NEW SHIPPING ADDRESS" : "THÊM ĐỊA CHỈ GIAO HÀNG MỚI");
      }
      if (addrIdInput) addrIdInput.value = "";
      if (addressForm) addressForm.reset();
      const current = model.getCurrentUser();
      if (addrNameInput && current) addrNameInput.value = current.name || "";
      if (addrPhoneInput && current) addrPhoneInput.value = current.phone || "";
      if (addrCitySelect && current) addrCitySelect.value = current.city || "Hà Nội";
      if (addrIsDefaultCheck) addrIsDefaultCheck.checked = false;
    }

    addressModal.style.display = "flex";
    requestAnimationFrame(() => {
      addressModal.classList.add("active");
      if (addrNameInput) addrNameInput.focus();
    });
  }

  function closeAddressModal() {
    if (!addressModal) return;
    addressModal.classList.remove("active");
    setTimeout(() => {
      addressModal.style.display = "none";
    }, 200);
  }

  // Mở modal từ nút ở header tab hoặc thẻ Add New
  document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-add-address-top, #btn-open-add-addr-card")) {
      e.preventDefault();
      openAddressModal(null);
    }
  });

  // Đóng modal địa chỉ
  const btnCloseAddr = document.getElementById("btn-close-address-modal");
  const btnCancelAddr = document.getElementById("btn-cancel-address-modal");
  if (btnCloseAddr) btnCloseAddr.addEventListener("click", closeAddressModal);
  if (btnCancelAddr) btnCancelAddr.addEventListener("click", closeAddressModal);
  if (addressModal) {
    addressModal.addEventListener("click", (e) => {
      if (e.target === addressModal) closeAddressModal();
    });
  }

  // Xử lý sự kiện trên các thẻ địa chỉ (Edit, Set Default, Delete)
  const addressCardsGrid = document.getElementById("address-cards-grid");
  if (addressCardsGrid) {
    addressCardsGrid.addEventListener("click", (e) => {
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};

      // 1. Sửa địa chỉ
      const editBtn = e.target.closest(".btn-edit-addr");
      if (editBtn) {
        const addrId = editBtn.getAttribute("data-addr-id");
        const addresses = model.getUserAddresses();
        const found = addresses.find((a) => a.id === addrId);
        if (found) {
          openAddressModal(found);
        }
        return;
      }

      // 2. Đặt làm mặc định
      const setDefaultBtn = e.target.closest(".btn-set-default-addr");
      if (setDefaultBtn) {
        const addrId = setDefaultBtn.getAttribute("data-addr-id");
        model.setDefaultAddress(addrId);
        if (window.showToast) {
          window.showToast(
            t.toastAddrDefaultSet || (isEn ? "Default shipping address updated!" : "Đã cập nhật địa chỉ mặc định!"),
            "success"
          );
        }
        AccountPageRenderer.renderAddresses();
        return;
      }

      // 3. Xóa địa chỉ với Cyber Confirm
      const deleteBtn = e.target.closest(".btn-delete-addr");
      if (deleteBtn) {
        const addrId = deleteBtn.getAttribute("data-addr-id");
        const executeDelete = () => {
          model.deleteUserAddress(addrId);
          if (window.showToast) {
            window.showToast(
              t.toastAddrDeleted || (isEn ? "Shipping address deleted!" : "Đã xóa địa chỉ giao hàng!"),
              "info"
            );
          }
          AccountPageRenderer.renderAddresses();
        };

        if (typeof window.showCyberConfirm === "function") {
          window.showCyberConfirm({
            title: t.confirmDeleteAddrTitle || (isEn ? "Delete Shipping Address?" : "Xóa địa chỉ này?"),
            message:
              t.confirmDeleteAddrMsg ||
              (isEn
                ? "Are you sure you want to remove this address from your Blue Passport?"
                : "Bạn có chắc chắn muốn xóa địa chỉ này khỏi Blue Passport không?"),
            confirmText: isEn ? "Delete Address" : "Xóa địa chỉ",
            cancelText: isEn ? "Keep" : "Giữ lại",
            isDanger: true,
            onConfirm: executeDelete,
          });
        } else {
          executeDelete();
        }
      }
    });
  }

  // Submit form lưu địa chỉ
  if (addressForm) {
    addressForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};

      const addrData = {
        id: addrIdInput ? addrIdInput.value : "",
        tag: addrTagSelect ? addrTagSelect.value : "Home",
        recipientName: addrNameInput ? addrNameInput.value.trim() : "",
        phone: addrPhoneInput ? addrPhoneInput.value.trim() : "",
        street: addrStreetInput ? addrStreetInput.value.trim() : "",
        city: addrCitySelect ? addrCitySelect.value : "Hà Nội",
        isDefault: addrIsDefaultCheck ? addrIsDefaultCheck.checked : false,
      };

      model.saveUserAddress(addrData);
      closeAddressModal();
      if (window.showToast) {
        window.showToast(
          t.toastAddrSaved || (isEn ? "Shipping address saved successfully!" : "Đã lưu địa chỉ giao hàng thành công!"),
          "success"
        );
      }
      AccountPageRenderer.renderAddresses();
    });
  }

  // =========================================================================
  // 4. QUÊN MẬT KHẨU (FORGOT PASSWORD RECOVERY MODAL)
  // =========================================================================
  const forgotModal = document.getElementById("modal-forgot-password");
  const forgotForm = document.getElementById("form-forgot-password");
  const forgotEmailInput = document.getElementById("forgot-email");
  const forgotStatus = document.getElementById("forgot-modal-status");
  const btnOpenForgot = document.getElementById("btn-open-forgot-pass");
  const btnCloseForgot = document.getElementById("btn-close-forgot-modal");
  const btnCancelForgot = document.getElementById("btn-cancel-forgot-modal");

  function openForgotModal() {
    if (!forgotModal) return;
    const loginEmail = document.getElementById("login-email")?.value.trim();
    if (forgotEmailInput && loginEmail) {
      forgotEmailInput.value = loginEmail;
    }
    if (forgotStatus) {
      forgotStatus.style.display = "none";
      forgotStatus.innerHTML = "";
    }
    forgotModal.style.display = "flex";
    requestAnimationFrame(() => {
      forgotModal.classList.add("active");
      if (forgotEmailInput) forgotEmailInput.focus();
    });
  }

  function closeForgotModal() {
    if (!forgotModal) return;
    forgotModal.classList.remove("active");
    setTimeout(() => {
      forgotModal.style.display = "none";
    }, 200);
  }

  if (btnOpenForgot) {
    btnOpenForgot.addEventListener("click", (e) => {
      e.preventDefault();
      openForgotModal();
    });
  }
  if (btnCloseForgot) btnCloseForgot.addEventListener("click", closeForgotModal);
  if (btnCancelForgot) btnCancelForgot.addEventListener("click", closeForgotModal);
  if (forgotModal) {
    forgotModal.addEventListener("click", (e) => {
      if (e.target === forgotModal) closeForgotModal();
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = forgotEmailInput ? forgotEmailInput.value.trim() : "";
      if (!email) return;

      const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
      const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};

      if (forgotStatus) {
        forgotStatus.className = "forgot-modal-status is-success";
        forgotStatus.innerHTML = `
          <div class="status-inner">
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <strong>${t.forgotModalSuccessTitle || (isEn ? "Verification Code Sent!" : "Đã Gửi Mã Xác Thực!")}</strong>
              <p>${t.forgotModalSuccessDesc || (isEn ? "We dispatched a 6-digit recovery code to" : "Chúng tôi đã gửi mã xác thực 6 số đến")} <code>${email}</code>.</p>
              <div class="code-sim-box">
                <span class="sim-label">${isEn ? "Recovery Token (Demo):" : "Mã khôi phục (Mô phỏng):"}</span>
                <span class="sim-code">829-104</span>
              </div>
            </div>
          </div>
        `;
        forgotStatus.style.display = "block";
      }

      if (window.showToast) {
        window.showToast(
          isEn ? `Verification reset code dispatched to ${email}!` : `Đã gửi mã khôi phục mật khẩu đến ${email}!`,
          "success"
        );
      }
    });
  }

  // =========================================================================
  // 5. ĐỘ MẠNH MẬT KHẨU THỜI GIAN THỰC (LIVE PASSWORD STRENGTH METER)
  // =========================================================================
  function evaluatePasswordStrength(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }

  function updateStrengthUI(meterEl, textEl, password) {
    if (!meterEl || !textEl) return;
    const score = evaluatePasswordStrength(password);
    const isEn = window.I18N && window.I18N.getCurrentLang() === "en";
    const t = window.I18N && window.I18N.I18N_DATA ? (window.I18N.I18N_DATA[isEn ? "en" : "vi"] || {}) : {};

    meterEl.setAttribute("data-score", score);

    const labels = [
      t.pwdStrengthDefault || (isEn ? "Password strength: None" : "Độ mạnh mật khẩu: Chưa nhập"),
      t.pwdStrengthWeak || (isEn ? "Weak" : "Yếu"),
      t.pwdStrengthFair || (isEn ? "Fair" : "Trung bình"),
      t.pwdStrengthGood || (isEn ? "Good" : "Tốt"),
      t.pwdStrengthStrong || (isEn ? "Strong (eSports Grade)" : "Mạnh (Chuẩn eSports)"),
    ];

    textEl.textContent = labels[score] || labels[0];
  }

  const regPassInput = document.getElementById("reg-password");
  const regStrengthMeter = document.getElementById("reg-password-strength");
  const regStrengthText = document.getElementById("reg-strength-text");

  if (regPassInput && regStrengthMeter && regStrengthText) {
    regPassInput.addEventListener("input", () => {
      updateStrengthUI(regStrengthMeter, regStrengthText, regPassInput.value);
    });
  }

  const newPassInput = document.getElementById("pass-new");
  const newStrengthMeter = document.getElementById("pass-new-strength");
  const newStrengthText = document.getElementById("pass-new-strength-text");

  if (newPassInput && newStrengthMeter && newStrengthText) {
    newPassInput.addEventListener("input", () => {
      updateStrengthUI(newStrengthMeter, newStrengthText, newPassInput.value);
    });
  }

  // Khởi tạo trang ban đầu & đọc query params URL
  AccountPageRenderer.switchMainView();

  const urlParams = new URLSearchParams(window.location.search);
  const requestedTab = urlParams.get("tab");
  if (requestedTab) {
    if (model.isLoggedIn()) {
      const targetNav = document.querySelector(`.dash-nav-item[data-tab="${requestedTab}"]`);
      if (targetNav) targetNav.click();
    } else if (requestedTab === "register") {
      if (tabRegisterBtn) tabRegisterBtn.click();
    }
  }

  // Lắng nghe sự kiện cập nhật auth từ window
  window.addEventListener("blue:auth-change", () => {
    AccountPageRenderer.switchMainView();
  });

  // Lắng nghe sự kiện đổi ngôn ngữ để cập nhật lại định dạng tiền tệ và văn bản trên dashboard
  window.addEventListener("blue:language-change", () => {
    if (model.isLoggedIn()) {
      const user = model.getCurrentUser();
      if (user) {
        AccountPageRenderer.renderDashboardHeader(user);
        const activeFilterBtn = document.querySelector(".order-filter-btn.active");
        const status = activeFilterBtn ? activeFilterBtn.getAttribute("data-status") : "all";
        AccountPageRenderer.renderOrders(status);
        AccountPageRenderer.renderAddresses();
      }
    }
  });
});

