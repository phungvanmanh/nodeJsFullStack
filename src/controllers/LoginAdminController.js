const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");

const indexLogin = ("/login", (req, res) => {
    res.render("page/Login/index", {
        layout:'../view/page/Login/index',
        customScript: "/page/Login/index.js",
    });
});

const Login = async (req, res) => {
    try {
        const { ten_dang_nhap, password } = req.body;

        // Query the database for the user
        const user = await Admin.query().where('ten_dang_nhap', ten_dang_nhap).first();

        // Check if user exists
        if (!user) {
            // If no user found, return an error
            return res.status(404).json({ message: 'Invalid username' });
        }

        // Compare provided password with stored password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            // If password comparison fails, return an error
            return res.status(401).json({ message: 'Invalid password' });
        }
        console.log(ten_dang_nhap);
        req.session.user = ten_dang_nhap;
        console.log(req.session.user);
        res.json({
            'status' : true,
            'message' : 'Đăng nhập thành công!'
        }); // Redirect to the admin page upon successful login
    } catch (error) {
        // Log and return error information if an exception occurs
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
}

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
