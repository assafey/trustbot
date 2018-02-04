import React from 'react';
import {connect} from "react-redux";
import {PairInfoHeader} from "../PairInfoHeader/PairInfoHeader";
import {TradingView} from "../Trading/TradingView";
import {
    fetchOrders,
    fetchPairs,
    selectPair,
    cancelOrder,
    createOrder
} from "../../actions/tradingActions";

import "./Exchange.scss";
import {OrdersView} from "../Orders/OrdersView";
import {PairSelection} from "../PairSelection/PairSelection";

class Exchange extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedPair: null
        }
    }

    componentWillMount() {
        this.fetchAll();
        setInterval(() => this.fetchAll(), 5000);
    }

    fetchAll() {
        const { dispatch } = this.props;
        dispatch(fetchPairs());
        dispatch(fetchOrders());
    }

    componentWillUpdate(nextProps, nextState) {
        const nextPair = nextState.selectedPair;
        const currentPair = this.state.selectedPair;

        if (this.noSelectedPair(nextPair, currentPair) && this.existingPairInList(nextProps.pairs)) {
            this.selectPair(nextProps.pairs[0]);
        }
    }

    noSelectedPair(nextPair, currentPair) {
        return !nextPair && !currentPair;
    }

    existingPairInList(pairs) {
        return pairs && pairs.length > 0;
    }

    selectPair(pair) {
        const { dispatch } = this.props;
        dispatch(selectPair(pair));
        this.setState({selectedPair: pair});
    }

    cancelOrder(orderId) {
        const { dispatch } = this.props;
        dispatch(cancelOrder(orderId));
    }

    createOrder(order) {
        const { dispatch } = this.props;
        dispatch(createOrder(order));
    }

    render() {
        const {
            orders,
            pairs,
            selectedPair
        } = this.props;

        return (
            <main id="exchange">
                <div className="container">
                    <div className="twoSides">
                        <div className="left">
                            <PairInfoHeader pairInfo={selectedPair} />
                            <TradingView pairInfo={selectedPair} onOrderConfirmed={(order) => this.createOrder(order)} />
                        </div>
                        <div className="right">
                            <PairSelection pairs={pairs} onSelection={(pair) => this.selectPair(pair)} />
                        </div>
                    </div>
                    <OrdersView orders={orders} onCancelOrder={(orderId) => this.cancelOrder(orderId)} />
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    let {
        orders,
        pairs,
        selectedPair
    } = state.trading;

    return {
        orders: orders,
        pairs: pairs,
        selectedPair: selectedPair
    };
};

export default connect(mapStateToProps)(Exchange);