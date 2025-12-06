import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">
              Welcome, Abdelmoula!
            </h1>
            <p className="text-blue-700 text-lg">
              Here's an overview of your FSA Agadir-Share account
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14m7-7H5"
              />
            </svg>
            Share Resource
          </button>
        </div>

        {/* Account Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Account Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 12H9m4 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Saved by Others</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7H5v12h12V9m0-2l4.586-4.586a2 2 0 012.828 0l2.828 2.828A2 2 0 0120 4.414V7m-7 10l2 2m0 0l2-2m-2 2v-2m0 0L9 5"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Activity Score</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Resources */}
          <section className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Recent Resources
              </h2>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View all
              </a>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">No resources shared yet.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Share Your First Resource
              </button>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-blue-900 mb-6">
              Recent Activity
            </h2>
            <div className="flex gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-2 rounded-lg text-blue-600 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Signed up for FSA Agadir-Share
                </p>
                <p className="text-sm text-gray-600">less than a minute ago</p>
              </div>
            </div>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View all resources →
            </a>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Action Card 1 */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
              <Link to="/upload">
                <div className="flex gap-4 items-start">
                  <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Share New Resource
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Share educational materials
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Action Card 2 */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
              <Link to="/feed">
                <div className="flex gap-4 items-start">
                  <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Discover Resources
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Find materials from others
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Action Card 3 */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
              <Link to="/profile">
                <div className="flex gap-4 items-start">
                  <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Manage Profile
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Update personal information
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
