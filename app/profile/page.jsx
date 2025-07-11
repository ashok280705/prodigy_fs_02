"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/employees");
      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          👥 Employee Directory
        </h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white/50 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {emp.name}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium text-gray-800">Position:</span> {emp.position}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium text-gray-800">Department:</span> {emp.department}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-800">Email:</span> {emp.email}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}