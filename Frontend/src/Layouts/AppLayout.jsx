import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";


export default function AppLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/me", { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <div className="flex-1 p-8 pl-72">
        <Outlet />
      </div>
    </div>
  );
}
