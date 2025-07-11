import connectDB from "@/lib/db";
import Employee from "@/models/Employee";
import { verifyJWT } from "@/lib/Auth";

export async function GET(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await verifyJWT(token);
  // ✅ Any logged-in user can read

  const employees = await Employee.find();
  return new Response(JSON.stringify(employees), { status: 200 });
}

export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await verifyJWT(token);
  if (user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();

  const newEmployee = await Employee.create(body);

  return new Response(JSON.stringify(newEmployee), { status: 201 });
}