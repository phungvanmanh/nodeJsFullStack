const Quyen = require("../model/Quyen");
const indexQuyen = (req, res) =>{
    res.render("page/Quyen/index.ejs", {
        layout:'../view/share/index',
        title: "Quyền",
        customScript: "/page/Quyen/index.js",
    });
}

const createQuyen = async (req, res) => {
    const {
        ten_quyen,
    } = req.body;
    await Quyen.query().insert({
        ten_quyen,
    });

    res.json({
        status: true,
        message: "Đã thêm mới quyền thành công!",
    });
};

const dataQuyen = async (req, res) => {
    const data = await Quyen.query();
    res.json({ data: data });
};

const updateQuyen = async (req, res) => {
    const {
        id,
        ten_quyen,
    } = req.body;
    const quyen = await Quyen.query().findById(id);
    if(!quyen) {
        return res.status(false).json({ message: 'Quyền không tồn tại' });
    }

    quyen.ten_quyen     = ten_quyen,
    await quyen.$query().patch();

    res.json({ 
        status : true,
        message: 'Cập nhật thành công' 
    });
};
const deleteQuyen = async (req, res) => {
    const {
        id,
    } = req.body;
    const quyen = await Quyen.query().findById(id);
    if(!quyen) {
        return res.status(false).json({ message: 'Quyền không tồn tại' });
    }

    await quyen.$query().delete();

    res.json({ 
        status : true,
        message: 'Xóa thành công' 
    });
};

module.exports = {
    indexQuyen,
    dataQuyen,
    createQuyen,
    updateQuyen,
    deleteQuyen
}