"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  const resetPassword = async () => {
    if (!newPassword) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });

      alert(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Reset Your Password
        </h1>

        {error && (
          <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full rounded bg-cyan-600 py-2 text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
  