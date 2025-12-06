import { X, CheckCircle, Eye, FileText, Calendar, BookOpen, GraduationCap, MapPin } from 'lucide-react';

function ConfirmResourceModal({ formData, onConfirm, onEdit, onClose }) {
  const truncateUrl = (url) => {
    if (url.length > 50) {
      return url.substring(0, 47) + '...';
    }
    return url;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden transform transition-all animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-800/20 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Eye className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Review Your Resource</h2>
                <p className="text-blue-100 text-sm">Verify details before sharing</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <p className="text-gray-700 font-medium">
                  Please verify all information is correct
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 rounded-2xl p-6 space-y-6 mb-8 border border-blue-100">
              {/* Title & Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Title
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold text-lg leading-tight">
                    {formData.title || '-'}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-sky-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpen className="w-5 h-5 text-sky-600" />
                    <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                      Resource Type
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold text-lg capitalize">
                    {formData.resourceType ? formData.resourceType.replace('_', ' ') : '-'}
                  </p>
                </div>
              </div>

              {/* Drive Link */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                  </svg>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Google Drive Link
                  </p>
                </div>
                <a
                  href={formData.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium break-all inline-flex items-center space-x-2 hover:underline transition-all"
                >
                  <span className="break-all">{formData.driveLink}</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Description */}
              {formData.description && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Description
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {formData.description}
                  </p>
                </div>
              )}

              {/* Filière & Module */}
              {(formData.filiere || formData.module) && (
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.filiere && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <GraduationCap className="w-5 h-5 text-cyan-600" />
                        <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
                          Filière
                        </p>
                      </div>
                      <p className="text-gray-900 font-semibold uppercase text-sm">
                        {formData.filiere}
                      </p>
                    </div>
                  )}

                  {formData.module && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <BookOpen className="w-5 h-5 text-cyan-600" />
                        <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
                          Module
                        </p>
                      </div>
                      <p className="text-gray-900 font-semibold capitalize">
                        {formData.module}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Semester & Academic Year */}
              {(formData.semester || formData.academicYear) && (
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.semester && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                          Semester
                        </p>
                      </div>
                      <p className="text-gray-900 font-semibold capitalize">
                        {formData.semester}
                      </p>
                    </div>
                  )}

                  {formData.academicYear && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                          Academic Year
                        </p>
                      </div>
                      <p className="text-gray-900 font-semibold">
                        {formData.academicYear}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Campus */}
              {formData.campus && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Campus
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold capitalize">
                    {formData.campus}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onEdit}
                className="flex-1 px-6 py-4 border-2 border-blue-200 text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-lg flex items-center justify-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Details</span>
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-lg flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Confirm & Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmResourceModal;