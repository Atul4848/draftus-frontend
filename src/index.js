import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import configureStore from "./redux/Store";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
const store = configureStore(history);
const rootElement = document.getElementById("root");

/* ReactDOM.render(<App />, rootElement); */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
