"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.post('/signup', UserController_1.Register);
router.post('/verifyUser/:signature', UserController_1.VerifyUser);
router.post('/login', UserController_1.login);
router.get("/get-all-Properties", AdminController_1.getAllProperties);
exports.default = router;
