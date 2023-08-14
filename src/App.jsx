import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PublicRoute from './Routes/PublicRoutes';
import PrivateRoute from './Routes/PrivateRoutes'


function App() {
  return (
    <Router>
      <div className="App">
        {localStorage.getItem("token") ? <PrivateRoute /> : <PublicRoute />}
      </div>
    </Router>
  );
}

export default App;
