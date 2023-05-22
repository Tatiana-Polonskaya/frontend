import React from "react";
import ReactDOM from "react-dom/client";

import "./fonts";
import "./styles/index.scss";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import AuthMiddleware from "./components/tools/AuthMiddleware";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AuthMiddleware>
                    <App />
                </AuthMiddleware>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
