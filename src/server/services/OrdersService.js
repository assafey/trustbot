class OrdersService {
    constructor() {

    }

    getOrders() {
        return [
            {
                orderId: 1,
                timestamp: new Date().getTime(),
                type: "Low",
                asset: "ETH",
                price: "0.091",
                amount: "0.24",
                limit: "0.090",
                exchange: "Bittrex"
            },
            {
                orderId: 1,
                timestamp: new Date().getTime(),
                type: "High",
                asset: "ETH",
                price: "0.091",
                amount: "0.24",
                limit: "0.092",
                exchange: "Bittrex"
            },
        ]
    }
}