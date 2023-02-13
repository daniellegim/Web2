const Order = require('../models/order');
const {sendMessageToClients} = require("../service/socket");

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
    createOrder: async (req, res) => {
        let newOrder = req.body;

        let id = Math.round(Math.random() * (99999 - 9999));

        newOrder.Id = id;
        const order = new Order(newOrder);
        const orders = await Order.find({});

        order.save(newOrder).then(() => {
             res.send(newOrder);
            Order.find({}).then((orders) => {
                sendMessageToClients('orders_update', orders)
            })
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                error
            });
        });
    },
    getOrder: (req, res) => {
        const {orderId} = req.params;

        Order.findById(orderId).then((order) => {
            res.status(200).json({
                order
            });
        }).catch((error) => {
            res.status(500).json({
                error
            });
        });
    },
    deleteOrder: (req, res) => {
        const {orderId} = req.params;

        Order.remove({Id: orderId}).then(() => {
            res.send(orderId);
        }).catch((error) => {
            res.status(500);
        });
    },
    searchOrders: (req, res) => {
        const {name} = req.query;
        const regexp = new RegExp(name);

        Order.find({Id: regexp}).then((orders) => {
            res.send(orders);
        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
    },
    getOrdersByUser: (req, res) => {
        const {phoneNumber} = req.query;
        const regexp = new RegExp(phoneNumber);

        Order.find({PhoneNumber: phoneNumber}).then((orders) => {
            res.send(orders);
        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
    },
    updateOrder: (req, res) => {
        const {orderId} = req.params;
        const updatedOeder = {Id: orderId, ...req.body};
        Order.update({Id: orderId}, req.body).then(() => {
            res.send(updatedOeder);
        }).catch((error) => {
            res.status(500).json({
                error
            });
        });
    }
};
