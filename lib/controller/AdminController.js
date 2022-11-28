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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProperties = exports.getAllVendors = exports.getAllUsers = exports.AdminRegister = exports.SuperAdminRegister = void 0;
const uuid_1 = require("uuid");
const UserModel_1 = require("../model/UserModel");
const utils_1 = require("../utilities/utils");
const propertyModel_1 = require("../model/propertyModel");
const Vendor_1 = require("../model/Vendor");
/**==============SUPER ADMIN REGISTRATION=============== */
const SuperAdminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, password, firstName, lastName, address } = req.body;
        //to create user Id from uuid
        const uuidAdmin = (0, uuid_1.v4)();
        const validateResult = utils_1.adminSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        //generate salt
        const salt = yield (0, utils_1.GenerateSalt)();
        //encrypt password
        const AdminPassword = yield (0, utils_1.GeneratePassword)(password, salt);
        //Generte OTP
        const { otp, expiry } = yield (0, utils_1.GenerateOTP)();
        //check if the admin exist
        const Admin = (yield UserModel_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (!Admin) {
            yield UserModel_1.UserInstance.create({
                id: uuidAdmin,
                email,
                password: AdminPassword,
                firstName,
                lastName,
                salt,
                address,
                phone,
                otp,
                otp_expiry: expiry,
                verified: true,
                role: "superadmin",
                isSuspended: false
            });
            const Admin = (yield UserModel_1.UserInstance.findOne({
                where: { email: email },
            })); //attributes comes from the User attribute
            //generate signature
            const signature = yield (0, utils_1.GenerateSignature)({
                id: Admin.id,
                email: Admin.email,
                isSuspended: Admin.isSuspended
            });
            //   console.log(signature)
            // return statement on creation of user
            return res.status(201).json({
                message: "Admin created Successfull",
                signature,
                verified: Admin.verified,
            });
        }
        // return statement if user exist
        return res.status(400).json({
            message: "Admin already exist",
        });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/admin/create-superadmin",
        });
    }
});
exports.SuperAdminRegister = SuperAdminRegister;
/**  ============================================== Create Admin ==================================== **/
const AdminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const { email, phone, password, firstName, lastName, address } = req.body;
        const uuidAdmin = (0, uuid_1.v4)();
        const validateResult = utils_1.adminSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        //generate salt
        const salt = yield (0, utils_1.GenerateSalt)();
        //encrypt password
        const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
        //Generte OTP
        const { otp, expiry } = yield (0, utils_1.GenerateOTP)();
        //check if the admin exist
        const Admin = (yield UserModel_1.UserInstance.findOne({
            where: { email: email },
        }));
        //create admin if not existing
        if (!Admin) {
            const superadmin = (yield UserModel_1.UserInstance.findOne({
                where: { id: id },
            }));
            if (superadmin.role === "superadmin") {
                //.role  === "superadmin")
                //to create admin u must add all the model properties
                yield UserModel_1.UserInstance.create({
                    id: uuidAdmin,
                    email,
                    password: userPassword,
                    firstName,
                    lastName,
                    salt,
                    address,
                    phone,
                    otp,
                    otp_expiry: expiry,
                    verified: true,
                    role: "admin",
                    isSuspended: false
                });
                const Admin = (yield UserModel_1.UserInstance.findOne({
                    where: { email: email },
                })); //attributes comes from the User attribute
                //generate signature
                const signature = yield (0, utils_1.GenerateSignature)({
                    id: Admin.id,
                    email: Admin.email,
                    isSuspended: Admin.isSuspended
                });
                //   console.log(signature)
                // return statement on creation of user
                return res.status(201).json({
                    message: "Admin Created Successfull",
                    signature,
                    verified: Admin.verified,
                });
            }
            return res.status(400).json({
                message: "Unauthorised",
            });
        }
        // return statement if user exist
        return res.status(400).json({
            message: "Admin Already Exist",
        });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/admin/CreateAdmin",
        });
    }
});
exports.AdminRegister = AdminRegister;
//********************* */ get all Users  *************************************/
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const admin = (yield UserModel_1.UserInstance.findOne({
            where: { id: id },
        }));
        if (admin) {
            const limit = req.query.limit;
            const users = yield UserModel_1.UserInstance.findAndCountAll({
                limit: limit,
            });
            return res.status(200).json({
                message: "you have succesfully retireved all users",
                count: users.count,
                Users: users.rows,
            });
        }
        return res.status(200).json({
            message: "unauthorised",
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "internal server error",
            Route: "/admin/get-all-users",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getAllVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const admin = (yield UserModel_1.UserInstance.findOne({
            where: { id: id },
        }));
        if (admin) {
            const limit = req.query.limit;
            const vendors = yield Vendor_1.VendorInstance.findAndCountAll({
                limit: limit,
            });
            return res.status(200).json({
                message: "you have succesfully retireved all vendors",
                count: vendors.count,
                Vendors: vendors.rows,
            });
        }
        return res.status(200).json({
            message: "unauthorised",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            Error: "internal server error",
            Route: "/admin/get-all-vendors",
        });
    }
});
exports.getAllVendors = getAllVendors;
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit;
        const property = yield propertyModel_1.propertyInstance.findAndCountAll({
            limit: limit,
        });
        return res.status(200).json({
            message: "you have succesfully retireved all vendors",
            count: property.count,
            Vendors: property.rows,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "internal server error",
            Route: "/admin/get-all-vendors",
        });
    }
});
exports.getAllProperties = getAllProperties;
