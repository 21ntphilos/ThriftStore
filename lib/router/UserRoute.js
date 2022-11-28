"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.get('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('register', { title: 'Team Two || Campus Easy' });
}));
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('login');
}));
router.post('/signup', UserController_1.Register);
router.post('/verifyUser/:signature', UserController_1.VerifyUser);
router.post('/login', UserController_1.login);
exports.default = router;
