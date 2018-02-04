import React from 'react';

import "./PairInfoHeader.scss";

export class PairInfoHeader extends React.Component {
    render() {
        let { pairInfo } = this.props;
        pairInfo = pairInfo ? pairInfo : {};

        return (
            <ul id="pairInfoHeader">
                <li className="item">
                    <div className="textBig">{pairInfo.base} / {pairInfo.quote}</div>
                </li>
                <li className="item">
                    <div className="textSmall">Last Price</div>
                    <div className="textMedium">{pairInfo.last}</div>
                </li>
                <li className="item">
                    <div className="textSmall">24h Change</div>
                    <div className="textMedium">{pairInfo.change24h}</div>
                </li>
                <li className="item">
                    <div className="textSmall">24h High</div>
                    <div className="textMedium">{pairInfo.high24h}</div>
                </li>
                <li className="item">
                    <div className="textSmall">24h Low</div>
                    <div className="textMedium">{pairInfo.low24h}</div>
                </li>
                <li className="item">
                    <div className="textSmall">24h Volume</div>
                    <div className="textMedium">{pairInfo.volume24h}</div>
                </li>
            </ul>
        );
    }
}