const indexQuyen = (req, res) =>{
    res.render("page/Quyen/index.ejs", {
        layout:'../view/share/index',
        title: "Quyền",
        customScript: "/page/Quyen/index.js",
    });
}
module.exports ={
    indexQuyen
} 