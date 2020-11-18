import React from "react";
import ReactDOM from "react-dom";

import { ConnectedRouter } from "connected-react-router";
import { history } from "./utils/history";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./utils/store";

import "./styles/custom.scss";

import Root from "./components/Root/Root.jsx";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Root />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);