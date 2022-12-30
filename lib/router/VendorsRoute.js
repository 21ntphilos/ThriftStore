"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VendorController_1 = require("../controller/VendorController");
const router = express_1.default.Router();
router.post('/register', VendorController_1.VendorRegister);
router.post('/login', VendorController_1.vendorLogin);
exports.default = router;
