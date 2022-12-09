const Order = require('../models/order');

module.exports = {
    getAllOrders: async (req, res, next) => {
        try {
            const orders = await Order.find({});
            res.send(orders);
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    },
    createOrder: (req, res) => {
        let newOrder = req.body;

        let id = Math.round(Math.random() * (99999 - 9999));

        newOrder.Id = id;
        const order = new Order(newOrder);
        order.save(newOrder).then(() => {
             res.send(newOrder);
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                error
            });
        });
    }
};
