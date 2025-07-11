"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    salary: "",
    department: "",
  });
  const [editingId, setEditingId] = useState(null);

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch("/api/employees");
      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setEmployees(data);
    };
    getEmployees();
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`/api/employees/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", position: "", salary: "", department: "" });
    setEditingId(null);
    reload();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });
    reload();
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      position: emp.position,
      salary: emp.salary,
      department: emp.department,
    });
    setEditingId(emp._id);
  };

  const reload = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">
      {/* ✅ Header with Logout */}
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          ⚙️ Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-md mb-12 max-w-5xl mx-auto space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2">
          {editingId ? "✏️ Edit Employee" : "➕ Add New Employee"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 rounded p-3 w-full"
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            name="position"
            className="border border-gray-300 rounded p-3 w-full"
            value={form.position}
            onChange={handleChange}
            required
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Designer">Designer</option>
          </select>

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            className="border border-gray-300 rounded p-3 w-full"
            value={form.salary}
            onChange={handleChange}
            required
          />

          <select
            name="department"
            className="border border-gray-300 rounded p-3 w-full"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition duration-300">
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* ✅ Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white/50 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{emp.name}</h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium text-gray-800">Position:</span> {emp.position}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium text-gray-800">Department:</span> {emp.department}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium text-gray-800">Salary:</span> ${emp.salary}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(emp)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(emp._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}