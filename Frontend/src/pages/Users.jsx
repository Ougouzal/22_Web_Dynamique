import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/users');
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError('Erreur lors du chargement des utilisateurs');
      }
    } catch (err) {
      setError('Impossible de se connecter au serveur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Liste des Utilisateurs
          </h1>
          <p className="text-gray-600 text-lg">
            {users.length} {users.length > 1 ? 'utilisateurs inscrits' : 'utilisateur inscrit'}
          </p>
        </div>

        {/* Users Grid */}
        {users.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun utilisateur trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Card Header avec Photo de Profil */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden ring-4 ring-white/30">
                      {user.profile_picture ? (
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
                        className={`w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold ${
                          user.profile_picture ? 'hidden' : 'flex'
                        }`}
                      >
                        {getInitials(user.name)}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center truncate">
                    {user.name}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="text-gray-800 font-medium truncate" title={user.email}>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Status de vérification */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Statut</span>
                    {user.is_verified ? (
                      <span className="flex items-center space-x-1 text-green-600 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Vérifié</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-orange-500 font-medium">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">Non vérifié</span>
                      </span>
                    )}
                  </div>

                  {/* Date d'inscription */}
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Inscription</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Date de vérification (si vérifié) */}
                  {user.is_verified && user.email_verified_at && (
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Vérifié le</p>
                        <p className="text-gray-800 font-medium text-sm">
                          {formatDate(user.email_verified_at)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-4">
                  <div className="text-xs text-gray-400 text-center">
                    ID: {user.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}