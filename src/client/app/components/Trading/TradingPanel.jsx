import React from 'react';

import "./TradingPanel.scss";

export const OrderStopType = {
    HIGH_STOP: "High",
    LOW_STOP: "Low"
};

const FIXED_DIGITS = 8;

export class TradingPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            stop: "",
            limit: "",
            amount: ""
        };
    }

    confirm(type) {
        const { onConfirm } = this.props;
        const { stop, limit, amount } = this.state;

        onConfirm({
            type,
            stop,
            limit,
            amount
        });
    }

    calculateTotal(amount, limit) {
        return amount && limit ? this.fixed(amount * limit) : "";
    }

    setAmount(percent) {
        const { balance } = this.props;
        this.setState({amount: this.fixed((percent / 100.0) * balance)});
    }

    fixed(numStr) {
        if (!numStr || isNaN(numStr)) {
            return "";
        }

        numStr = numStr.toString();

        const dotIndex = numStr.indexOf(".");
        if (dotIndex >= 0 && numStr.substring(dotIndex + 1).length > FIXED_DIGITS) {
            const multiplier = 10.0 * FIXED_DIGITS;
            return Math.floor(parseFloat(numStr) * multiplier) / multiplier;
        }

        return numStr;
    }

    render() {
        const { type } = this.props;
        const { stop, limit, amount } = this.state;

        return (
            <div className="tradingPanel">
                <span className="title">{type === OrderStopType.LOW_STOP ? "Low Stop" : "High Stop"}</span>
                <table className="detailsBox">
                    <tbody>
                        <tr>
                            <td><label>Stop:</label></td>
                            <td><input type="text" value={stop} onChange={(ev) => this.setState({stop: ev.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Limit:</label></td>
                            <td><input type="text" value={limit} onChange={(ev) => this.setState({limit: ev.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Amount:</label></td>
                            <td><input type="text" value={amount} onChange={(ev) => this.setState({amount: ev.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><label>Total:</label></td>
                            <td><input type="text" value={this.calculateTotal(amount, limit)} disabled={true} /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttons">
                    <ul className="tradingPercentSelection">
                        <li><button onClick={() => this.setAmount(25)}>25%</button></li>
                        <li><button onClick={() => this.setAmount(50)}>50%</button></li>
                        <li><button onClick={() => this.setAmount(75)}>75%</button></li>
                        <li><button onClick={() => this.setAmount(100)}>100%</button></li>
                    </ul>
                    <button className="tradeButton" onClick={() => this.confirm(type)}>Confirm</button>
                </div>
            </div>
        )
    }
}