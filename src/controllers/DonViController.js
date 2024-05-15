const DonVi = require("../model/DonVi");
const bcrypt = require('bcryptjs');

const indexDonVi = (req, res) => {
    res.render("page/DonVi/index.ejs", {
        layout:'../view/share/index',
        title: "Cửa Hàng",
        customScript: "/page/DonVi/index.js",
    });
};

const createDonVi = async (req, res) => {
    const {
        ten_don_vi,
    } = req.body;
    await DonVi.query().insert({
        ten_don_vi,
    });

    res.json({
        status: true,
        message: "Đã thêm mới đơn vị thành công!",
    });
};

const dataDonVi = async (req, res) => {
    const data = await DonVi.query();
    res.json({ data: data });
};

module.exports = {
    indexDonVi,
    dataDonVi,
    createDonVi,
};
