"use client";

import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", {
        email,
      });

      alert("Reset link sent to your email");
      console.log(response.data);
    } catch (error: any) {
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-xl mb-4">
        {loading ? "Sending..." : "Forgot Password"}
      </h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleForgotPassword}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Reset Link
      </button>
    </div>
  );
}
