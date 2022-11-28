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
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('index', { title: 'Team Two || Campus Easy' });
}));
router.get("/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('contact');
}));
router.get("/shop", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('shop');
}));
router.get("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('product');
}));
router.get("/addproduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('addproduct');
}));
router.get("/adminaccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('adminaccount');
}));
router.get("/addproduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('addproduct');
}));
router.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('login');
}));
exports.default = router;
