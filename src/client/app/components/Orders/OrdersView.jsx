import React from 'react'

import "./OrdersView.scss";

export class OrdersView extends React.Component {
    componentDidMount() {
        this.fitSizeOfHeaderCellsToBodyCells();
    }

    componentDidUpdate() {
        this.fitSizeOfHeaderCellsToBodyCells();
    }

    fitSizeOfHeaderCellsToBodyCells() {
        const tableHeader = document.getElementById("ordersBoxTableHeader");
        const tableBody = document.getElementById("ordersBoxTableBody");
        const bodyLines = tableBody.getElementsByTagName("tr");

        if (!bodyLines || bodyLines.length === 0) {
            return;
        }

        const firstLine = bodyLines[0];

        const headerCells = tableHeader.getElementsByTagName("th");
        const bodyCells = firstLine.getElementsByTagName("td");

        for (let idx = 0; idx < bodyCells.length; idx++) {
            const bdyCell = bodyCells[idx];
            const hdrCell = headerCells[idx];
            const bdyCellRect = bdyCell.getBoundingClientRect();
            const cellWidth = bdyCellRect.right - bdyCellRect.left;
            hdrCell.style.width = cellWidth + "px";
        }
    }

    cancelOrder(orderId) {
        const { onCancelOrder } = this.props;
        onCancelOrder(orderId);
    }

    render() {
        const { orders } = this.props;

        return (
            <div id="orders">
                <div className="title">Open Orders</div>
                <div className="ordersBox">
                    <table className="marketBox marketBoxHeader">
                        <thead>
                        <tr id="ordersBoxTableHeader">
                            <th>Date</th>
                            <th>Type</th>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Limit</th>
                            <th>Exchange</th>
                            <th>Cancel</th>
                        </tr>
                        </thead>
                    </table>
                    <div className="scrollableTable">
                        <table className="marketBox marketBoxBody">
                            <tbody id="ordersBoxTableBody">
                            {
                                orders ? orders.map(order => {
                                    return (
                                        <tr key={`order-${order.orderId}`}>
                                            <td>{new Date(order.timestamp).toUTCString()}</td>
                                            <td>{order.type}</td>
                                            <td>{order.base}/{order.quote}</td>
                                            <td>{order.price}</td>
                                            <td>{order.amount}</td>
                                            <td>{order.limit}</td>
                                            <td>{order.exchange}</td>
                                            <td><button className="cancelOrderButton" onClick={() => this.cancelOrder(order.orderId)}>Cancel</button></td>
                                        </tr>
                                    );
                                }) : null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}