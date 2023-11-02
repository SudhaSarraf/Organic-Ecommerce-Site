const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb)=>cb(null, "files"),
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage,
    limits: 50*1025*1024,
    fileFilter:(req, file, cb)=>{
        var filetypes = /jpeg|jpg|png|pdf/;
        var mimetype = filetypes.test(file.mimetype);
        if (mimetype) return cb(null, true);
        cb("Error: File upload only supportes the "+ "following file types-"+filetypes);
    }
});

var fileUpload = upload.fields([
    {
        name: 'file',
        maxCount:1
    },
    {
        name: 'files',
        maxCount: 10
    }
]);

module.exports = fileUpload;