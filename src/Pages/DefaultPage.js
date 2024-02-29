import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Tabs from "../Componets/Tabs";
import "./DefaultPage.css";

const DefaultPage = () => {
  return (
    <body>
      <div>
        <Header />
        <body className="App">
          <Tabs />
          <Outlet />
        </body>
      </div>
    </body>
  );
};

export default DefaultPage;