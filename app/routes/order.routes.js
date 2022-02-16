const checkAuth = require('../middleware/check_auth');
module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');
    // Create a new Order
    app.post('/api/order', checkAuth, orders.placeNewOrder);
    // get orders of specific user
    app.get('/api/orders/:userId', checkAuth, orders.getOrderByUserId);

}