"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Eye,
  Bookmark,
  Package,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";

export default function ResourceFeed() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Charger les ressources
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/resources");
      const result = await response.json();

      if (result.success) {
        const localLikes = JSON.parse(localStorage.getItem("likes") || "{}");
        const localBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");

        const transformedData = result.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.resourceType,
          date: new Date(item.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          semester: item.semester?.toUpperCase() || "",
          author: item.user?.name || "FSA User",
          tags: [
            item.filiere?.toUpperCase(),
            item.module,
            item.academicYear,
          ].filter(Boolean),
          views: item.views,
          likes: localLikes[item.id] ?? item.likes,
          isLiked: localLikes[item.id] !== undefined,
          isBookmarked: !!localBookmarks[item.id],
          color: "blue",
          driveLink: item.driveLink,
          description: item.description,
          campus: item.campus,
        }));

        setResources(transformedData);
      } else {
        setError("Erreur lors de la récupération des ressources");
      }
    } catch (err) {
      console.error("Erreur API:", err);
      setError("Impossible de charger les ressources");
    } finally {
      setLoading(false);
    }
  };

  // Filtrage et tri
  const filteredResources = resources
    .filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .filter((resource) =>
      activeTab === "bookmarked" ? resource.isBookmarked : true
    )
    .sort((a, b) => (activeTab === "mostViewed" ? b.views - a.views : 0));

  // Handlers persistants en localStorage
  const handleViewIncrement = (id) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, views: r.views + 1 } : r))
    );
  };

  const handleLikeIncrement = (id) => {
    const currentLikes = JSON.parse(localStorage.getItem("likes") || "{}");

    if (currentLikes[id] !== undefined) {
      delete currentLikes[id];
    } else {
      currentLikes[id] = true;
    }

    localStorage.setItem("likes", JSON.stringify(currentLikes));

    setResources((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              isLiked: !r.isLiked,
              likes: r.isLiked ? r.likes - 1 : r.likes + 1,
            }
          : r
      )
    );
  };

  const handleBookmarkToggle = (id) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");

    if (bookmarks[id]) {
      delete bookmarks[id];
    } else {
      bookmarks[id] = true;
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    setResources((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Resource Feed
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Discover resources shared by the FSA (Faculté des Sciences Agadir) community
            </p>
          </div>
          <Link
            to="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add New Resource
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, description or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2.5 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 md:gap-6 border-b border-gray-200 w-full md:w-auto overflow-x-auto">
            {[
              { key: "all", label: "All Resources", icon: Package },
              { key: "bookmarked", label: "Bookmarked", icon: Bookmark },
              { key: "mostViewed", label: "Most Viewed", icon: Eye },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Resources */}
        {!loading && !error && (
          <>
            {filteredResources.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Be the first to share a resource!"}
                </p>
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add New Resource
                </Link>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }`}
              >
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onViewIncrement={handleViewIncrement}
                    onBookmarkToggle={handleBookmarkToggle}
                    onLikeToggle={handleLikeIncrement}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
