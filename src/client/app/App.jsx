import React from 'react';
import {Route} from "react-router-dom";
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import {PageHeader} from "./components/PageHeader/PageHeader";
import {PageFooter} from "./components/PageFooter/PageFooter";
import Exchange from "./components/Exchange/Exchange";

import "./App.scss";

class App extends React.Component {
    render () {
        return (
            <div className="routes">
                <PageHeader/>
                <Route exact path="/" component={Exchange}/>
                <PageFooter/>
            </div>
        );
    }
}

export default withRouter(connect()(App));