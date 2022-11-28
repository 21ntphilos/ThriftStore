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
router.post("/create-admin", auth_1.auth, AdminController_1.AdminRegister);
router.get("/get-all-users", auth_1.auth, AdminController_1.getAllUsers);
exports.default = router;
