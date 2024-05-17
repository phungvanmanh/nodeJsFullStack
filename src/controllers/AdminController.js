const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");

const index = (req, res) => {
    res.render("page/admin/index", {
        layout: "../view/share/index",
        title: "Admin",
        customScript: "/page/admin/index.js",
    });
};

const createAdmin = async (req, res) => {
    const {
        ten_dang_nhap,
        ten_hien_thi,
        so_dien_thoai,
        password,
        email,
        id_cua_hang,
        id_quyen,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.query().insert({
        ten_dang_nhap,
        ten_hien_thi,
        so_dien_thoai,
        email,
        password: hashedPassword,
        id_cua_hang,
        id_quyen,
    });

    res.json({
        status: true,
        message: "Admin created successfully",
    });
};

const data = async (req, res) => {
    const data = await Admin.query()
        .join("cua_hangs", "admins.id_cua_hang", "cua_hangs.id")
        .join('quyens', 'admins.id_quyen', 'quyens.id')
        .select("admins.*", "cua_hangs.ten_cua_hang", 'quyens.ten_quyen');
    res.json({ data: data });
};

const updateAdmin = async (req, res) => {
    const {
        id,
        ten_dang_nhap,
        ten_hien_thi,
        so_dien_thoai,
        email,
        id_cua_hang,
        id_quyen,
    } = req.body;
    const admin = await Admin.query().findById(id);
    if(!admin) {
        return res.status(false).json({ message: 'Admin không tồn tại' });
    }

    admin.ten_dang_nhap = ten_dang_nhap,
    admin.ten_hien_thi  = ten_hien_thi,
    admin.so_dien_thoai = so_dien_thoai,
    admin.id_cua_hang   = id_cua_hang,
    admin.email         = email,
    admin.id_quyen      = id_quyen,
    await admin.$query().patch();

    res.json({ 
        status : true,
        message: 'Cập nhật thành công' 
    });
};
const deleteAdmin = async (req, res) => {
    const {
        id,
    } = req.body;
    const admin = await Admin.query().findById(id);
    if(!admin) {
        return res.status(false).json({ message: 'Admin không tồn tại' });
    }

    await admin.$query().delete();

    res.json({ 
        status : true,
        message: 'Xóa thành công' 
    });
};

module.exports = {
    index,
    data,
    createAdmin,
    updateAdmin,
    deleteAdmin,
};
