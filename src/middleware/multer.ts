import path, { join, extname as _extname } from "path";
import multer, { diskStorage } from "multer";




// Set The Storage Engine
export const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, "../../public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
                "-" +
                new Date().toISOString().replace(/:/g, "-") +
                _extname(file.originalname)
        );
    },
});


//Check File Type
export function checkFileType(file: any, cb: any) {
    //Allowed ext
    const filetypes = /jpeg|jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(_extname(file.originalname).toLowerCase());
    //Check mine
    const mimetype = filetypes.test(file.mimetype);
    console.log("file", {extname, mimetype}, file);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}
// Init Upload
export const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000000 },
    fileFilter: function (req, file: any, cb: any) {
        checkFileType(file, cb);
    },
}).single("image");
