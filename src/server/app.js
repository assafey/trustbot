const express = require('express');
const app = express();

const OrdersController = require('./controllers/OrdersController');
const OrdersService = require('./services/OrdersService');
const ordersController = new OrdersController(new OrdersService());

app.use(express.static(__dirname + '/../client/public/dist'));

app.get('/', (req, res) => res.sendFile('index.html'));

app.get('/api/orders', (req, res) => ordersController.getOrders(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));