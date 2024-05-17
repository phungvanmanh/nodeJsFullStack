const indexThuoc = (req, res) => {
    res.render("page/Thuoc/index.ejs", {
        layout:'../view/share/index',
        title: "Cửa Hàng",
        customScript: "/page/Thuoc/index.js",
    });
};

module.exports = {
    indexThuoc,
}