"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AdminRoute_1 = __importDefault(require("./router/AdminRoute"));
const UserRoute_1 = __importDefault(require("./router/UserRoute"));
const indexRoute_1 = __importDefault(require("./router/indexRoute"));
const config_1 = require("./config/config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
//{force:true}
config_1.db.sync().then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
}).catch(err => {
    console.log(err);
});
app.set('views', path_1.default.join(__dirname, "..", 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use('/', indexRoute_1.default);
app.use('/users', UserRoute_1.default);
app.use('/admins', AdminRoute_1.default);
const port = 7070;
app.listen(port, () => {
    console.log(`Server Listening at port ${port}`);
});
