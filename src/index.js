/*!

=========================================================
* Material Dashboard PRO React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
// import io from 'socket.io-client'

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
import ConnectionContextProvider from "context/connectionContext/connectionContext";

// const socket = io()

// socket.on("connection", () => {
//   // either with send()
//   socket.send("connection");
//   console.log('emiting event')
//   // or with emit() and custom event names
//   socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
// });



ReactDOM.render(
  <BrowserRouter>
    <ConnectionContextProvider>
      <Switch>
        <Route path="/rtl" component={RtlLayout} />
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </ConnectionContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
