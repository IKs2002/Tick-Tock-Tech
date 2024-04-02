import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Tabs from "../Componets/Tabs";
import "./DefaultPage.css";

const DefaultPage = () => {
  return (
      <div>
        <Header />
        <div className="App">
          <Tabs Tabprop/>
          <Outlet />
        </div>
      </div>
  );
};

export default DefaultPage;