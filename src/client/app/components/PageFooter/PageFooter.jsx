import React from 'react';

import './PageFooter.scss';

export class PageFooter extends React.Component {

    render() {
        return (
            <footer id="pageFooter">
                <div className="all-rights light-text">
                    &copy; All right reserved to TrustBot Inc.
                </div>
            </footer>
        );
    }
}