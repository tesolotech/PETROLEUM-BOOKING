var multer = require('multer');
var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
var upload = multer({ storage: storage })

exports.upload = upload;