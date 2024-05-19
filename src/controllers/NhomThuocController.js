const NhomThuoc = require("../model/NhomThuoc");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SESSION_SECRET;
const indexNhomThuoc = (req, res) => {
    res.render("page/NhomThuoc/index", {
        layout: "../view/share/index",
        title: "Nhóm Thuốc",
        customScript: "/page/NhomThuoc/index.js",
    });
};

const createNhomThuoc = async (req, res) => {
    const {
        ten_nhom_thuoc,
    } = req.body;

    await NhomThuoc.query().insert({
        ten_nhom_thuoc,
    });

    res.json({
        status: true,
        message: "Đã thêm mới nhóm thuốc thành công!",
    });
};

const dataNhomThuoc = async (req, res) => {
    const data = await NhomThuoc.query();
    res.json({ data: data });
};

const updateNhomThuoc = async (req, res) => {
    const {
        id,
        ten_nhom_thuoc,
    } = req.body;
    const admin = await NhomThuoc.query().findById(id);
    if(!admin) {
        return res.status(false).json({ message: 'Nhóm thuốc không tồn tại' });
    }

    admin.ten_nhom_thuoc = ten_nhom_thuoc,
    await admin.$query().patch();

    res.json({ 
        status : true,
        message: 'Cập nhật thành công' 
    });
};
const deleteNhomThuoc = async (req, res) => {
    const {
        id,
    } = req.body;
    const admin = await NhomThuoc.query().findById(id);
    if(!admin) {
        return res.status(false).json({ message: 'Nhóm thuốc không tồn tại' });
    }

    await admin.$query().delete();

    res.json({ 
        status : true,
        message: 'Xóa thành công' 
    });
};

const getUser = async (req) => {
    const token = req.headers['authorization'];
    if (!token) {
        throw new Error('Token không tồn tại');
    }

    const decoded = jwt.verify(token, secretKey);
    console.log(decoded.id);
};

module.exports = {
    indexNhomThuoc,
    dataNhomThuoc,
    createNhomThuoc,
    updateNhomThuoc,
    deleteNhomThuoc,
    getUser,
};
