import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/LoginPage";
import DefaultPage from "./Pages/DefaultPage";
import PasswordRecovery from "./Pages/PasswordRecoveryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="DefaultPage" element={<DefaultPage />} />
      <Route path="PasswordRecovery" element={<PasswordRecovery />} />
      <Route path="Login" element={<Login />} />
    </Routes>
  );
};

export default App;
