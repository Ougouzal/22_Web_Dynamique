import { useState } from 'react';
import { Upload, Info, BookOpen, GraduationCap, Bookmark, Calendar, MapPin, CheckCircle } from 'lucide-react';
import ConfirmResourceModal from '../components/ConfirmResourceModal';


function UploadResource() {
  const [formData, setFormData] = useState({
    title: '',
    driveLink: '',
    description: '',
    resourceType: '',
    filiere: '',
    module: '',
    semester: '',
    academicYear: '',
    campus: ''
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.driveLink || !formData.resourceType) {
      alert('Please fill in all required fields');
      return;
    }
    setShowConfirmModal(true);
    setCurrentStep(2);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Resource shared successfully!");
        setShowConfirmModal(false);
        setFormData({
          title: '',
          driveLink: '',
          description: '',
          resourceType: '',
          filiere: '',
          module: '',
          semester: '',
          academicYear: '',
          campus: ''
        });
        setCurrentStep(1);
      } else {
        alert("Error: " + data.message);
      }

    } catch (error) {
      console.error("API error:", error);
      alert("Failed to share resource. Check console for details.");
    }
  };

  const handleEdit = () => {
    setShowConfirmModal(false);
    setCurrentStep(1);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="max-w-7xl  mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
                Share Knowledge
              </h1>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                Contribute to the FSA Agadir community by sharing valuable educational resources with your peers
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Easy Sharing
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Organized Content
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Community Access
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                <BookOpen className="w-24 h-24 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl shadow-xl p-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <Upload className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Upload Resource</h2>
            </div>

            <div className="flex items-center space-x-6">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                currentStep === 1 ? 'bg-white/20' : 'opacity-60'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 1 ? 'bg-white' : 'bg-white/40'
                }`}>
                  <span className={`font-bold ${
                    currentStep === 1 ? 'text-blue-600' : 'text-white'
                  }`}>1</span>
                </div>
                <span className="font-medium">Resource Info</span>
              </div>

              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                currentStep === 2 ? 'bg-white/20' : 'opacity-60'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 2 ? 'bg-white' : 'bg-white/40'
                }`}>
                  <span className={`font-bold ${
                    currentStep === 2 ? 'text-blue-600' : 'text-white'
                  }`}>2</span>
                </div>
                <span className="font-medium">Submit</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="E.g., Cours de Mathématiques - Analyse"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Google Drive Link <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="driveLink"
                      value={formData.driveLink}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/file/d/..."
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                    <Upload className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 flex items-start">
                    <Info className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                    Enter a Google Drive link that allows others to view or download the resource
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe this resource..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-sky-50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Resource Type</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Resource Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="resourceType"
                      value={formData.resourceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-gray-900 appearance-none cursor-pointer bg-white"
                      required
                    >
                      <option value="">Select resource type</option>
                      <option value="course">Cours</option>
                      <option value="tp">TP/TD</option>
                      <option value="exam">Examens</option>
                      <option value="project">Projet</option>
                      <option value="summary">Résumé</option>
                      <option value="other">Autre</option>
                    </select>
                    <BookOpen className="w-5 h-5 text-sky-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Academic Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Filière
                    </label>
                    <div className="relative">
                      <select
                        name="filiere"
                        value={formData.filiere}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900 appearance-none cursor-pointer bg-white"
                      >
                        <option value="">Select filière</option>
                        <option value="smi">Sciences Mathématiques et Informatique (SMI)</option>
                        <option value="sma">Sciences Mathématiques et Applications (SMA)</option>
                        <option value="smp">Sciences de la Matière Physique (SMP)</option>
                        <option value="smc">Sciences de la Matière Chimie (SMC)</option>
                        <option value="svt">Sciences de la Vie et de la Terre (SVT)</option>
                        <option value="stu">Sciences et Techniques de l'Univers (STU)</option>
                      </select>
                      <Bookmark className="w-5 h-5 text-cyan-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Module
                    </label>
                    <div className="relative">
                      <select
                        name="module"
                        value={formData.module}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900 appearance-none cursor-pointer bg-white"
                      >
                        <option value="">Select module</option>
                        <option value="analyse">Analyse Mathématique</option>
                        <option value="algebre">Algèbre</option>
                        <option value="physique">Physique</option>
                        <option value="chimie">Chimie</option>
                        <option value="informatique">Informatique</option>
                        <option value="programmation">Programmation</option>
                      </select>
                      <BookOpen className="w-5 h-5 text-cyan-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Semester
                  </label>
                  <div className="relative">
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 appearance-none cursor-pointer bg-white"
                    >
                      <option value="">Select semester</option>
                      <option value="s1">Semestre 1</option>
                      <option value="s2">Semestre 2</option>
                      <option value="s3">Semestre 3</option>
                      <option value="s4">Semestre 4</option>
                      <option value="s5">Semestre 5</option>
                      <option value="s6">Semestre 6</option>
                    </select>
                    <Calendar className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Academic Year
                    </label>
                    <div className="relative">
                      <select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 appearance-none cursor-pointer bg-white"
                      >
                        <option value="">Select academic year</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2025-2026">2025-2026</option>
                      </select>
                      <GraduationCap className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Campus
                    </label>
                    <div className="relative">
                      <select
                        name="campus"
                        value={formData.campus}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 appearance-none cursor-pointer bg-white"
                      >
                        <option value="">Select campus</option>
                        <option value="agadir">Agadir</option>
                      </select>
                      <MapPin className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3 mb-4">
                <Bookmark className="w-6 h-6 text-sky-700 flex-shrink-0 mt-1" />
                <h4 className="text-lg font-bold text-sky-900">Tips for quality uploads</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Provide a clear, descriptive title</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Add detailed description for better searchability</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Ensure your Drive link has proper permissions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Categorize correctly to help others find your resource</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2 text-lg"
            >
              <Upload className="w-6 h-6" />
              <span>Review & Share Resource</span>
            </button>
          </div>
        </form>

        {showConfirmModal && (
          <ConfirmResourceModal
            formData={formData}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default UploadResource;