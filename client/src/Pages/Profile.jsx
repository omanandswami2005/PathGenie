import React from "react";
import { useSession, signOut } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const { 
    data: session, 
    isPending, 
    error, 
    refetch 
  } = useSession();
console.log("Session data:", session);
  const handleRefetch = () => {
    refetch();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-lg p-8 sm:p-12 w-full max-w-md">
          <p className="text-center text-gray-900 dark:text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-lg p-8 sm:p-12 w-full max-w-md">
          <p className="text-center text-red-500">{error.message}</p>
          <div className="mt-4 text-center">
            <button
              onClick={handleRefetch}
              className="w-70% bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-lg p-8 sm:p-12 w-full max-w-md">
          <p className="text-center text-gray-900 dark:text-white">No session found. Please log in.</p>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/login")}
              className="w-70% bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg p-8 sm:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Your Profile
        </h2>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Profile pic</label>
                <img src={user?.image} className="w-10 h-10 rounded-full" alt=" " />
          <div>

            <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Username</label>
            <p className="mt-1 text-gray-900 dark:text-white">{user.name}</p>
          </div>
          <div className="text-center">
            <button
              onClick={handleRefetch}
              className="w-70% bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Refetch Session
            </button>
            <button
              onClick={handleLogout}
              className="w-70% bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;