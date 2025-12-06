"use client"

import { useState } from "react"
import { Eye, Heart, Calendar, ExternalLink, Bookmark } from "lucide-react"

export default function ResourceCard({ resource, onViewIncrement, onBookmarkToggle, onLikeToggle, viewMode = "grid" }) {
  const [localViews, setLocalViews] = useState(resource.views)
  const [localLikes, setLocalLikes] = useState(resource.likes)
  const [isLiked, setIsLiked] = useState(resource.isLiked)
  const [isBookmarked, setIsBookmarked] = useState(resource.isBookmarked || false)

  const typeColors = {
    pink: "bg-pink-600",
    blue: "bg-blue-600",
  }

  const handleOpenResource = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/resources/${resource.id}/increment-views`, {
        method: "POST"
      })

      if (res.ok) {
        const data = await res.json()
        const newViews = data.views ?? localViews + 1
        setLocalViews(newViews)
        if (onViewIncrement) onViewIncrement(resource.id)
      } else {
        setLocalViews((v) => v + 1)
      }
    } catch (err) {
      console.error("Erreur lors de l'incrémentation des vues :", err)
      setLocalViews((v) => v + 1)
    }

    window.open(resource.driveLink, "_blank")
  }

  const handleLike = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/resources/${resource.id}/like`, {
        method: "POST",
      })
      if (res.ok) {
        const data = await res.json()
        setLocalLikes(data.likes)
        setIsLiked(data.isLiked)
        if (onLikeToggle) onLikeToggle(resource.id)
      }
    } catch (err) {
      console.error("Erreur lors du like :", err)
    }
  }

  const handleBookmark = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/resources/${resource.id}/bookmark`, {
        method: "POST"
      })
      if (res.ok) {
        const data = await res.json()
        setIsBookmarked(data.isBookmarked)
        if (onBookmarkToggle) onBookmarkToggle(resource.id, data.isBookmarked)
      }
    } catch (err) {
      console.error("Erreur lors du bookmark :", err)
    }
  }

  /**
   * MODE LIST
   */
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow w-full">
        <div className="flex flex-col md:flex-row">
          
          {/* Bande gauche colorée */}
          <div className={`${typeColors[resource.color]} px-6 py-4 md:w-64 flex-shrink-0`}>
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-sm opacity-90 mb-3">{resource.type}</p>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {localViews}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {localLikes}
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                  {resource.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{resource.author}</p>
                  <p className="text-xs text-gray-500">{resource.date}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-lg transition-colors hover:bg-gray-100 ${
                    isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>

                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-colors hover:bg-gray-100 ${
                    isBookmarked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.map((tag, index) => (
                <span key={index} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer list */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              {resource.semester && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                  {resource.semester}
                </span>
              )}

              <button
                onClick={handleOpenResource}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * MODE GRID
   */
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">

      {/* Header */}
      <div className={`${typeColors[resource.color]} px-4 py-3 flex items-center justify-between text-white`}>
        <span className="font-medium text-sm">{resource.type}</span>

        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {localViews}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> {localLikes}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">

        {/* Title + buttons */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-lg font-bold text-green-600 line-clamp-2 flex-1">{resource.title}</h3>

          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className={`p-1 rounded transition-colors hover:bg-gray-100 ${
                isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className="w-4 h-4" />
            </button>

            <button
              onClick={handleBookmark}
              className={`p-1 rounded transition-colors hover:bg-gray-100 ${
                isBookmarked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Calendar className="w-4 h-4" />
          <span>{resource.date}</span>

          {resource.semester && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
              {resource.semester}
            </span>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
            {resource.author.charAt(0)}
          </div>
          <span className="text-sm text-gray-700">{resource.author}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags?.map((tag, index) => (
            <span key={index} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {localViews}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {localLikes}
            </span>
          </div>

          <button
            onClick={handleOpenResource}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </button>
        </div>

      </div>
    </div>
  )
}
