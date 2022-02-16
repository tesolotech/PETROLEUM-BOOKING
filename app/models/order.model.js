const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    rate: { type: Number, required: true, default: 0 },
    vehicles_type: { type: String, required: true },
    total: {
        type: Number, default: function () {
            return (this.quantity * this.rate)
        }
    },
    discount: { type: Number, default: 0 },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }

}, {
    timestamps: true
});

mongoose.set('useFindAndModify', false);
const Order = mongoose.model('Order', OrderSchema);
exports.Order = Order;

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({ _id: id }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);

        })
    })
};

exports.placeNewOrder = (order) => {
    const orderObj = new Order(order);
    return orderObj.save();
}

exports.getOrdersByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        Order.find({ userId: userId }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}