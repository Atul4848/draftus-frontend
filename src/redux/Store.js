import { applyMiddleware, createStore, compose } from "redux";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers/index";

const config = { blacklist: ["SET_PRODUCT_DETAILS"] };

export default function configureStore(history) {
  //Init middlewares
  const middleware = routerMiddleware(history);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  //Init enhancer
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, middleware, createStateSyncMiddleware(config))
  );

  //Store creation
  const store = createStore(rootReducer(history), {}, enhancer);
  initStateWithPrevTab(store);

  return store;
}
