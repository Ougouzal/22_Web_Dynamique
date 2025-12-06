import { Link } from "react-router-dom"
import { FileDown, Upload, Heart, Bookmark, Users, ArrowRight, Share2,Mail ,MapPin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center space-x-2">
              <Share2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ReShare</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600">Fonctionnalités</a>
              <a href="#how" className="text-gray-700 hover:text-blue-600">Comment ça marche ?</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="text-gray-700 hover:text-blue-600">Se connecter</button>
              </Link>

              <Link to="/register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Créer un compte
                </button>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="pt-20">
        <section className="bg-gradient-to-b from-blue-50 to-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

            {/* Texte */}
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                Partagez vos cours et TD entre étudiants. Simple. Rapide. Gratuit.
              </h1>

              <p className="text-xl text-gray-600">
                ReShare est une plateforme dédiée aux étudiants pour partager et télécharger facilement 
                les cours, TD, TP, résumés, et ressources universitaires.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium flex items-center space-x-2 shadow">
                    <span>Commencer maintenant</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </button>
                </Link>

                <Link to="/login">
                  <button className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-medium">
                    Se connecter
                  </button>
                </Link>
              </div>
            </div>

            {/* Carte d'exemple */}
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemple de ressource</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Cours Analyse 1</span>
                  <FileDown className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>TD N°3 – Suites numériques</span>
                  <Bookmark className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Résumé Probabilités</span>
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-gray-900">Fonctionnalités de ReShare</h2>
              <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour collaborer entre étudiants</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="p-8 rounded-xl border hover:border-blue-600 transition">
                <Upload className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Partager une ressource</h3>
                <p className="text-gray-600">Déposez vos fichiers (PDF, Word, images…)</p>
              </div>

              <div className="p-8 rounded-xl border hover:border-blue-600 transition">
                <FileDown className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Télécharger</h3>
                <p className="text-gray-600">Accédez aux ressources partagées par d'autres étudiants.</p>
              </div>

              <div className="p-8 rounded-xl border hover:border-blue-600 transition">
                <Heart className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aimer & Bookmark</h3>
                <p className="text-gray-600">Sauvegardez vos ressources préférées.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900">Contact</h2>
      <p className="text-gray-600 text-lg mt-2">
        Notre équipe est disponible pour toute question concernant ReShare.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-10 text-center">
      <div className="space-y-3">
        <div className="w-14 h-14 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
          <Mail className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Email</h3>
        <p className="text-gray-600">support@reshare.com</p>
      </div>

      <div className="space-y-3">
        <div className="w-14 h-14 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
          <Users className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Communauté</h3>
        <p className="text-gray-600">ReShare Student Hub</p>
      </div>

      <div className="space-y-3">
        <div className="w-14 h-14 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
          <MapPin className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Localisation</h3>
        <p className="text-gray-600">Disponible dans toutes les universités</p>
      </div>
    </div>
  </div>
</section>


<footer className="bg-gray-900 text-gray-300 py-12 mt-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-4 gap-10">

      {/* Brand */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">ReShare</h3>
        <p className="text-gray-400 text-sm">
          La plateforme universitaire pour partager et découvrir des ressources :
          cours, TD, TP, examens et documents utiles.
        </p>
      </div>

      {/* Links */}
      <div>
        <h4 className="text-white font-semibold mb-4">Navigation</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/home" className="hover:text-white">Accueil</a></li>
          <li><a href="/login" className="hover:text-white">Connexion</a></li>
          <li><a href="/register" className="hover:text-white">Créer un compte</a></li>
          <li><a href="/feed" className="hover:text-white">Ressources</a></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-white font-semibold mb-4">Fonctionnalités</h4>
        <ul className="space-y-2 text-gray-400">
          <li>📘 Partage de fichiers</li>
          <li>⭐ Système de favoris</li>
          <li>⬇️ Téléchargement rapide</li>
          <li>📂 Organisation par modules</li>
        </ul>
      </div>

      {/* Social */}
      <div>
        <h4 className="text-white font-semibold mb-4">Communauté</h4>
        <ul className="space-y-2 text-gray-400">
          <li>Discord ReShare</li>
          <li>Instagram ReShare</li>
          <li>Groupe Facebook étudiants</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} ReShare — Tous droits réservés.
    </div>
  </div>
</footer>





      </main>

    </div>
  )
}
