const indexNhapKho = (req, res) =>{
    res.render("page/NhapKho/index.ejs", {
        layout:'../view/share/index',
        title: "Nhập Kho",
        customScript: "/page/NhapKho/index.js",
    });
}
module.exports ={
    indexNhapKho
} 