import React from 'react';

import './PageHeader.scss';

export class PageHeader extends React.Component {
    render() {
        return (
            <header id="pageHeader">
                <div className="logo" />
                <div className="title">TrustBot</div>
            </header>
        );
    }
}