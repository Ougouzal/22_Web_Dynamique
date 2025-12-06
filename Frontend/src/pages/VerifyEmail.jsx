"use client";

import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const userId = params.get("userId");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!userId) {
      setError("ID utilisateur manquant. Veuillez vous réinscrire.");
      return;
    }

    if (!code || code.trim().length !== 6) {
      setError("Veuillez entrer le code à 6 chiffres.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/verify-email",
        { userId: userId.toString().trim(), code: code.toString().trim() },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );

      if (res.data.success) {
        alert("✅ Email vérifié ! Vous pouvez maintenant vous connecter.");
        navigate("/login");
      } else {
        setError(res.data.message || "Code incorrect.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join(", ") ||
        "Erreur lors de la vérification. Vérifiez que le code est correct."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 px-4">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Erreur</h2>
          <p className="text-gray-600 mb-6">ID utilisateur manquant. Veuillez vous réinscrire.</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Retour à l'inscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">📧 Vérification Email</h2>
        <p className="text-gray-600 mb-6 text-center">Un code à 6 chiffres vous a été envoyé par email.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Entrez le code à 6 chiffres"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            pattern="[0-9]{6}"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
          />

          {/* Section debug */}
          <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-500">
            <strong>🔍 Debug:</strong>
            <div>userId reçu: {userId || "❌ MANQUANT"}</div>
            <div>code saisi: {code || "(vide)"} ({code.length} caractères)</div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Vérification..." : "Vérifier"}
          </button>
        </form>
      </div>
    </div>
  );
}
