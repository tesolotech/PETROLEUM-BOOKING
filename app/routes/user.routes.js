
const checkAuth = require('../middleware/check_auth');

// const upload = require('../middleware/file_upload_multer');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
var upload = multer({
    storage: storage, limits: { fileSize: process.env.PROFILE_PIC_SIZE }
})

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    // Create a new User
    app.post('/api/signup', users.signupUser);
    // Login user
    app.post('/api/login', users.loginUser);
    // get all user list
    app.get('/api/users', checkAuth, users.GetAllUser);
    // upload profile pic
    app.post('/api/uploadFiles', upload.array('profile', { maxCount: 1 }), users.uploadProfilePic);
}

