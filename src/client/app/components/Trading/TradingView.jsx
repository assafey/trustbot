import React from 'react';

import "./TradingView.scss";
import {TradingPanel, OrderStopType} from "./TradingPanel";

export class TradingView extends React.Component {

    confirmOrder(order) {
        const { onOrderConfirmed, pairInfo } = this.props;
        const newOrder = Object.assign({}, order, pairInfo);
        onOrderConfirmed(newOrder);
    }

    render() {
        let { pairInfo } = this.props;
        pairInfo = pairInfo ? pairInfo : {};

        return (
            <div id="tradingView">
                <div className="tradingHeader">
                    <label className="tradingTitle">{pairInfo.base} <span className="exchangeName">[{pairInfo.exchange}]</span></label>
                    <div className="balanceView">You have: {pairInfo.amount} {pairInfo.base}</div>
                </div>
                <div className="panelsContainer">
                    <TradingPanel type={OrderStopType.LOW_STOP} balance={pairInfo.amount} onConfirm={(order) => this.confirmOrder(order)} />
                    <div className="separator" />
                    <TradingPanel type={OrderStopType.HIGH_STOP} balance={pairInfo.amount} onConfirm={(order) => this.confirmOrder(order)} />
                </div>
            </div>
        );
    }

}