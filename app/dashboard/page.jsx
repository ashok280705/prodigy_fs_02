"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
    };
    getEmployees();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-2">
        {employees.map((emp) => (
          <li key={emp._id} className="border p-4 rounded">
            <p className="font-semibold">{emp.name}</p>
            <p>{emp.position}</p>
            <p>{emp.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}