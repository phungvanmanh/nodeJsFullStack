const { check, validationResult } = require("express-validator");
const Quyen = require("../../model/Quyen");
const checkQuyenExists = (id) => {
    return Quyen.findOne({ where: { id: id } }).then(quyen => {
      if (!quyen) {
        return Promise.reject('Quyền không tồn tại');
      }
    });
};
const CreateQuyenRequest = [
    check("ten_quyen")
        .not()
        .isEmpty()
        .withMessage("Tên quyền không được để trống")
        .isLength({ min: 2 })
        .withMessage("Tên quyền phải có ít nhất 2 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const UpdateQuyenRequest = [
    check("id")
        .not()
        .custom(checkQuyenExists),
        check("ten_quyen")
        .not()
        .isEmpty()
        .withMessage("Quyền không được để trống")
        .isLength({ min: 2 })
        .withMessage("Quyền phải có ít nhất 2 ký tự"),
    check("ten_quyen")
        .not()
        .isEmpty()
        .withMessage("Quyền không được để trống")
        .isLength({ min: 2 })
        .withMessage("Quyền phải có ít nhất 2 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const DeleteQuyenRequest = [
    check("id")
        .not()
        .custom(checkQuyenExists),
        check("ten_quyen")
        .not()
        .isEmpty()
        .withMessage("Tên thuốc không được để trống")
        .isLength({ min: 2 })
        .withMessage("Tên thuốc phải có ít nhất 2 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = {
    CreateQuyenRequest,
    UpdateQuyenRequest,
    DeleteQuyenRequest,
};