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
exports.vendorLogin = exports.VendorRegister = void 0;
const Vendor_1 = require("../model/Vendor");
const utils_1 = require("../utilities/utils");
const uuid_1 = require("uuid");
const VendorRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, Password, confirm_password, Name, vendorphone } = req.body;
        const id = (0, uuid_1.v4)();
        const validateUser = utils_1.VendorRegisterSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            return res.status(400).json({
                Error: validateUser.error.details[0].message
            });
        }
        const salt = yield (0, utils_1.GenerateSalt)();
        const userPassword = yield (0, utils_1.GeneratePassword)(Password, salt);
        //         //check if user exists
        const User = yield Vendor_1.VendorInstance.findOne({ where: { email: email } });
        if (!User) {
            let user = yield Vendor_1.VendorInstance.create({
                id: id,
                email,
                Password: userPassword,
                Name,
                isSuspended: false,
                flags: 0,
                vendorphone,
                salt: salt,
                isAvailable: true
            });
            //             //check if user exists in db, if yes give him jwt signature
            const Vendor = yield Vendor_1.VendorInstance.findOne({ where: { email: email } });
            let signature = yield (0, utils_1.GenerateSignature)({
                id: Vendor.id,
                email: Vendor.email,
                isSuspended: Vendor.isSuspended,
            });
            return res.status(201).json({
                message: "Vendor created sucessfully",
                signature,
                User
            });
        }
        return res.status(400).json({
            message: "Vendor already exists"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            Error: "Internal server error",
            route: "/campusex/register"
        });
    }
});
exports.VendorRegister = VendorRegister;
const vendorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validateUser = utils_1.loginSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            return res.status(400).json({
                Error: validateUser.error.details[0].message
            });
        }
        const User = yield Vendor_1.VendorInstance.findOne({ where: { email: email } });
        if (User) {
            const validation = yield (0, utils_1.validatePassword)(password, User.Password);
            if (validation) {
                let signature = yield (0, utils_1.GenerateSignature)({
                    id: User.id,
                    isSuspended: User.isSuspended,
                    isAvailable: User.isAvailable,
                });
                return res.status(200).json({
                    message: "You have sucessfully logged in as a Vendor",
                    signature,
                    email: User.email,
                    isSuspended: User.isSuspended,
                    isAvailable: User.isAvailable
                });
            }
        }
        return res.status(400).json({
            Error: "Wrong Email or password"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            Error: "Internal server error",
            route: "/vendor/login"
        });
    }
});
exports.vendorLogin = vendorLogin;
// export const uploadProduct=async(req: Request, res: Response)=>{
//     try {
//         const id = req.user?.id as string;
//         // const joiValidateUpload = uploadSchema.validate(req.body, option);
//         const imagepath = req.file?.path as string;
//         const image = `${envsecret.FILE_HOST}${imagepath.split('/public')[1]}`
//         const { ProductName, Description, Price, vendor_id} = req.body;
//         // if(joiValidateUpload.error){
//         //     return res.status(400).json({
//         //         Error: joiValidateUpload.error.details[0].message
//         //     })
//         // }
//         const productid = uuidv4()
//         const User = await UserInstance.findOne({where:{id: id}})
//         // console.log(User);
//         if(User){
//             let product = await ProductInstance.create({
//                 product_id: productid,
//                 ProductName,
//                 image: image,
//                 Description,
//                 Price,
//                 vendor_id: id,
//                 active: true,
//             })
//             return res.status(201).json({
//                 message: "Product created sucessfully",
//                 product
//             })
//         }
//         return res.status(400).json({
//             message: "You are not authorized"
//         })
//     } catch (error:any) {
//         console.log(error)
//         return res.status(500).json({
//             Error: error?.message,
//             route: "/campusex/upload-product"
//         })
//     }
// }
// export const editProduct=async(req: JwtPayload, res: Response)=>{
//     try {
//         const id = req.user.id
//         const product_id = req.params.id
//         // const image = req.file.path;
//         const { ProductName, Description, Price, image} = req.body;
//         const joiValidateUpload = editSchema.validate(req.body, option)
//         if(joiValidateUpload.error){
//             return res.status(400).json({
//                 Error: joiValidateUpload.error.details[0].message
//             })
//         }
//         const User = await UserInstance.findOne({where:{id}}) 
//         if(!User){
//             return res.status(400).json({
//                 Error: "You are not authorized to update this product"
//             })
//         }
//         const updateProduct = await ProductInstance.update({
//             ProductName, Description, Price, image: req.file.path
//         }, {where: {product_id}}) as unknown as UploadModel;
//         if(updateProduct){
//             const product = await ProductInstance.findOne({where:{product_id}}) as unknown as UploadModel;
//             return res.status(200).json({
//                 message: "You have successfully updated your product",
//                 product
//             })
//         }
//         return res.status(400).json({
//             Error: "There's an error"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             Error: "Internal server error",
//             route: "/campusex/edit-product"
//         })
//     }
// }
// export const deleteProduct=async(req: JwtPayload, res: Response)=>{
//     try {
//         const product_id = req.params.id
//         const id = req.user.id
//         const User = await UserInstance.findOne({where:{id}}) 
//         if(!User){
//             return res.status(400).json({
//                 Error: "You are not authorized to delete this product"
//             })
//         }
//         const deletedProduct = await ProductInstance.destroy( {where: {product_id}}) as unknown as UploadModel;
//             return res.status(200).json({
//                 message: "You have successfully deleted this product",
//                 deletedProduct
//             })
//     } catch (error) {
//         return res.status(500).json({
//             Error: "Internal server error",
//             route: "/campusex/delete-product"
//         })
//     }
// }
// export const getAllProducts=async(req: Request, res: Response)=>{
//     try {
//         const limit = req.query.limit as number | undefined;
//     //     const users = await UserInstance.findAll({})
//     // return res.status(200).json({
//     //     message: "You have successfully retrieved all users",
//     //     users
//     // })
//     //instead of the findAll above, the findAndcountAll below may be 
//     //used to also return the count key in the json response
//     const Products = await ProductInstance.findAndCountAll({limit: limit});
//     return res.status(200).json({
//         message: "You have successfully retrieved all users",
//         count: Products.count,
//         users: Products.rows,
//     })
//     } catch (error) {
//         return res.status(500).json({
//             Error: "Internal server error",
//             route: "/campusex/get-all-users"
//         })
//     }
// }
// export const getProductById=async(req: JwtPayload, res: Response)=>{
//     try {
//         const {id} = req.user
//         const User = await ProductInstance.findOne({where:{vendor_id: id}}) as unknown as UploadModel
//         if(User){
//             return res.status(200).json({
//                 User
//             })
//         }
//         return res.status(400).json({
//             message: "User not found"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             Error: "Internal server error",
//             route: "/campusex/getsingleproduct"
//         })
//     }
// }
// function uuidv4() {
//     throw new Error('Function not implemented.');
// }
