const { check, validationResult } = require("express-validator");
const CreateDonViRequest = [
    check("ten_don_vi")
        .not()
        .isEmpty()
        .withMessage("Tên đơn vị không được để trống")
        .isLength({ min: 2 })
        .withMessage("Tên đơn vị phải có ít nhất 2 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
module.exports = {
    CreateDonViRequest,
};