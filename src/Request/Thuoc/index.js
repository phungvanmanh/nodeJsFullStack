const { check, validationResult } = require("express-validator");
const checkThuocExists = (id) => {
    return DonVi.findOne({ where: { id: id } }).then(don_vo => {
      if (!don_vo) {
        return Promise.reject('Thuốc không tồn tại');
      }
    });
};
const CreateThuocRequest = [
    check("ten_thuoc")
        .not()
        .isEmpty()
        .withMessage("Tên thuốc không được để trống")
        .isLength({ min: 2 })
        .withMessage("Tên thuốc phải có ít nhất 2 ký tự"),
    check("han_su_dung")
        .not()
        .isEmpty()
        .withMessage("Hạn sử dụng không được để trống"),
    check("id_don_vi")
        .not()
        .isEmpty()
        .withMessage("Đơn vị không được để trống!"),
    check("gia_nhap")
        .not()
        .isEmpty()
        .withMessage("Giá nhập không được để trống!"),
    check("gia_ban")
        .not()
        .isEmpty()
        .withMessage("Giá bán không được để trống!"),
    check("gia_ban")
        .not()
        .isEmpty()
        .withMessage("Ghi chú không được để trống!"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const UpdateThuocRequest = [
    check("id")
        .not()
        .custom(checkThuocExists),
        check("ten_thuoc")
        .not()
        .isEmpty()
        .withMessage("Tên thuốc không được để trống")
        .isLength({ min: 2 })
        .withMessage("Tên thuốc phải có ít nhất 2 ký tự"),
    check("han_su_dung")
        .not()
        .isEmpty()
        .withMessage("Hạn sử dụng không được để trống"),
    check("id_don_vi")
        .not()
        .isEmpty()
        .withMessage("Đơn vị không được để trống!"),
    check("gia_nhap")
        .not()
        .isEmpty()
        .withMessage("Giá nhập không được để trống!"),
    check("gia_ban")
        .not()
        .isEmpty()
        .withMessage("Giá bán không được để trống!"),
    check("gia_ban")
        .not()
        .isEmpty()
        .withMessage("Ghi chú không được để trống!"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const DeleteThuocRequest = [
    check("id")
        .not()
        .custom(checkThuocExists),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = {
    CreateThuocRequest,
    UpdateThuocRequest,
    DeleteThuocRequest,
};