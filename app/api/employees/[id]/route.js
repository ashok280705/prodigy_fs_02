import connectDB from "@/lib/db";
import Employee from "@/models/Employee";

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const employee = await Employee.findByIdAndUpdate(params.id, data, { new: true });
  return new Response(JSON.stringify(employee), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Employee.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ msg: "Deleted" }), { status: 200 });
}

export async function GET(req, { params }) {
  await connectDB();
  const employee = await Employee.findById(params.id);
  return new Response(JSON.stringify(employee), { status: 200 });
}