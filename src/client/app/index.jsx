import React from 'react';
import {render} from 'react-dom';
import App from "./App";
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {trading} from './reducers/tradingReducer';

import "./index.scss";

const store = createStore(combineReducers({
    trading: trading
}));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);