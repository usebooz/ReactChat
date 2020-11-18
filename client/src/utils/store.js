import { createStore, applyMiddleware, compose } from "redux";

import { routerMiddleware } from "connected-react-router";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import createRootReducer from "../reducers";
import middlewares from "../middlewares";

import { history } from "./history";

const initialStore = {};
const persistConfig = {
  key: "reactchat",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["usersReducer"],
};

export const store = createStore(
  persistReducer(persistConfig, createRootReducer(history)),
  initialStore,
  compose(
    applyMiddleware(routerMiddleware(history), ...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
