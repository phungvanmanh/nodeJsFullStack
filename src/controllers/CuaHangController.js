const CuaHang = require("../model/CuaHang");
const bcrypt = require('bcryptjs');

const indexCuaHang = (req, res) => {
    res.render("page/CuaHang/index.ejs", {
        layout:'../view/share/index',
        title: "Cửa Hàng",
        customScript: "/page/CuaHang/index.js",
    });
};

const createCuaHang = async (req, res) => {
    const {
        ten_cua_hang,
        dia_chi,
    } = req.body;
    await CuaHang.query().insert({
        ten_cua_hang,
        dia_chi,
    });

    res.json({
        status: true,
        message: "Đã thêm mới của hàng thành công!",
    });
};

const dataCuaHang = async (req, res) => {
    const data = await CuaHang.query();
    res.json({ data: data });
};

const updateCuaHang = async (req, res) => {
    const {
        id,
        ten_cua_hang,
        dia_chi,
    } = req.body;
    const cua_hang = await CuaHang.query().findById(id);
    console.log(id, cua_hang);
    if(!cua_hang) {
        return res.status(false).json({ message: 'Cửa hàng không tồn tại' });
    }

    cua_hang.ten_cua_hang = ten_cua_hang,
    cua_hang.dia_chi      = dia_chi,
    await cua_hang.$query().patch();

    res.json({ 
        status : true,
        message: 'Cập nhật thành công' 
    });
};
const deleteCuaHang = async (req, res) => {
    const {
        id,
    } = req.body;
    const cua_hang = await CuaHang.query().findById(id);
    if(!cua_hang) {
        return res.status(false).json({ message: 'Cửa hàng không tồn tại' });
    }

    await cua_hang.$query().delete();

    res.json({ 
        status : true,
        message: 'Xóa thành công' 
    });
};

module.exports = {
    indexCuaHang,
    dataCuaHang,
    createCuaHang,
    updateCuaHang,
    deleteCuaHang,
};
