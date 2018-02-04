const OrdersService = require('../services/OrdersService');

class OrdersController {

    constructor(ordersService) {
        this._ordersService = ordersService;
    }

    async getOrders(req, res) {
        try {
            const result = await this._ordersService.getOrders();
            res.json(result);
        } catch (e) {
            res.status(500).json(e);
        }
    }

}

module.exports = OrdersController;