function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

let cartCount = 0;

function addToCart(product) {
    cartCount++;

    const countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.textContent = cartCount;
    }

    const toast = document.createElement("div");
    toast.textContent = product + " đã được thêm vào giỏ hàng";
    toast.style.position = "fixed";
    toast.style.right = "24px";
    toast.style.bottom = "24px";
    toast.style.padding = "14px 20px";
    toast.style.borderRadius = "14px";
    toast.style.background = "linear-gradient(90deg, #22c55e, #16a34a)";
    toast.style.color = "white";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 20px 40px rgba(22, 163, 74, 0.9)";
    toast.style.zIndex = "50";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        setTimeout(() => toast.remove(), 300);
    }, 1800);
}

// Luồng mua hàng: bắt thông tin khách trước khi thêm vào giỏ
function buyProduct(product) {
    const name = prompt("Nhập họ tên khách hàng:");
    const phone = prompt("Nhập số điện thoại:");
    const email = prompt("Nhập email:");
    const dob = prompt("Nhập ngày tháng năm sinh (vd: 01/01/2000):");
    const gender = prompt("Nhập giới tính (Nam/Nữ/Khác):");

    if (!name || !phone || !email || !dob || !gender) {
        alert("Không được bỏ trống thông tin khách hàng");
        return;
    }

    // Kiểm tra số điện thoại: chỉ cho phép 1-10 chữ số
    const phoneRegex = /^\d{1,10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại chỉ được phép là số và tối đa 10 chữ số.");
        return;
    }
    addToCart(product);
}

// Xác nhận khi bấm vào giỏ hàng
function confirmPurchase() {
    if (cartCount <= 0) {
        alert("Giỏ hàng của bạn đang trống.");
        return;
    }

    const agreed = confirm("Bạn có đồng ý mua sản phẩm này không?");
    if (agreed) {
        alert("Cảm ơn bạn đã đồng ý mua sản phẩm!");
    } else {
        cartCount = Math.max(0, cartCount - 1);
        const countEl = document.getElementById("cart-count");
        if (countEl) {
            countEl.textContent = cartCount;
        }
        alert("Bạn đã hủy mua 1 sản phẩm khỏi giỏ hàng.");
    }
}

// Scroll reveal for sections
const revealElements = document.querySelectorAll('.reveal');

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add('visible'));
}

// Xử lý form thông tin khách hàng trên trang Liên hệ
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('customer-info-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('cust-name');
        const emailInput = document.getElementById('cust-email');
        const placeSelect = document.getElementById('cust-place');
        const noteTextarea = document.getElementById('cust-note');
        const genderInput = form.querySelector('input[name="gender"]:checked');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const place = placeSelect ? placeSelect.value.trim() : '';
        const note = noteTextarea ? noteTextarea.value.trim() : '';
        const gender = genderInput ? genderInput.value : '';

        // Kiểm tra tên
        if (!name) {
            alert('Chưa nhập tên.');
            return;
        }

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            alert('Email sai hoặc không phù hợp.');
            return;
        }

        // Kiểm tra nơi sinh và nội dung
        if (!place || !note) {
            alert('Xin vui lòng nhập thông tin.');
            return;
        }

        // Kiểm tra giới tính
        if (!gender) {
            alert('Vui lòng chọn giới tính.');
            return;
        }

        // Tạo link chuyển thẳng đến trang soạn thư Gmail
        const to = 'support@techhub.vn';
        const subject = 'Thong tin khach hang moi';
        const bodyLines = [
            'Tên: ' + name,
            'Email: ' + email,
            'Giới tính: ' + gender,
            'Nơi sinh: ' + place,
            'Nội dung: ' + note
        ];

        const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
            + '&to=' + encodeURIComponent(to)
            + '&su=' + encodeURIComponent(subject)
            + '&body=' + encodeURIComponent(bodyLines.join('\n'));

        window.location.href = gmailUrl;
    });
});
