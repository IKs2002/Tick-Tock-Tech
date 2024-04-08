import React, { useState, useEffect } from "react";
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

const DefaultPage = ({ user: initialUser }) => {
  const location = useLocation();
  const [user, setUser] = useState(initialUser); // State to store the user data

  // Update user state when initialUser prop changes
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  let Tabprop;
  // Set Tabprop based on whether the URL matches the pattern
  Tabprop = checkURLPatternEdit(location) ? "Edit" : "";
  if (Tabprop === "") {
    Tabprop = checkURLPatternView(location) ? "View" : "";
  }

  return (
    <div>
      {/* Pass the user name to the Header component */}
      <Header name={user.name} />
      <div className="App">
        {/* Pass the user role to the Tabs component */}
        <Tabs prop={Tabprop} role={user.role} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultPage;
