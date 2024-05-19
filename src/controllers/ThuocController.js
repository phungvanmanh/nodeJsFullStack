const Thuoc = require("../model/Thuoc");
const indexThuoc = (req, res) => {
    res.render("page/Thuoc/index.ejs", {
        layout: "../view/share/index",
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
        ghi_chu,
        id_nhom_thuoc,
    } = req.body;
    await Thuoc.query().insert({
        ten_thuoc,
        han_su_dung,
        so_luong,
        id_don_vi,
        gia_nhap,
        gia_ban,
        ghi_chu,
        id_nhom_thuoc,
    });

    res.json({
        status: true,
        message: "Đã thêm mới thuốc thành công!",
    });
};

const dataThuoc = async (req, res) => {
    try {
        const data = await Thuoc.query()
            .join("don_vis", "thuocs.id_don_vi", "don_vis.id")
            .join('nhom_thuocs', 'thuocs.id_nhom_thuoc', 'nhom_thuocs.id')
            .select(
                "thuocs.*",
                "don_vis.ten_don_vi",
                'nhom_thuocs.ten_nhom_thuoc',
                Thuoc.raw("DATE_FORMAT(thuocs.han_su_dung, '%Y-%m-%d') as han_su_dung")
            );

        res.json({ data: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình truy vấn dữ liệu' });
    }
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
        ghi_chu,
        id_nhom_thuoc,
    } = req.body;
    const thuoc = await Thuoc.query().findById(id);
    if (!thuoc) {
        return res.status(false).json({ message: "Thuốc không tồn tại" });
    }

    (thuoc.ten_thuoc = ten_thuoc),
        (thuoc.han_su_dung = han_su_dung),
        (thuoc.so_luong = so_luong),
        (thuoc.id_don_vi = id_don_vi),
        (thuoc.gia_nhap = gia_nhap),
        (thuoc.gia_ban = gia_ban),
        (thuoc.ghi_chu = ghi_chu),
        (thuoc.id_nhom_thuoc = id_nhom_thuoc),
        await thuoc.$query().patch();

    res.json({
        status: true,
        message: "Cập nhật thành công",
    });
};
const deleteThuoc = async (req, res) => {
    const { id } = req.body;
    const thuoc = await Thuoc.query().findById(id);
    if (!thuoc) {
        return res.status(false).json({ message: "Thuốc không tồn tại" });
    }

    await thuoc.$query().delete();

    res.json({
        status: true,
        message: "Xóa thành công",
    });
};

module.exports = {
    indexThuoc,
    dataThuoc,
    createThuoc,
    updateThuoc,
    deleteThuoc,
};
