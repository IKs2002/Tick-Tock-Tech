import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Tabs from "../Componets/Tabs";
import "./DefaultPage.css";

const checkURLPattern = (location) => {
  const { pathname, search } = location;
  const pattern = /^\/Home\/TimesheetEdit\?email=[^&]+&name=[^&]+$/;
  return pattern.test(pathname + search);
};

const DefaultPage = () => {
  const location = useLocation();
  
  // Set Tabprop based on whether the URL matches the pattern
  const Tabprop = checkURLPattern(location) ? "Edit" : "";

  return (
      <div>
        <Header />
        <div className="App">
          <Tabs prop={Tabprop} />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default DefaultPage;
