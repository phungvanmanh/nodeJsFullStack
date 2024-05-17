const indexBanHang = (req, res) =>{
    res.render("page/BanHang/index.ejs", {
        layout:'../view/share/index',
        title: "Bán Hàng",
        customScript: "/page/BanHang/index.js",
    });
}
module.exports ={
    indexBanHang
} 