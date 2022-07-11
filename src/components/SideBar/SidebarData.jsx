import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Butterflies from "./Butterflies";
import Cars from "./Cars";
import CellPhones from "./CellPhones";
import { useState, useEffect } from "react";
import Offices from "./Offices";
import instance from "./axios";

export default function SidebarExample() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get("/Butterfly");
      setItems(request.data);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Router>
        <div className="sideBar">
          <ul>
            <li>
              <Link to="/Butterflies">ButterFlies</Link>
            </li>
            <li>
              <Link to="/Cars">Cars</Link>
            </li>
            <li>
              <Link to="/CellPhones">CellPhones</Link>
            </li>

            <li>
              <Link to="/Offices">Offices</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/*" element={<Butterflies />}></Route>

            <Route path="/Butterflies" element={<Butterflies />}></Route>
            <Route path="/Cars" element={<Cars />}></Route>
            <Route path="/CellPhones" element={<CellPhones />}></Route>
            <Route path="/Offices" element={<Offices />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
