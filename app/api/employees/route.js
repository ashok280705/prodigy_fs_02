import connectDB from "@/lib/db";
import Employee from "@/models/Employee";

export async function GET() {
  await connectDB();
  const employees = await Employee.find();
  return new Response(JSON.stringify(employees), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const employee = await Employee.create(data);
  return new Response(JSON.stringify(employee), { status: 201 });
}