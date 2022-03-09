import React, { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/barang/Show";
import Create from "./pages/barang/Create";
import Detail from "./pages/barang/Detail";
import Edit from "./pages/barang/Edit";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <NavbarComponent />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/show" element={<Show />} />
            <Route path="/create" element={<Create />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
