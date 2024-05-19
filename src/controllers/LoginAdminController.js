const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const indexLogin = ("/login", (req, res) => {
    res.render("page/Login/index", {
        layout:'../view/page/Login/index',
        customScript: "/page/Login/index.js",
    });
});
const secretKey = process.env.SESSION_SECRET;

const Login = async (req, res) => {
    try {
        const { ten_dang_nhap, password } = req.body;

        // Truy vấn cơ sở dữ liệu để tìm người dùng
        const user = await Admin.query()
            .where('ten_dang_nhap', ten_dang_nhap)
            .orWhere('email', ten_dang_nhap)
            .first();

        // Kiểm tra xem người dùng có tồn tại hay không
        if (!user) {
            return res.status(404).json({ message: 'Tên đăng nhập không hợp lệ' });
        }

        // So sánh mật khẩu đã cung cấp với mật khẩu được lưu trữ
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Mật khẩu không hợp lệ' });
        }

        // Tạo payload cho token
        const payload = { ten_dang_nhap: user.ten_dang_nhap, id: user.id };

        // Tạo token
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        req.session.user = ten_dang_nhap;
        // Gửi phản hồi chứa token
        res.json({
            status: true,
            message: 'Đăng nhập thành công!',
            token: token,
            id_user: user.id
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập' });
    }
};

const Logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout.');
        }

        // Optionally clear the cookie.
        res.clearCookie('connect.sid', { path: '/' });  // 'connect.sid' is the default session cookie name; change if you use a different name.

        // Redirect to '/login'
        res.redirect('/login');
    });
}

module.exports = {
    indexLogin,
    Login,
    Logout,
};
