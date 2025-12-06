import React, { useState, useEffect } from "react";
import { Building2, GraduationCap, Calendar, Loader } from "lucide-react";
import axios from "axios";

export default function AcademicInfoForm({ userData, onUpdate }) {
  const [campus, setCampus] = useState("");
  const [filiere, setFiliere] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger les données existantes
  useEffect(() => {
    if (userData) {
      setCampus(userData.campus || "");
      setFiliere(userData.filiere || "");
      setGraduationYear(userData.graduation_year || "");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update-academic-info",
        {
          userId: userData.id,
          campus: campus,
          filiere: filiere,
          graduation_year: graduationYear ? parseInt(graduationYear) : null,
        }
      );

      if (response.data.success) {
        setSuccess("✅ Informations académiques mises à jour !");
        
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

  // Liste des campus (tu peux personnaliser)
  const campusList = [
    "Campus Agadir",
    "Campus Casablanca",
    "Campus Rabat",
    "Campus Marrakech",
    "Campus Tanger",
    "Campus Fès",
  ];

  // Liste des filières (tu peux personnaliser)
  const filieresList = [
    "Génie Informatique",
    "Génie Civil",
    "Génie Mécanique",
    "Génie Électrique",
    "Génie Industriel",
    "Architecture",
    "Management",
    "Finance",
    "Marketing",
    "Ressources Humaines",
  ];

  // Années de graduation (de 2020 à 2030)
  const graduationYears = Array.from({ length: 11 }, (_, i) => 2020 + i);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Academic Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your campus, major, and graduation year
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

        <div className="space-y-6">
          {/* Campus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campus
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border shadow-sm appearance-none bg-white"
              >
                <option value="">Select a campus</option>
                {campusList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Major (Filière)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <GraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filiere}
                onChange={(e) => setFiliere(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border shadow-sm appearance-none bg-white"
              >
                <option value="">Select a major</option>
                {filieresList.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border shadow-sm appearance-none bg-white"
              >
                <option value="">Select a graduation year</option>
                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-6">
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