import {ActionTypes} from "../actions/ActionTypes";

const initialState = {
    orders: [],
    pairs: [],
    selectedPair: null
};

export const trading = (state, action) => {
    const actionsMap = {
        [ActionTypes.FETCH_ORDERS]: fetchOrders,
        [ActionTypes.FETCH_PAIRS]: fetchPairs,
        [ActionTypes.SELECT_PAIR]: selectPair,
        [ActionTypes.CANCEL_ORDER]: cancelOrder,
        [ActionTypes.CREATE_ORDER]: createOrder,
    };

    if (action.type in actionsMap) {
        return actionsMap[action.type](state, action);
    } else {
        return Object.assign({}, state, initialState);
    }
};

const fetchOrders = (state) => {
    return Object.assign({}, state, {
        orders: [
            {
                orderId: 1,
                timestamp: new Date().getTime(),
                type: "Low",
                base: "ETH",
                quote: "BTC",
                price: "0.091",
                amount: "0.24",
                limit: "0.090",
                exchange: "Bittrex"
            },
            {
                orderId: 2,
                timestamp: new Date().getTime(),
                type: "High",
                base: "ETH",
                quote: "BTC",
                price: "0.091",
                amount: "0.24",
                limit: "0.092",
                exchange: "Bittrex"
            },
        ]
    });
};

const fetchPairs = (state) => {
    return Object.assign({}, state, {
        pairs: [
            {
                base: "ETH",
                quote: "BTC",
                price: "0.091",
                amount: "1.2",
                btc: "0.15",
                last: "11,492.70",
                change24h: "-0.36%",
                high24h: "11,890.30",
                low24h: "10,546.22",
                volume24h: "380,993,348.93",
                exchange: "Bittrex"
            },
            {
                base: "XMR",
                quote: "BTC",
                price: "0.0271",
                amount: "2.4",
                btc: "0.614",
                last: "11,492.70",
                change24h: "+1.24%",
                high24h: "11,890.30",
                low24h: "10,546.22",
                volume24h: "380,993,348.93",
                exchange: "Binance"
            },
        ]
    });
};

const selectPair = (state, action) => {
    const { pair } = action;
    return Object.assign({}, state, {
        selectedPair: pair
    });
};

const cancelOrder = (state, action) => {
    const { orders } = state;
    return Object.assign({}, state, {
        orders: orders.filter(order => order.orderId !== action.orderId)
    });
};

const createOrder = (state, action) => {
    let { order } = action;
    const { orders } = state;

    order.orderId = orders.length + 1;

    return Object.assign({}, state, {
        orders: orders.concat([order])
    });
};