import { useState, useEffect } from "react";
import { Grid3x3, List, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";
import axios from "axios";

export default function SavedResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      setLoading(true);

      // await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      //   withCredentials: true,
      // });

      const res = await axios.get("http://127.0.0.1:8000/api/saved", {
        withCredentials: true,
      });

      const data = res.data.data || res.data;

      const transformed = data.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.resourceType,
        date: new Date(item.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        semester: item.semester?.toUpperCase() || "",
        author: "FSA Student",
        tags: [
          item.filiere?.toUpperCase(),
          item.module,
          item.academicYear,
        ].filter(Boolean),
        views: item.views,
        likes: item.likes,
        isLiked: item.isLiked,
        isBookmarked: true,
        driveLink: item.driveLink,
        description: item.description,
        campus: item.campus,
        color: "blue",
      }));

      setResources(transformed);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger vos ressources sauvegardées.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewIncrement = (id) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, views: r.views + 1 } : r))
    );
  };

  const handleLikeToggle = (id) => {
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
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto w-full px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Saved Resources
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              All your bookmarked academic materials in one place
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Resources Count */}
        {!loading && !error && (
          <p className="text-gray-600 mb-6">
            Showing {resources.length} resource
            {resources.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Resources Grid */}
        {!loading && !error && (
          <>
            {resources.length === 0 ? (
              <div className="text-center py-20">
                <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No saved resources yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Bookmark resources to see them appear here.
                </p>

                <Link
                  to="/feed"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse Resources
                </Link>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "w-full space-y-4"
                }`}
              >
                {resources.map((r) => (
                  <ResourceCard
                    key={r.id}
                    resource={r}
                    viewMode={viewMode}
                    onViewIncrement={handleViewIncrement}
                    onBookmarkToggle={handleBookmarkToggle}
                    onLikeToggle={handleLikeToggle}
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
