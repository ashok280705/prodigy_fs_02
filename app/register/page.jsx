"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [secret, setSecret] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    let timer;
    if (isLocked && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setFailedAttempts(0);
            toast.success("You can try again now.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isLocked, secondsLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      toast.error(`Too many failed attempts. Please wait ${secondsLeft}s.`);
      return;
    }

    if (form.role === "admin") {
      if (secret !== "123") {
        toast.error("Invalid admin secret code!");

        setFailedAttempts((prev) => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            setIsLocked(true);
            setSecondsLeft(30); // or 120 for 2 min in prod
            toast.error("You are locked out for 30 seconds.");
          }
          return newCount;
        });

        return; // Block API call
      }
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registered successfully! Please login.");
      router.push("/login");
    } else {
      toast.error(data.msg || "Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 p-4">
      <div className="bg-white/50 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📝 Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="user">👤 Register as User</option>
            <option value="admin">🛡️ Register as Admin</option>
          </select>

          {form.role === "admin" && (
            <input
              type="text"
              placeholder="Enter Admin Secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full border border-red-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          )}

          <button
            type="submit"
            disabled={isLocked}
            className={`w-full ${
              isLocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold px-4 py-3 rounded-full shadow transition duration-300`}
          >
            {isLocked
              ? `Locked (${secondsLeft}s left)`
              : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-green-600 hover:underline cursor-pointer font-semibold"
          >
            Login here
          </span>
        </p>
      </div>
    </main>
  );
}