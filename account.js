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
      } else {
        if (authContainer) authContainer.style.display = "block";
        if (dashboardContainer) dashboardContainer.style.display = "none";
      }
    },

    // Render thông tin tóm tắt trên Sidebar Dashboard
    renderDashboardHeader(user) {
      if (userAvatarImg) userAvatarImg.src = user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80";
      if (userNameText) userNameText.textContent = user.name;
      if (userEmailText) userEmailText.textContent = user.email;
      if (userRankBadge) userRankBadge.textContent = user.rank || "VIP Diamond";
      if (userPointsBadge) userPointsBadge.textContent = `${(user.points || 0).toLocaleString("vi-VN")} Điểm`;

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
      const allOrders = model.getUserOrders();

      let filtered = allOrders;
      if (filterStatus !== "all") {
        filtered = allOrders.filter((o) => o.status === filterStatus);
      }

      if (filtered.length === 0) {
        ordersListContainer.innerHTML = `
          <div class="orders-empty-state">
            <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
            <h4>Không có đơn hàng nào</h4>
            <p>Bạn chưa có đơn hàng nào ở trạng thái này. Khám phá kho gear eSports và sở hữu ngay hôm nay!</p>
            <a href="products.html" class="btn-shop-now">
              <i class="fa-solid fa-gamepad"></i> Khám Phá Sản Phẩm Ngay
            </a>
          </div>
        `;
        return;
      }

      const statusMap = {
        processing: { label: "Chờ xác nhận & Đóng gói", class: "status-processing", icon: "fa-box" },
        shipping: { label: "Đang giao hàng", class: "status-shipping", icon: "fa-truck-fast" },
        completed: { label: "Giao thành công", class: "status-completed", icon: "fa-circle-check" },
        cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "fa-circle-xmark" },
      };

      let html = filtered
        .map((order) => {
          const st = statusMap[order.status] || { label: order.statusLabel || order.status, class: "status-processing", icon: "fa-info-circle" };
          const formattedDate = new Date(order.date).toLocaleDateString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const itemsHTML = (order.items || [])
            .map(
              (it) => `
            <div class="order-product-row">
              <img src="${it.image}" alt="${it.name}" class="order-product-thumb" />
              <div class="order-product-info">
                <strong>${it.name}</strong>
                <span>Số lượng: ${it.quantity} × ${window.formatCurrency ? window.formatCurrency(it.price) : it.price.toLocaleString("vi-VN") + "₫"}</span>
              </div>
              <div class="order-product-price">
                ${window.formatCurrency ? window.formatCurrency(it.price * it.quantity) : (it.price * it.quantity).toLocaleString("vi-VN") + "₫"}
              </div>
            </div>
          `
            )
            .join("");

          const canCancel = order.status === "processing" || order.status === "shipping";

          return `
            <div class="order-card" data-order-id="${order.id}">
              <div class="order-card-header">
                <div class="order-id-wrap">
                  <span class="order-code-text">Mã đơn: <strong>${order.id}</strong></span>
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
                  <span>Giao tới: <strong>${order.customerName}</strong> (${order.phone}) - ${order.address}, ${order.city}</span>
                </div>
                <div class="order-total-block">
                  <div class="order-total-val">
                    <span>Tổng thanh toán:</span>
                    <strong>${window.formatCurrency ? window.formatCurrency(order.total) : order.total.toLocaleString("vi-VN") + "₫"}</strong>
                  </div>
                  <div class="order-actions-btns">
                    ${
                      canCancel
                        ? `<button type="button" class="btn-cancel-order" data-cancel-id="${order.id}">
                            <i class="fa-solid fa-ban"></i> Hủy đơn
                          </button>`
                        : ""
                    }
                    <button type="button" class="btn-repurchase" onclick="window.location.href='products.html'">
                      <i class="fa-solid fa-rotate-right"></i> Mua lại
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

      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-password").value.trim();
      const remember = document.getElementById("login-remember")?.checked || true;

      const res = model.login(email, pass, remember);
      if (res.success) {
        AccountPageRenderer.showAuthAlert(`Đăng nhập thành công! Chào mừng ${res.user.name}.`, "success");
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

      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const pass = document.getElementById("reg-password").value.trim();
      const passConfirm = document.getElementById("reg-password-confirm").value.trim();
      const agree = document.getElementById("reg-agree")?.checked;

      if (!agree) {
        AccountPageRenderer.showAuthAlert("Vui lòng đồng ý với điều khoản sử dụng eSports Blue!", "error");
        return;
      }
      if (pass !== passConfirm) {
        AccountPageRenderer.showAuthAlert("Mật khẩu xác nhận không khớp!", "error");
        return;
      }
      if (pass.length < 6) {
        AccountPageRenderer.showAuthAlert("Mật khẩu phải chứa ít nhất 6 ký tự!", "error");
        return;
      }

      const res = model.register({ name, email, phone, password: pass });
      if (res.success) {
        AccountPageRenderer.showAuthAlert("Đăng ký thành công! Bạn nhận được 200 điểm tân thủ.", "success");
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

      if (tabTarget === "logout") {
        if (confirm("Bạn có chắc chắn muốn đăng xuất tài khoản?")) {
          model.logout();
          if (window.showToast) window.showToast("Đã đăng xuất tài khoản!", "info");
          AccountPageRenderer.switchMainView();
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
          window.showToast("Đã lưu thông tin tài khoản thành công!", "success");
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
      const current = model.getCurrentUser();
      const nextAvatar = avatarList[(avatarList.indexOf(current?.avatar) + 1) % avatarList.length] || avatarList[0];
      model.updateProfile({ avatar: nextAvatar });
      AccountPageRenderer.renderDashboardHeader(model.getCurrentUser());
      if (window.showToast) window.showToast("Đã cập nhật ảnh đại diện mới!", "success");
    });
  }

  // Submit Form Đổi Mật Khẩu
  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const oldPass = document.getElementById("pass-current").value;
      const newPass = document.getElementById("pass-new").value;
      const confirmPass = document.getElementById("pass-confirm").value;

      if (newPass !== confirmPass) {
        if (window.showToast) window.showToast("Mật khẩu mới xác nhận không khớp!", "error");
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

  // Hủy Đơn Hàng
  if (ordersListContainer) {
    ordersListContainer.addEventListener("click", (e) => {
      const cancelBtn = e.target.closest(".btn-cancel-order");
      if (cancelBtn) {
        const orderId = cancelBtn.getAttribute("data-cancel-id");
        if (confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${orderId}?`)) {
          const res = model.cancelOrder(orderId);
          if (res.success) {
            if (window.showToast) window.showToast(res.message, "success");
            const activeFilter = document.querySelector(".order-filter-btn.active")?.getAttribute("data-status") || "all";
            AccountPageRenderer.renderOrders(activeFilter);
          } else {
            if (window.showToast) window.showToast(res.message, "error");
          }
        }
      }
    });
  }

  // Sao chép mã Voucher (1-Click Copy)
  document.querySelectorAll(".btn-copy-code").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép!';
        btn.classList.add("copied");
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  });

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

  // Lắng nghe sự kiện đổi ngôn ngữ để cập nhật lại định dạng tiền tệ trên dashboard đơn hàng
  window.addEventListener("blue:language-change", () => {
    if (model.isLoggedIn()) {
      const user = model.getCurrentUser();
      if (user) {
        AccountPageRenderer.renderOrders(model.getUserOrders(user.id));
      }
    }
  });
});

