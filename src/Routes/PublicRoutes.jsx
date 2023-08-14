import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../screens/login/Login";
import SignUp from "../screens/signup/SignUp";

function PublicRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default PublicRoute;