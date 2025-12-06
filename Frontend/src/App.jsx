import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileSettings from "./pages/ProfileSettings";
import Upload from "./pages/Upload";
import Feed from "./pages/Feed";
import AppLayout from "./Layouts/AppLayout";
// import {checkAuth} from "./api/CheckAuth";
import ProtectedRoute from "./components/ProtecteRoute";
import Saved from "./pages/Saved";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/home";
import Files from "./pages/Files";
import Users from "./pages/Users";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />{" "}
          {/* "/" */}
          <Route path="feed" element={<Feed />} /> {/* "/feed" */}
          <Route path="dashboard" element={<Dashboard />} /> {/* "/upload" */}
          <Route path="profile" element={<ProfileSettings />} />{" "}
          <Route path="files" element={<Files />} />{" "}
          <Route path="users" element={<Users />} />{" "}
          {/* "/profile" */}
          <Route path="upload" element={<Upload />} /> {/* "/upload" */}
          <Route
            path="saved"
            element={<ProtectedRoute> {<Saved />} </ProtectedRoute>}
          />{" "}
          {/* "/upload" */}
        </Route>
      </Routes>
    </Router>
  );
}
