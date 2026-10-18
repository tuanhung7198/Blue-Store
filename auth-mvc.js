/**
 * auth-mvc.js - HỆ THỐNG QUẢN LÝ TÀI KHOẢN THEO MÔ HÌNH MVC
 * Blue Gaming Gear - eSports E-Commerce Platform
 * 
 * [M] MODEL: Quản lý dữ liệu người dùng, trạng thái đăng nhập, lịch sử đơn hàng và địa chỉ.
 * [V] VIEW: Render trạng thái tài khoản trên Header, modal yêu cầu đăng nhập và thông báo.
 * [C] CONTROLLER: Điều phối các hành động xác thực, bảo vệ các chức năng cần đăng nhập (Guards).
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. [MODEL] - QUẢN LÝ DỮ LIỆU & LOGIC NGHIỆP VỤ TÀI KHOẢN
  // =========================================================================
  class AuthModel {
    static STORAGE_KEYS = {
      AUTH_USER: "blue_auth_user",
      USERS_DB: "blue_users_db",
      ORDERS_DB: "blue_orders_db",
      ADDRESSES_DB: "blue_addresses_db",
    };

    // Dữ liệu mẫu khởi tạo ban đầu nếu chưa có trong LocalStorage
    static DEFAULT_USERS = [
      {
        id: 1,
        email: "gamer@blue.vn",
        password: "password123",
        name: "Alex Nguyễn",
        phone: "0988123456",
        address: "Số 18, Phố Tràng Thi, Hoàn Kiếm",
        city: "Hà Nội",
        gender: "Nam",
        birthdate: "2000-05-15",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
        rank: "VIP Diamond",
        points: 1850,
        joinedDate: "2024-03-15",
      },
      {
        id: 2,
        email: "jordan@blue.vn",
        password: "password123",
        name: "Jordan Trần",
        phone: "0912345678",
        address: "Tầng 5, Toà Landmark 81, Bình Thạnh",
        city: "TP. Hồ Chí Minh",
        gender: "Nam",
        birthdate: "1998-11-20",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80",
        rank: "Pro Challenger",
        points: 3420,
        joinedDate: "2024-01-10",
      },
    ];

    static DEFAULT_ORDERS = [
      {
        id: "BL-78291",
        userId: 1,
        customerName: "Alex Nguyễn",
        phone: "0988123456",
        address: "Số 18, Phố Tràng Thi, Hoàn Kiếm, Hà Nội",
        date: "2024-10-15T14:30:00Z",
        items: [
          {
            id: 1,
            name: "Chuột Gaming Không Dây Logitech G Pro X Superlight",
            price: 2990000,
            quantity: 1,
            image: "https://anphat.com.vn/media/product/46381_logitech_g_pro_x_superlight_2_white__1_.jpg",
          },
        ],
        paymentMethod: "COD",
        total: 2990000,
        status: "completed",
        statusLabel: "Giao hàng thành công",
      },
      {
        id: "BL-93812",
        userId: 1,
        customerName: "Alex Nguyễn",
        phone: "0988123456",
        address: "Số 18, Phố Tràng Thi, Hoàn Kiếm, Hà Nội",
        date: "2024-10-18T09:15:00Z",
        items: [
          {
            id: 2,
            name: "Bàn Phím Cơ Razer Huntsman V2",
            price: 3590000,
            quantity: 1,
            image: "https://i.ebayimg.com/images/g/UugAAeSwz2Zpj8tN/s-l1600.webp",
          },
        ],
        paymentMethod: "MOMO",
        total: 3570000,
        status: "shipping",
        statusLabel: "Đang vận chuyển",
      },
    ];

    constructor() {
      this.initStorage();
    }

    initStorage() {
      if (!localStorage.getItem(AuthModel.STORAGE_KEYS.USERS_DB)) {
        localStorage.setItem(AuthModel.STORAGE_KEYS.USERS_DB, JSON.stringify(AuthModel.DEFAULT_USERS));
      }
      if (!localStorage.getItem(AuthModel.STORAGE_KEYS.ORDERS_DB)) {
        localStorage.setItem(AuthModel.STORAGE_KEYS.ORDERS_DB, JSON.stringify(AuthModel.DEFAULT_ORDERS));
      }
    }

    // Lấy toàn bộ danh sách users
    getAllUsers() {
      try {
        return JSON.parse(localStorage.getItem(AuthModel.STORAGE_KEYS.USERS_DB)) || [];
      } catch (e) {
        return AuthModel.DEFAULT_USERS;
      }
    }

    // Lưu toàn bộ danh sách users
    saveAllUsers(users) {
      localStorage.setItem(AuthModel.STORAGE_KEYS.USERS_DB, JSON.stringify(users));
    }

    // Người dùng đang đăng nhập hiện tại
    getCurrentUser() {
      try {
        const raw = localStorage.getItem(AuthModel.STORAGE_KEYS.AUTH_USER);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    // Kiểm tra đã đăng nhập chưa
    isLoggedIn() {
      return this.getCurrentUser() !== null;
    }

    // Đăng nhập
    login(email, password, remember = true) {
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPass = (password || "").trim();

      const users = this.getAllUsers();
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPass);

      if (!found) {
        return {
          success: false,
          message: "Email hoặc mật khẩu không chính xác!",
        };
      }

      // Tạo object phiên đăng nhập an toàn (loại bỏ mật khẩu thô)
      const sessionUser = { ...found };
      delete sessionUser.password;

      localStorage.setItem(AuthModel.STORAGE_KEYS.AUTH_USER, JSON.stringify(sessionUser));
      this.dispatchAuthEvent("login", sessionUser);

      return {
        success: true,
        user: sessionUser,
      };
    }

    // Đăng ký tài khoản mới
    register({ name, email, phone, password }) {
      const cleanName = (name || "").trim();
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPhone = (phone || "").trim();
      const cleanPass = (password || "").trim();

      if (!cleanName || !cleanEmail || !cleanPhone || !cleanPass) {
        return { success: false, message: "Vui lòng điền đầy đủ các thông tin bắt buộc!" };
      }

      const users = this.getAllUsers();
      if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, message: "Email này đã được sử dụng. Vui lòng chọn email khác hoặc đăng nhập!" };
      }

      const newUser = {
        id: Date.now(),
        email: cleanEmail,
        password: cleanPass,
        name: cleanName,
        phone: cleanPhone,
        address: "Chưa cập nhật",
        city: "Hà Nội",
        gender: "Khác",
        birthdate: "2000-01-01",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
        rank: "Tân Thủ eSports (Bronze)",
        points: 200, // Thưởng 200 điểm cho thành viên mới
        joinedDate: new Date().toISOString().split("T")[0],
      };

      users.push(newUser);
      this.saveAllUsers(users);

      // Tự động đăng nhập luôn
      const sessionUser = { ...newUser };
      delete sessionUser.password;
      localStorage.setItem(AuthModel.STORAGE_KEYS.AUTH_USER, JSON.stringify(sessionUser));
      this.dispatchAuthEvent("login", sessionUser);

      return { success: true, user: sessionUser };
    }

    // Đăng xuất
    logout() {
      localStorage.removeItem(AuthModel.STORAGE_KEYS.AUTH_USER);
      this.dispatchAuthEvent("logout", null);
      return { success: true };
    }

    // Cập nhật thông tin cá nhân
    updateProfile(updatedData) {
      const current = this.getCurrentUser();
      if (!current) return { success: false, message: "Chưa đăng nhập!" };

      const users = this.getAllUsers();
      const idx = users.findIndex((u) => u.id === current.id);
      if (idx === -1) return { success: false, message: "Không tìm thấy tài khoản!" };

      // Cập nhật fields được phép
      const allowed = ["name", "phone", "address", "city", "gender", "birthdate", "avatar"];
      allowed.forEach((field) => {
        if (updatedData[field] !== undefined) {
          users[idx][field] = updatedData[field];
        }
      });

      this.saveAllUsers(users);

      const sessionUser = { ...users[idx] };
      delete sessionUser.password;
      localStorage.setItem(AuthModel.STORAGE_KEYS.AUTH_USER, JSON.stringify(sessionUser));
      this.dispatchAuthEvent("update", sessionUser);

      return { success: true, user: sessionUser };
    }

    // Đổi mật khẩu
    changePassword(oldPass, newPass) {
      const current = this.getCurrentUser();
      if (!current) return { success: false, message: "Chưa đăng nhập!" };

      const users = this.getAllUsers();
      const user = users.find((u) => u.id === current.id);
      if (!user) return { success: false, message: "Không tìm thấy người dùng!" };

      if (user.password !== oldPass) {
        return { success: false, message: "Mật khẩu hiện tại không chính xác!" };
      }
      if (!newPass || newPass.length < 6) {
        return { success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự!" };
      }

      user.password = newPass;
      this.saveAllUsers(users);
      return { success: true, message: "Đổi mật khẩu thành công!" };
    }

    // Lấy danh sách đơn hàng của người dùng hiện tại
    getUserOrders() {
      const current = this.getCurrentUser();
      if (!current) return [];

      try {
        const allOrders = JSON.parse(localStorage.getItem(AuthModel.STORAGE_KEYS.ORDERS_DB)) || [];
        return allOrders
          .filter((o) => o.userId === current.id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } catch (e) {
        return [];
      }
    }

    // Thêm đơn hàng mới khi thanh toán thành công
    addOrder(orderData) {
      const current = this.getCurrentUser();
      const userId = current ? current.id : null;

      try {
        const allOrders = JSON.parse(localStorage.getItem(AuthModel.STORAGE_KEYS.ORDERS_DB)) || [];
        const newOrder = {
          id: orderData.id || "BL-" + Math.floor(10000 + Math.random() * 90000),
          userId: userId,
          customerName: orderData.customerName || (current ? current.name : "Khách hàng"),
          phone: orderData.phone || (current ? current.phone : ""),
          address: orderData.address || (current ? current.address : ""),
          city: orderData.city || "Hà Nội",
          date: new Date().toISOString(),
          items: orderData.items || [],
          paymentMethod: orderData.paymentMethod || "COD",
          total: orderData.total || 0,
          status: "processing", // processing -> shipping -> completed -> cancelled
          statusLabel: "Chờ xác nhận & đóng gói",
        };

        allOrders.unshift(newOrder);
        localStorage.setItem(AuthModel.STORAGE_KEYS.ORDERS_DB, JSON.stringify(allOrders));

        // Cộng 5% điểm thưởng tích lũy cho người dùng nếu đã đăng nhập
        if (current) {
          const rewardPoints = Math.round(newOrder.total / 10000); // 10.000₫ = 1 điểm
          this.addPoints(rewardPoints);
        }

        return { success: true, order: newOrder };
      } catch (e) {
        console.error("Lỗi lưu đơn hàng:", e);
        return { success: false, message: e.message };
      }
    }

    // Hủy đơn hàng
    cancelOrder(orderId) {
      try {
        const allOrders = JSON.parse(localStorage.getItem(AuthModel.STORAGE_KEYS.ORDERS_DB)) || [];
        const order = allOrders.find((o) => o.id === orderId);
        if (!order) return { success: false, message: "Không tìm thấy đơn hàng!" };

        if (order.status === "completed") {
          return { success: false, message: "Đơn hàng đã giao thành công, không thể hủy!" };
        }

        order.status = "cancelled";
        order.statusLabel = "Đã hủy đơn hàng";
        localStorage.setItem(AuthModel.STORAGE_KEYS.ORDERS_DB, JSON.stringify(allOrders));
        return { success: true, message: "Hủy đơn hàng thành công!" };
      } catch (e) {
        return { success: false, message: e.message };
      }
    }

    // Cộng điểm thưởng
    addPoints(points) {
      const current = this.getCurrentUser();
      if (!current) return;
      const users = this.getAllUsers();
      const user = users.find((u) => u.id === current.id);
      if (user) {
        user.points = (user.points || 0) + points;
        this.saveAllUsers(users);
        current.points = user.points;
        localStorage.setItem(AuthModel.STORAGE_KEYS.AUTH_USER, JSON.stringify(current));
        this.dispatchAuthEvent("update", current);
      }
    }

    // Bắn Custom Event để các View khác cập nhật ngay
    dispatchAuthEvent(action, user) {
      window.dispatchEvent(
        new CustomEvent("blue:auth-change", {
          detail: { action, user },
        })
      );
    }
  }

  // =========================================================================
  // 2. [VIEW] - RENDER GIAO DIỆN HEADER & MODAL BẢO VỆ ĐĂNG NHẬP
  // =========================================================================
  class AuthView {
    constructor() {
      this.initHeaderElements();
    }

    initHeaderElements() {
      this.headerUserWrapper = document.getElementById("header-user-wrapper");
      this.headerUserBtn = document.getElementById("header-user-btn");
      this.userNameLabel = document.getElementById("user-name-label");
      this.userDropdownMenu = document.getElementById("user-dropdown-menu");
    }

    // Cập nhật trạng thái hiển thị trên Header của mọi trang
    renderHeader(user) {
      this.initHeaderElements();
      if (!this.headerUserWrapper && !this.headerUserBtn) return;

      if (user) {
        // Đã đăng nhập: Hiển thị avatar tròn gọn gàng (tối giản UI, không text thừa)
        if (this.headerUserWrapper) {
          this.headerUserWrapper.classList.add("is-logged-in");
        }
        if (this.headerUserBtn) {
          this.headerUserBtn.setAttribute("title", `Tài khoản: ${user.name} (Bấm để mở danh mục)`);
          this.headerUserBtn.setAttribute("href", "account.html");
          this.headerUserBtn.setAttribute("aria-haspopup", "true");
          this.headerUserBtn.setAttribute("aria-expanded", "false");
          this.headerUserBtn.innerHTML = `
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80'}" alt="${user.name}" class="header-avatar-circle" />
          `;
        }

        // Cập nhật thông tin trong dropdown nếu có
        const ddName = document.getElementById("user-dd-name");
        const ddRank = document.getElementById("user-dd-rank");
        const ddAvatar = document.getElementById("user-dd-avatar");
        const ddPoints = document.getElementById("user-dd-points");

        if (ddName) ddName.textContent = user.name;
        if (ddRank) ddRank.textContent = user.rank || "Thành viên Blue";
        if (ddPoints) ddPoints.textContent = `${(user.points || 0).toLocaleString("vi-VN")} điểm`;
        if (ddAvatar) {
          ddAvatar.innerHTML = `<img src="${user.avatar}" alt="${user.name}">`;
        }
      } else {
        // Chưa đăng nhập: Chỉ hiển thị icon user (tối giản UI, giảm bớt text thừa theo yêu cầu)
        if (this.headerUserWrapper) {
          this.headerUserWrapper.classList.remove("is-logged-in");
          this.headerUserWrapper.classList.remove("is-open");
        }
        if (this.headerUserBtn) {
          this.headerUserBtn.setAttribute("title", "Tài khoản thành viên");
          this.headerUserBtn.setAttribute("href", "account.html");
          this.headerUserBtn.removeAttribute("aria-haspopup");
          this.headerUserBtn.removeAttribute("aria-expanded");
          this.headerUserBtn.innerHTML = `
            <i class="fa-regular fa-user"></i>
          `;
        }
      }
    }

    getShortName(fullName) {
      if (!fullName) return "Tôi";
      const parts = fullName.trim().split(/\s+/);
      return parts[parts.length - 1]; // Lấy tên chính
    }

    // Modal Yêu Cầu Đăng Nhập (Login Guard Modal)
    showLoginRequiredModal(onSuccessCallback, contextMsg = "Vui lòng đăng nhập tài khoản để tiếp tục thao tác!") {
      let modal = document.getElementById("auth-guard-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "auth-guard-modal";
        modal.className = "auth-guard-modal-backdrop";
        modal.innerHTML = `
          <div class="auth-guard-modal-card" role="dialog" aria-modal="true" aria-labelledby="guard-title">
            <button type="button" class="auth-guard-close-btn" aria-label="Đóng">&times;</button>
            <div class="auth-guard-icon-glow">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h3 id="guard-title">Yêu Cầu Đăng Nhập</h3>
            <p id="guard-msg" class="guard-message">${contextMsg}</p>

            <div class="guard-benefits-list">
              <div class="guard-benefit-item"><i class="fa-solid fa-check"></i> Lưu trữ đơn hàng và tra cứu bảo hành điện tử</div>
              <div class="guard-benefit-item"><i class="fa-solid fa-check"></i> Tích lũy điểm thưởng đổi voucher eSports VIP</div>
              <div class="guard-benefit-item"><i class="fa-solid fa-check"></i> Tự động điền địa chỉ giao hàng siêu tốc</div>
            </div>

            <!-- Form đăng nhập nhanh trong modal -->
            <form id="guard-quick-login-form" class="guard-login-form">
              <div class="guard-input-group">
                <i class="fa-regular fa-envelope"></i>
                <input type="email" id="guard-email" placeholder="Email đăng nhập" required value="gamer@blue.vn" />
              </div>
              <div class="guard-input-group">
                <i class="fa-solid fa-lock"></i>
                <input type="password" id="guard-password" placeholder="Mật khẩu" required value="password123" />
              </div>
              <div id="guard-error-msg" class="guard-error-box" style="display:none;"></div>
              
              <div class="guard-actions-row">
                <button type="submit" class="btn-guard-login">
                  <i class="fa-solid fa-arrow-right-to-bracket"></i> Đăng Nhập Ngay
                </button>
                <a href="account.html?tab=register" class="btn-guard-register">
                  Tạo tài khoản mới
                </a>
              </div>
            </form>

            <div class="guard-footer-note">
              <span>Hoặc thử nhanh với 1 chạm:</span>
              <button type="button" id="btn-guard-demo-login" class="btn-guard-quick-demo">
                ⚡ Đăng nhập tài khoản Test (Alex Nguyễn)
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        // Đóng modal
        modal.querySelector(".auth-guard-close-btn").addEventListener("click", () => {
          modal.style.display = "none";
        });
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.style.display = "none";
        });
      }

      // Cập nhật thông điệp nếu có
      const msgEl = modal.querySelector("#guard-msg");
      if (msgEl) msgEl.textContent = contextMsg;

      const errBox = modal.querySelector("#guard-error-msg");
      if (errBox) errBox.style.display = "none";

      // Bắt sự kiện submit form đăng nhập nhanh
      const form = modal.querySelector("#guard-quick-login-form");
      form.onsubmit = (e) => {
        e.preventDefault();
        const email = modal.querySelector("#guard-email").value;
        const pass = modal.querySelector("#guard-password").value;

        const res = window.AuthModel.login(email, pass);
        if (res.success) {
          modal.style.display = "none";
          if (window.showToast) {
            window.showToast(`Chào mừng ${res.user.name} quay trở lại!`, "success");
          }
          if (typeof onSuccessCallback === "function") {
            onSuccessCallback(res.user);
          }
        } else {
          if (errBox) {
            errBox.textContent = res.message;
            errBox.style.display = "block";
          }
        }
      };

      // Nút test 1 chạm
      const demoBtn = modal.querySelector("#btn-guard-demo-login");
      demoBtn.onclick = () => {
        modal.querySelector("#guard-email").value = "gamer@blue.vn";
        modal.querySelector("#guard-password").value = "password123";
        form.dispatchEvent(new Event("submit"));
      };

      modal.style.display = "flex";
    }
  }

  // =========================================================================
  // 3. [CONTROLLER] - ĐIỀU PHỐI SỰ KIỆN & BẢO VỆ CÁC MỤC YÊU CẦU ĐĂNG NHẬP
  // =========================================================================
  class AuthController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.init();
    }

    init() {
      // 1. Render trạng thái Header ban đầu
      this.view.renderHeader(this.model.getCurrentUser());

      // 2. Lắng nghe thay đổi xác thực (login/logout/update)
      window.addEventListener("blue:auth-change", (e) => {
        const { user } = e.detail;
        this.view.renderHeader(user);
      });

      // 3. Dropdown Menu: Click-to-toggle, Pin mở, đóng khi click outside hoặc Escape
      document.addEventListener("click", (e) => {
        const userBtn = e.target.closest("#header-user-btn");
        const wrapper = document.getElementById("header-user-wrapper");

        if (userBtn && wrapper) {
          if (this.model.isLoggedIn()) {
            // Khi đã đăng nhập: Click vào avatar sẽ ghim mở hoặc đóng dropdown menu
            e.preventDefault();
            const isOpen = wrapper.classList.toggle("is-open");
            userBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            return;
          }
          // Chưa đăng nhập: Cho phép navigate tự nhiên sang account.html
          return;
        }

        // Bắt sự kiện click các link trong dropdown menu
        const dropdownLink = e.target.closest(".user-dropdown-links a");
        if (dropdownLink && wrapper) {
          wrapper.classList.remove("is-open");
          const userBtnEl = document.getElementById("header-user-btn");
          if (userBtnEl) userBtnEl.setAttribute("aria-expanded", "false");

          // Nếu đang ở trang account.html, chuyển tab mượt mà không reload
          if (window.location.pathname.includes("account.html")) {
            const href = dropdownLink.getAttribute("href");
            if (href && href.includes("tab=")) {
              e.preventDefault();
              const tabName = href.split("tab=")[1];
              const targetNav = document.querySelector(`.dash-nav-item[data-tab="${tabName}"]`);
              if (targetNav) targetNav.click();
            }
          }
          return;
        }

        // Click bên ngoài header-user-wrapper: Đóng dropdown nếu đang mở
        if (wrapper && wrapper.classList.contains("is-open")) {
          if (!e.target.closest("#header-user-wrapper")) {
            wrapper.classList.remove("is-open");
            const userBtnEl = document.getElementById("header-user-btn");
            if (userBtnEl) userBtnEl.setAttribute("aria-expanded", "false");
          }
        }
      });

      // Phím Escape: Đóng dropdown menu
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const wrapper = document.getElementById("header-user-wrapper");
          if (wrapper && wrapper.classList.contains("is-open")) {
            wrapper.classList.remove("is-open");
            const userBtnEl = document.getElementById("header-user-btn");
            if (userBtnEl) {
              userBtnEl.setAttribute("aria-expanded", "false");
              userBtnEl.focus();
            }
          }
        }
      });

      // 4. Bắt sự kiện đăng xuất từ Header
      document.addEventListener("click", (e) => {
        const logoutTrigger = e.target.closest("#header-logout-btn, .action-logout-trigger");
        if (logoutTrigger) {
          e.preventDefault();
          if (confirm("Bạn có chắc chắn muốn đăng xuất tài khoản?")) {
            this.model.logout();
            if (window.showToast) {
              window.showToast("Đã đăng xuất tài khoản thành công!", "info");
            }
            // Nếu đang ở trang account.html thì reload để về form đăng nhập
            if (window.location.pathname.includes("account.html")) {
              window.location.href = "account.html";
            }
          }
        }
      });

      // 4. Hook tự động điền thông tin người dùng vào Checkout nếu đã đăng nhập
      this.setupCheckoutIntegration();
    }

    // Bảo vệ các hành động cần đăng nhập (Require Login Guard)
    requireLogin(onSuccessCallback, message = "Vui lòng đăng nhập để thực hiện tính năng này!") {
      if (this.model.isLoggedIn()) {
        if (typeof onSuccessCallback === "function") {
          onSuccessCallback(this.model.getCurrentUser());
        }
        return true;
      }

      this.view.showLoginRequiredModal(onSuccessCallback, message);
      return false;
    }

    // Tích hợp với luồng Thanh Toán (Checkout Integration)
    setupCheckoutIntegration() {
      // Khi người dùng bấm thanh toán trong giỏ hàng, nếu đã đăng nhập thì tự động điền form
      const autoFillCustomerInfo = () => {
        const user = this.model.getCurrentUser();
        if (!user) return;

        const nameInput = document.getElementById("cust-name");
        const phoneInput = document.getElementById("cust-phone");
        const addrInput = document.getElementById("cust-address");
        const cityInput = document.getElementById("cust-city");

        if (nameInput && !nameInput.value) nameInput.value = user.name || "";
        if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || "";
        if (addrInput && !addrInput.value) addrInput.value = user.address || "";
        if (cityInput && user.city) cityInput.value = user.city;
      };

      // Lắng nghe khi mở Checkout Modal
      const checkoutBtn = document.getElementById("cart-checkout-btn");
      if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
          setTimeout(autoFillCustomerInfo, 100);
        });
      }

      // Khi bấm "Xác nhận đặt hàng" ở Step 2, tự động lưu đơn hàng vào tài khoản
      const confirmOrderBtn = document.getElementById("btn-confirm-order");
      if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener("click", () => {
          if (!this.model.isLoggedIn()) return;

          // Lấy thông tin đơn hàng vừa tạo để lưu vào Model
          setTimeout(() => {
            const orderCodeEl = document.getElementById("order-code-badge");
            const orderCode = orderCodeEl ? orderCodeEl.textContent.replace("Mã đơn hàng:", "").replace("Mã đơn:", "").trim() : "BL-" + Date.now().toString().slice(-5);

            const activeItems = window.activeCheckoutItems || [];
            const subtotal = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const custName = document.getElementById("cust-name")?.value || "";
            const custPhone = document.getElementById("cust-phone")?.value || "";
            const custAddr = document.getElementById("cust-address")?.value || "";
            const custCity = document.getElementById("cust-city")?.value || "Hà Nội";
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || "COD";

            this.model.addOrder({
              id: orderCode,
              customerName: custName,
              phone: custPhone,
              address: custAddr,
              city: custCity,
              items: activeItems,
              paymentMethod: paymentMethod,
              total: subtotal,
            });
          }, 50);
        });
      }
    }
  }

  // Khởi tạo các instance MVC toàn cục
  const authModelInstance = new AuthModel();
  const authViewInstance = new AuthView();
  const authControllerInstance = new AuthController(authModelInstance, authViewInstance);

  // Xuất ra window để toàn bộ ứng dụng sử dụng
  window.AuthModel = authModelInstance;
  window.AuthView = authViewInstance;
  window.AuthController = authControllerInstance;
})();

