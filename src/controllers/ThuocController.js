const Thuoc = require("../model/Thuoc");
const indexThuoc = (req, res) => {
    res.render("page/Thuoc/index.ejs", {
        layout:'../view/share/index',
        title: "Cửa Hàng",
        customScript: "/page/Thuoc/index.js",
    });
};

const createThuoc = async (req, res) => {
    const {
        ten_thuoc,
        han_su_dung,
        so_luong,
        id_don_vi,
        gia_nhap,
        gia_ban,
        ghi_chu
    } = req.body;
    await Thuoc.query().insert({
        ten_thuoc,
        han_su_dung,
        so_luong,
        id_don_vi,
        gia_nhap,
        gia_ban,
        ghi_chu
    });

    res.json({
        status: true,
        message: "Đã thêm mới thuốc thành công!",
    });
};

const dataThuoc = async (req, res) => {
    const data = await Thuoc.query()
        .join("don_vis", "thuocs.id_don_vi", "don_vis.id")
        .select("thuocs.*", "don_vis.ten_don_vi");
    res.json({ data: data });
};

const updateThuoc = async (req, res) => {
    const {
        id,
        ten_thuoc,
        han_su_dung,
        so_luong,
        id_don_vi,
        gia_nhap,
        gia_ban,
        ghi_chu
    } = req.body;
    const thuoc = await Thuoc.query().findById(id);
    if(!thuoc) {
        return res.status(false).json({ message: 'Thuốc không tồn tại' });
    }

    thuoc.ten_thuoc     = ten_thuoc,
    thuoc.han_su_dung   = han_su_dung,
    thuoc.so_luong      = so_luong,
    thuoc.id_don_vi     = id_don_vi,
    thuoc.gia_nhap      = gia_nhap,
    thuoc.gia_ban       = gia_ban,
    thuoc.ghi_chu       = ghi_chu,
    await thuoc.$query().patch();

    res.json({ 
        status : true,
        message: 'Cập nhật thành công' 
    });
};
const deleteThuoc = async (req, res) => {
    const {
        id,
    } = req.body;
    const thuoc = await Thuoc.query().findById(id);
    if(!thuoc) {
        return res.status(false).json({ message: 'Thuốc không tồn tại' });
    }

    await thuoc.$query().delete();

    res.json({ 
        status : true,
        message: 'Xóa thành công' 
    });
};

module.exports = {
    indexThuoc,
    dataThuoc,
    createThuoc,
    updateThuoc,
    deleteThuoc
}