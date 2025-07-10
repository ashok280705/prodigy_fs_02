"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewEmployeePage() {
  const params = useParams();
  const { id } = params;

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      const res = await fetch(`/api/employees/${id}`);
      const data = await res.json();
      setEmployee(data);
    };
    getEmployee();
  }, [id]);

  if (!employee) return <p className="p-8">Loading...</p>;

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Position:</strong> {employee.position}</p>
      </div>
    </main>
  );
}