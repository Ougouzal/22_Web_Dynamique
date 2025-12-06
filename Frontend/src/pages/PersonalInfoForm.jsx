import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import axios from "axios";

export default function PersonalInfoForm({ userData, onUpdate }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger les données existantes
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setBio(userData.bio || "");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) {
      setError("Le nom est requis");
      return;
    }

    if (name.trim().length < 3) {
      setError("Le nom doit contenir au moins 3 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update-personal-info",
        {
          userId: userData.id,
          name: name.trim(),
          bio: bio.trim(),
        }
      );

      if (response.data.success) {
        setSuccess("✅ Informations personnelles mises à jour !");
        
        // Mettre à jour le localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Déclencher l'événement pour mettre à jour la sidebar
        window.dispatchEvent(new Event('userUpdated'));
        
        // Callback pour mettre à jour le parent
        if (onUpdate) {
          onUpdate(response.data.user);
        }

        // Effacer le message de succès après 3 secondes
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.response?.data?.message || "Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your name and personal details
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Required
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded">
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
          />
          <p className="mt-1 text-xs text-gray-500">
            This is the name that will be displayed on your profile
          </p>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 placeholder-gray-400"
            placeholder="Tell us a bit about yourself"
          ></textarea>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
            <p className="text-xs text-gray-500">
              {bio.length}/500
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}