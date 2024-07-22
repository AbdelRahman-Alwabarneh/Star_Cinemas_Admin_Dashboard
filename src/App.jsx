import { useState } from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import LogIn from "./Component/LogIn/LogIn";
import AddAdmin from "./Component/AddAdmin/AddAdmin";
import Events from "./Component/Events/Events";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./Component/Contacts/Contacts";
import Error404 from "./Component/Error404/Error404";
import Orders from "./Component/Orders/Orders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
