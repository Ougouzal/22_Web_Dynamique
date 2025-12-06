import React, { useState } from "react";
import { User, Upload, X, Loader } from "lucide-react";
import axios from "axios";

export default function ProfilePictureUpload({ userData, onUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        setError("Veuillez sélectionner une image (JPG, PNG, GIF)");
        return;
      }

      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 5MB");
        return;
      }

      setSelectedFile(file);

      // Créer un aperçu
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Veuillez sélectionner une image");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("userId", userData.id);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Photo de profil mise à jour !");
        
        // Mettre à jour le localStorage avec le nouveau user
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Appeler la fonction de callback pour mettre à jour le parent
        if (onUpdate) {
          onUpdate(response.data.user);
        }

        // Réinitialiser
        setSelectedFile(null);
        setPreview(null);
      }
    } catch (err) {
      console.error("Erreur upload:", err);
      setError(err.response?.data?.message || "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setError("");
  };

  const currentProfilePicture = userData?.profile_picture
    ? `http://127.0.0.1:8000/${userData.profile_picture}`
    : null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Profile Picture</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload a clear photo of yourself to personalize your profile.
          Recommended size: 400x400 pixels.
        </p>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Preview de l'image */}
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : currentProfilePicture ? (
                <img
                  src={currentProfilePicture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-gray-400" />
              )}
            </div>

            {preview && (
              <button
                onClick={handleCancel}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex-1 w-full">
            {!selectedFile ? (
              <div>
                <label
                  htmlFor="profile-picture-input"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer mb-3"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Image
                </label>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF
                </p>
                <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={isUploading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}