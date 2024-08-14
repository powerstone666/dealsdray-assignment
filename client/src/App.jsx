import { useEffect, useState } from "react";
import User from "./Dashboard/add";
import Employee from "./Dashboard/employee";
import Landing from "./Dashboard/landing";
import Login from "./login";
import Navbar from "./Navbar/navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from "axios";
import Update from "./Dashboard/update";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") || false);
    const [namee, setNamee] = useState(localStorage.getItem("namee") || '');
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", true);
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);
  return (
      <>
          <Navbar setIsAuthenticated={setIsAuthenticated} name={namee} isAuthenticated={isAuthenticated} />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/employeeList" element={<Employee />} />
                      <Route path="/add" element={<User />} />
                      <Route path="/update/:id" element={<Update/> }/>
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
          </>
        ) : (
                      <>
                          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setNamee={setNamee} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect unknown routes */}
          </>
        )}
      </Routes>
  </>
  );
}

export default App;
