"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create-super-admin", AdminController_1.SuperAdminRegister);
router.post("/login", auth_1.auth, AdminController_1.AdminRegister);
router.post("/create-admin", auth_1.auth, AdminController_1.AdminRegister);
router.get("/get-all-users", auth_1.auth, AdminController_1.getAllUsers);
router.get("/get-all-vendors", auth_1.auth, AdminController_1.getAllVendors);
router.get("/get-all-Properties", auth_1.auth, AdminController_1.getAllProperties);
router.get("/get-single-vendor/:vendorId", auth_1.auth, AdminController_1.getSingleVendor);
exports.default = router;
