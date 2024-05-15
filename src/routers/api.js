const express = require('express');
const router = express.Router();
const admin = express.Router();
const { index, data, createAdmin, updateAdmin, deleteAdmin } = require("../controllers/AdminController");
const { indexLogin, Login, Logout } = require("../controllers/LoginAdminController");
const { indexCuaHang, dataCuaHang, createCuaHang, updateCuaHang, deleteCuaHang } = require('../controllers/CuaHangController');
const { indexDonVi, createDonVi, dataDonVi } = require('../controllers/DonViController');
const { CreateAdminRequest, UpdateAdminRequest, DeleteAdminRequest } = require("../Request/Admin");
const { CreateCuaHangRequest, UpdateCuaHangRequest, DeleteCuaHangRequest } = require('../Request/CuaHang');
const { CreateDonViRequest } = require('../Request/DonVi/indnex');

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const preventLoggedInUserAccess = (req, res, next) => {
    if (req.session && req.session.user) {
        res.redirect('/admin');
    } else {
        next();
    }
};

router.post('/login', Login);
router.get('/logout', Logout);
router.get('/login', preventLoggedInUserAccess, indexLogin);

// View
admin.get('/', isAuthenticated, index);
admin.get('/cua-hang', isAuthenticated, indexCuaHang);
admin.get('/don-vi', isAuthenticated, indexDonVi);

// Get Data
admin.get('/get-data', isAuthenticated, data);
admin.get('/cua-hang/get-data', isAuthenticated, dataCuaHang);
admin.get('/don-vi/get-data', isAuthenticated, dataDonVi);

// Function CRUD
admin.post('/create', isAuthenticated, CreateAdminRequest, createAdmin);
admin.post('/update', isAuthenticated, UpdateAdminRequest, updateAdmin);
admin.post('/delete', isAuthenticated, DeleteAdminRequest, deleteAdmin);
admin.post('/cua-hang/create', isAuthenticated, CreateCuaHangRequest, createCuaHang);
admin.post('/cua-hang/update', isAuthenticated, UpdateCuaHangRequest, updateCuaHang);
admin.post('/cua-hang/delete', isAuthenticated, DeleteCuaHangRequest, deleteCuaHang);
admin.post('/don-vi/create', isAuthenticated, CreateDonViRequest, createDonVi);

router.use('/admin', admin);
module.exports = router;
