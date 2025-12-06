// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Upload,
  FileText,
  Bookmark,
  User,
  LogOut,
  GraduationCap,
  Rss,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Récupérer les infos utilisateur au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Erreur parsing user:", error);
      }
    }
  }, []);

  // 🔄 Écouter les changements du localStorage pour mettre à jour en temps réel
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error("Erreur parsing user:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Écouter aussi les changements personnalisés
    window.addEventListener("userUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Fonction pour obtenir les initiales
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const menuItems = [
    { name: "Feed", icon: <Rss />, path: "/feed" },
    // { name: "Dashboard", icon: <Home />, path: "/dashboard" },
    { name: "Upload", icon: <Upload />, path: "/upload" },
    { name: "Stats", icon: <FileText />, path: "/files" },
    { name: "Saved", icon: <Bookmark />, path: "/saved" },
    { name: "My Profile", icon: <Settings />, path: "/profile" },
    { name: "Users", icon: <User />, path: "/users" },
  ];

  return (
    <div className="fixed left-0 top-0 w-72 bg-white shadow-xl h-screen flex flex-col z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white px-4 py-4 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-blue-800/10"></div>
        <div className="relative flex items-center space-x-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">ReShare</h1>
            <p className="text-xs text-blue-100 font-medium">Resource Sharing</p>
          </div>
        </div>
      </div>

      {/* User Info - AVEC IMAGE DE PROFIL */}
      <div className="px-4 py-3 flex items-center space-x-3 border-b border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 flex-shrink-0">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-100 flex-shrink-0 overflow-hidden">
          {user?.profile_picture ? (
            <img
              src={`http://127.0.0.1:8000/${user.profile_picture}`}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Si l'image ne charge pas, afficher les initiales
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center text-lg font-bold ${
              user?.profile_picture ? 'hidden' : 'flex'
            }`}
          >
            {user ? getInitials(user.name) : "U"}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gray-900 text-sm truncate">
            {user ? user.name : "Utilisateur"}
          </h2>
          <p className="text-xs text-gray-600 truncate">
            {user ? user.email : "email@example.com"}
          </p>
        </div>
        <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex-shrink-0">
          {user?.role === "professor" ? "Professor" : "Student"}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <span
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  location.pathname === item.path ? "" : "text-blue-600"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.name}</span>

              {location.pathname === item.path && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer - Sign Out */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 border-t border-blue-100 flex-shrink-0">
        <button
          className="w-full flex items-center justify-center space-x-2 bg-white text-blue-700 border-2 border-blue-200 rounded-lg py-2.5 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-semibold shadow-sm group text-sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}