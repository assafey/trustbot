import React from 'react'

import "./PairSelection.scss";

export class PairSelection extends React.Component {

    componentDidMount() {
        this.fitSizeOfHeaderCellsToBodyCells();
    }

    componentDidUpdate() {
        this.fitSizeOfHeaderCellsToBodyCells();
    }

    fitSizeOfHeaderCellsToBodyCells() {
        const tableHeader = document.getElementById("pairSelectionTableHeader");
        const tableBody = document.getElementById("pairSelectionTableBody");

        const bodyLines = tableBody.getElementsByTagName("tr");

        if (!bodyLines || bodyLines.length === 0) {
            return;
        }

        const firstLine = tableBody.getElementsByTagName("tr")[0];

        const headerCells = tableHeader.getElementsByTagName("th");
        const bodyCells = firstLine.getElementsByTagName("td");

        for (let idx = 0; idx < bodyCells.length; idx++) {
            const bdyCell = bodyCells[idx];
            const hdrCell = headerCells[idx];
            hdrCell.style.width = bdyCell.getBoundingClientRect().width + "px";
        }
    }

    isPositiveChange(change) {
        return change.indexOf("+") >= 0;
    }

    selectPair(pair) {
        const { onSelection } = this.props;
        onSelection(pair);
    }

    render() {
        const { pairs } = this.props;

        return (
            <div id="pairSelection">
                <div className="title">Balance</div>
                <table className="marketBox marketBoxHeader">
                    <thead>
                    <tr id="pairSelectionTableHeader">
                        <th>Pair</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>BTC</th>
                        <th>Exchange</th>
                    </tr>
                    </thead>
                </table>
                <div className="scrollableTable">
                    <table className="marketBox marketBoxBody">
                        <tbody id="pairSelectionTableBody">
                        {
                            pairs ? pairs.map(pair => {
                                return (
                                    <tr key={`pair-${pair.base}-${pair.quote}`} onClick={() => this.selectPair(pair)}>
                                        <td>{pair.base}/{pair.quote}</td>
                                        <td>{pair.price} <span className={this.isPositiveChange(pair.change24h) ? "positive" : "negative"}>({pair.change24h})</span></td>
                                        <td>{pair.amount}</td>
                                        <td>{pair.btc}</td>
                                        <td>{pair.exchange}</td>
                                    </tr>
                                );
                            }) : null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}