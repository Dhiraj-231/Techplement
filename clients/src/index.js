import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js"
import { ToastContainer } from 'react-toastify';
ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer />
    </React.StrictMode>,
    document.getElementById("root")
);