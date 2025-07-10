"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function EditEmployeePage() {
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    const getEmployee = async () => {
      const res = await fetch(`/api/employees/${id}`);
      const data = await res.json();
      setForm(data);
    };
    getEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          className="w-full border p-2"
          onChange={handleChange}
        />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2">
          Update
        </button>
      </form>
    </main>
  );
}