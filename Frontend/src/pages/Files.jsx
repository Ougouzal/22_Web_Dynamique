"use client";

import {
  FileText,
  Eye,
  Heart,
  Clock,
  Search,
  Grid,
  List,
  Plus,
  FolderOpen,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ResourceCard from "../components/ResourceCard"; // 🟦 IMPORTANT

export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalFiles: 0,
    totalViews: 0,
    totalLikes: 0,
    lastUpdate: "Never",
  });

  const [filters, setFilters] = useState({
    type: "All",
    module: "All",
    semester: "All",
    year: "All",
    sort: "Last modified",
  });

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 🟦 "grid" ou "list"

  // 🔵 Fonction pour convertir file → ResourceCard
  const convertToResourceCard = (file) => {
    return {
      id: file.id,
      title: file.title,
      type: file.resourceType || "File",
      color: "blue",
      date: new Date(file.created_at).toLocaleDateString(),
      author: file.user?.name || "Unknown",
      tags: [],
      semester: file.semester || null,
      driveLink: file.driveLink,
      views: file.views,
      likes: file.likes,
      isLiked: file.isLiked || false,
      isBookmarked: file.isBookmarked || false,
    };
  };

  // ------------------------------
  // 📡 LOAD DATA FROM API
  // ------------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/resources")
      .then((response) => response.json())
      .then((data) => {
        const items = data.data.data;

        setFiles(items);
        setLoading(false);

        // Stats -----
        let totalViews = items.reduce((sum, f) => sum + f.views, 0);
        let totalLikes = items.reduce((sum, f) => sum + f.likes, 0);
        let lastUpdate = items.length > 0 ? items[0].created_at : "Never";

        setStats({
          totalFiles: items.length,
          totalViews,
          totalLikes,
          lastUpdate,
        });
      })
      .catch((err) => {
        console.log("Erreur API :", err);
        setLoading(false);
      });
  }, []);

  // ------------------------------
  // 🔍 FILTER + SEARCH
  // ------------------------------
  let finalFiles = files.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (filters.type !== "All") {
    finalFiles = finalFiles.filter((f) => f.resourceType === filters.type);
  }
  if (filters.module !== "All") {
    finalFiles = finalFiles.filter((f) => f.module === filters.module);
  }
  if (filters.semester !== "All") {
    finalFiles = finalFiles.filter((f) => f.semester === filters.semester);
  }
  if (filters.year !== "All") {
    finalFiles = finalFiles.filter((f) => f.year == filters.year);
  }

  // SORT ----
  if (filters.sort === "Most viewed") finalFiles.sort((a, b) => b.views - a.views);
  if (filters.sort === "Most liked") finalFiles.sort((a, b) => b.likes - a.likes);
  if (filters.sort === "Newest first")
    finalFiles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (filters.sort === "Oldest first")
    finalFiles.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files</h1>
            <p className="text-gray-600">Manage all your files in one place</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 border rounded-lg transition ${
                viewMode === "grid"
                  ? "border-blue-600 text-blue-600 bg-blue-100"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <Grid size={20} />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 border rounded-lg transition ${
                viewMode === "list"
                  ? "border-blue-600 text-blue-600 bg-blue-100"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <List size={20} />
            </button>

            <Link
              to="/upload"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Share Link
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Files</p>
                <p className="text-2xl font-bold">{stats.totalFiles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Eye className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <Heart className="text-red-500" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Likes</p>
                <p className="text-2xl font-bold">{stats.totalLikes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Update</p>
                <p className="text-2xl font-bold">
                  {stats.lastUpdate === "Never"
                    ? "Never"
                    : new Date(stats.lastUpdate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search files by title or description..."
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
              className="px-4 py-2.5 border rounded-lg"
            >
              <option>Last modified</option>
              <option>Most liked</option>
              <option>Most viewed</option>
              <option>Newest first</option>
              <option>Oldest first</option>
            </select>
          </div>
        </div>

        {/* FILES LIST — AVEC ResourceCard */}
        {loading ? (
          <p className="text-center text-gray-500">Loading files...</p>
        ) : finalFiles.length === 0 ? (
          <div className="bg-white rounded-xl p-16 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
              <FolderOpen className="text-blue-600" size={64} />
            </div>
            <h2 className="text-2xl font-bold mb-3">No files yet</h2>
            <p className="text-gray-600 mb-8">
              Get started by sharing your first resource.
            </p>

            <Link
              to="/upload"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium mx-auto w-fit"
            >
              <Plus size={20} />
              Share Your First Resource
            </Link>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {finalFiles.map((file) => {
              const resource = convertToResourceCard(file);

              return (
                <ResourceCard
                  key={file.id}
                  resource={resource}
                  viewMode={viewMode}
                  onLikeToggle={() => {}}
                  onBookmarkToggle={() => {}}
                  onViewIncrement={() => {}}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
