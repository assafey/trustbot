import {ActionTypes} from "./ActionTypes";

export const fetchOrders = () => {
    return {
        type: ActionTypes.FETCH_ORDERS
    }
};

export const fetchPairs = () => {
    return {
        type: ActionTypes.FETCH_PAIRS
    }
};

export const selectPair = (pair) => {
    return {
        pair: pair,
        type: ActionTypes.SELECT_PAIR
    }
};

export const cancelOrder = (orderId) => {
    return {
        orderId: orderId,
        type: ActionTypes.CANCEL_ORDER
    }
};

export const createOrder = (order) => {
    return {
        order: order,
        type: ActionTypes.CREATE_ORDER
    }
};
