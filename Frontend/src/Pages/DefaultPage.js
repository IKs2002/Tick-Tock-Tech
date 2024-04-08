import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Tabs from "../Componets/Tabs";
import "./DefaultPage.css";

const checkURLPatternEdit = (location) => {
  const { pathname, search } = location;
  const pattern = /^\/Home\/TimesheetEdit\?email=[^&]+&name=[^&]+$/;
  return pattern.test(pathname + search);
};
const checkURLPatternView = (location) => {
  const { pathname, search } = location;
  const pattern = /^\/Home\/TimesheetViewing\?email=[^&]+&name=[^&]+$/;
  return pattern.test(pathname + search);
};

const DefaultPage = ({user}) => {
  const location = useLocation();
  console.log(user)
  let Tabprop
  // Set Tabprop based on whether the URL matches the pattern
  Tabprop = checkURLPatternEdit(location) ? "Edit" : "";
  if(Tabprop === "")
  {
    Tabprop = checkURLPatternView(location) ? "View" : "";
  }
  console.log(Tabprop);

  return (
      <div>
        <Header name={user.name}/>
        <div className="App">
          <Tabs prop={Tabprop}  role={user.role} />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default DefaultPage;
