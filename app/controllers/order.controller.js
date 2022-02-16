const Orders = require('../models/order.model.js');

exports.placeNewOrder = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({ error: "you can't submit empty!!" });
    }
    if (!req.body.type) {
        return res.status(400).send({ error: "Type is required!!" });
    }
    if (!req.body.quantity) {
        return res.status(400).send({ error: "Quantity is required!!" });
    }

    if (!req.body.rate) {
        return res.status(400).send({ error: "Rate is required!!" });
    }
    if (!req.body.vehicles_type) {
        return res.status(400).send({ error: "Vehicles type is required!!" });
    }
    if (!req.body.userId) {
        return res.status(400).send({ error: "User id is required!!" });
    }

    Orders.placeNewOrder(req.body).then(reslut => {
        res.status(200).json({ status: 200, message: 'Order successfully Placed..', data: reslut });
    }).catch(error => {
        res.status(500).json({ status: 500, error: error });
    })
}

exports.getOrderByUserId = (req, res, next) => {
    console.log(req.params);
    Orders.getOrdersByUserId(req.params.userId).then(reslut => {
        res.status(200).json({ status: 200, message: 'SUCCESS', data: reslut });
    }).catch(error => {
        res.status(500).json({ status: 500, error: error });
    })
}