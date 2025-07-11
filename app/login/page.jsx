"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [accessType, setAccessType] = useState("user");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login successful!");

      if (data.user.role === "admin") {
        if (accessType !== "admin") {
          toast.error("This is an admin account! Use Admin Access type.");
          return;
        }
        router.push("/dashboard");
      } else {
        if (accessType !== "user") {
          toast.error("This is a normal user account! Use User Access type.");
          return;
        }
        router.push("/profile");
      }
    } else {
      toast.error(data.msg || "Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4">
      <div className="bg-white/50 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🔒 Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="user">👤 Logging in as: User</option>
            <option value="admin">🛡️ Logging in as: Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-full shadow transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 hover:underline cursor-pointer font-semibold"
          >
            Click here to register
          </span>
        </p>
      </div>
    </main>
  );
}