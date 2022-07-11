import React from "react";

import "./App.css";
import Search from "./components/UI/Search";
import Header from "./components/UI/Header";
import SidebarData from "./components/SideBar/SidebarData";

import instance from "axios";

const App = () => {
  return (
    <div className="container">
      <SidebarData />
    </div>
  );
};

export default App;
