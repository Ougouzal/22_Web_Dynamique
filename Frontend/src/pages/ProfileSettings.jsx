import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  GraduationCap,
  Image,
  Shield,
  Settings,
  LifeBuoy,
  Building2,
  Calendar,
  Lock,
  Mail,
  Hash,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import ChangePasswordModal from "./ChangePasswordModel"; // Importe le modal
import ProfilePictureUpload from "./ProfilePictureUpload";
import AcademicInfoForm from "./AcademicInformation";
import PersonalInfoForm from "./PersonalInfoForm";
import ContactSupportModal from "./ContactSupportModal";

export default function ProfileSettings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    // Récupérer l'utilisateur depuis localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleDeleteAccount = async () => {
    if (!userData) {
      alert("Impossible de supprimer : utilisateur non chargé.");
      return;
    }
    if (deleteConfirmation !== "DELETE") {
      alert('Veuillez taper "DELETE" pour confirmer');
      return;
    }

    setIsDeleting(true);

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/users/${userData.id}`
      );

      if (response.data.success) {
        alert("Compte supprimé avec succès !");
        localStorage.removeItem("user");
        window.location.href = "/";
      } else {
        alert(response.data.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert("Erreur lors de la suppression du compte");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans text-slate-800">
      <div className="bg-white shadow-sm mb-6">
        <div className="bg-blue-500 h-48 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:20px_20px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
              <p className="text-blue-50 opacity-90">
                Manage your personal information, academic details, and account
                preferences
              </p>
            </div>

            <div className="hidden md:block">
              <div className="h-24 w-24 rounded-full bg-blue-50 border-4 border-blue-400/30 flex items-center justify-center">
                <User className="h-12 w-12 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <nav className="flex flex-col">
                <SidebarItem
                  icon={User}
                  label="Profile Information"
                  href="#personal-info"
                  active
                />
                <SidebarItem
                  icon={GraduationCap}
                  label="Academic Information"
                  href="#academic-info"
                />
                <SidebarItem
                  icon={Image}
                  label="Profile Picture"
                  href="#profile-picture"
                />
                <SidebarItem icon={Shield} label="Security" href="#security" />
                <SidebarItem icon={Settings} label="Account" href="#account" />
              </nav>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <LifeBuoy className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
              <p className="mt-2 text-sm text-gray-500 mb-6">
                Having trouble with your account settings? Our support team is
                ready to assist you.
              </p>
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Contact Support
              </button>
              {/* Modal Contact Support */}
              <ContactSupportModal
                isOpen={showSupportModal}
                onClose={() => setShowSupportModal(false)}
                userData={userData}
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <PersonalInfoForm
              userData={userData}
              onUpdate={(updatedUser) => setUserData(updatedUser)}
            />

            <AcademicInfoForm
              userData={userData}
              onUpdate={(updatedUser) => setUserData(updatedUser)}
            />

            <ProfilePictureUpload
              userData={userData}
              onUpdate={(updatedUser) => setUserData(updatedUser)}
            />

            <SectionCard
              id="security"
              title="Security"
              subtitle="Manage your password and account security settings"
            >
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Password
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 max-w-xl">
                      Set a strong password to protect your account.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Change Password
                  {/* Modal Change Password */}
                  <ChangePasswordModal
                    isOpen={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    userId={userData?.id}
                  />
                </button>
              </div>
            </SectionCard>

            <div
              id="account"
              className="bg-white shadow rounded-lg overflow-hidden scroll-mt-6"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Account</h2>
                <p className="mt-1 text-sm text-gray-500">
                  View your account details and manage your account settings
                </p>
              </div>

              <div className="p-6 space-y-6">
                <h3 className="text-base font-medium text-gray-900">
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ReadOnlyField
                    icon={Mail}
                    label="Email"
                    value={userData?.email || "Loading..."}
                  />
                  <ReadOnlyField
                    icon={Hash}
                    label="User ID"
                    value={userData?.id || "Loading..."}
                  />
                  <ReadOnlyField
                    icon={Clock}
                    label="Created At"
                    value={
                      userData?.created_at
                        ? new Date(userData.created_at).toLocaleDateString()
                        : "Loading..."
                    }
                  />
                  <ReadOnlyField
                    icon={ShieldCheck}
                    label="Verified"
                    value={userData?.is_verified ? "Yes" : "No"}
                  />
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <h3 className="text-base font-medium text-red-600">
                      Danger Zone
                    </h3>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-lg p-6">
                    <p className="text-red-700 text-sm mb-4">
                      Once you delete your account, all of your data will be
                      permanently removed.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-red-200 shadow-sm text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Account
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="font-bold text-red-600">DELETE</span> to
                confirm
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="DELETE"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== "DELETE" || isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon: Icon, label, href, active }) {
  return (
    <a
      href={href}
      className={`flex items-center px-4 py-3.5 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
      }`}
    >
      <Icon
        className={`mr-3 h-5 w-5 ${active ? "text-blue-600" : "text-gray-400"}`}
      />
      {label}
    </a>
  );
}

function SectionCard({ id, title, subtitle, children, requiredBadge }) {
  return (
    <div
      id={id}
      className="bg-white shadow rounded-lg overflow-hidden scroll-mt-6"
    >
      <div className="p-6 border-b border-gray-200 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {requiredBadge && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Required
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InputGroup({ label, defaultValue }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
      />
    </div>
  );
}

function SelectGroup({ label, icon: Icon, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <select className="block w-full rounded-md border-gray-300 pl-10 py-2.5 text-gray-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border shadow-sm appearance-none bg-white">
          <option>{placeholder}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
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
  );
}

function SaveButton() {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
      Save Changes
    </button>
  );
}

function ReadOnlyField({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-sm font-medium text-gray-900 pl-6">{value}</div>
    </div>
  );
}
