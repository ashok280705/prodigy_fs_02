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

  // 👉 This is just for user clarity
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
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <select
          value={accessType}
          onChange={(e) => setAccessType(e.target.value)}
          className="w-full border p-2"
        >
          <option value="user">I am logging in as: User Access</option>
          <option value="admin">I am logging in as: Admin Access</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
        >
          Login
        </button>
      </form>
    </main>
  );
}