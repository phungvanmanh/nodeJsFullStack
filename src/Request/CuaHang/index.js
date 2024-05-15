const { check, validationResult } = require("express-validator");
const CuaHang = require("../../model/CuaHang");
const checkCuaHangExists = (id) => {
    return CuaHang.findOne({ where: { id: id } }).then(cua_hang => {
      if (!cua_hang) {
        return Promise.reject('Cửa hàng không tồn tại');
      }
    });
};
const CreateCuaHangRequest = [
    check("ten_cua_hang")
        .not()
        .isEmpty()
        .withMessage("Tên cửa hàng không được để trống")
        .isLength({ min: 6 })
        .withMessage("Tên cửa hàng phải có ít nhất 6 ký tự"),
    check("dia_chi")
        .not()
        .isEmpty()
        .withMessage("Địa chỉ không được để trống")
        .isLength({ min: 6 })
        .withMessage("Địa chỉ phải có ít nhất 6 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const UpdateCuaHangRequest = [
    check("id")
        .not()
        .custom(checkCuaHangExists),
    check("ten_cua_hang")
        .not()
        .isEmpty()
        .withMessage("Tên cửa hàng không được để trống")
        .isLength({ min: 6 })
        .withMessage("Tên cửa hàng phải có ít nhất 6 ký tự"),
    check("dia_chi")
        .not()
        .isEmpty()
        .withMessage("Địa chỉ không được để trống")
        .isLength({ min: 6 })
        .withMessage("Địa chỉ phải có ít nhất 6 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const DeleteCuaHangRequest = [
    check("id")
        .not()
        .custom(checkCuaHangExists),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = {
    CreateCuaHangRequest,
    UpdateCuaHangRequest,
    DeleteCuaHangRequest
};