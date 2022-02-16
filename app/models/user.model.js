const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: { type: String, required: true },
    profile_pic: { type: String, lowercase: true },
    userRole: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false }

}, {
    timestamps: true
});

UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.userId = ret._id.toString();
        delete ret._id;
    },
});

mongoose.set('useFindAndModify', false);
const User = mongoose.model('User', UserSchema);
exports.User = User;

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);

        })
    })
};

exports.findByEmailId = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);

        })
    })
};

exports.createUser = (user) => {
    const userObj = new User(user);
    return userObj.save();
};

exports.getUserList = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .exec(function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
    });
};

exports.updateUserById = (userId, profilePic) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: userId }, { $set: { "profile_pic": profilePic } }, { new: true }).exec(function (error, res) {
            if (error) {
                reject(error);
            } else {
                resolve(res);
            }
        })
    });
}





