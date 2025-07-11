import connectDB from "@/lib/db";
import Employee from "@/models/Employee";
import { verifyJWT } from "@/lib/Auth";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // ✅ Block all access if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ If token exists, allow — real checks happen in API handlers
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/employee/:path*"],
};
export async function GET(req, { params }) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const user = await verifyJWT(token);


  const { id } = params;

  const employee = await Employee.findById(id);
  if (!employee) {
    return new Response("Employee not found", { status: 404 });
  }

  return new Response(JSON.stringify(employee), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const user = await verifyJWT(token);
  if (user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = params;
  const { name, position, salary, department } = await req.json();

  if (!name || !position || !salary || !department) {
    return new Response("Missing fields", { status: 400 });
  }

  const updated = await Employee.findByIdAndUpdate(
    id,
    { name, position, salary, department },
    { new: true } // Return the updated document
  );

  if (!updated) {
    return new Response("Employee not found", { status: 404 });
  }

  return new Response(JSON.stringify(updated), { status: 200 });
}


export async function DELETE(req, { params }) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const user = await verifyJWT(token);
  if (user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = params;

  const deleted = await Employee.findByIdAndDelete(id);

  if (!deleted) {
    return new Response("Employee not found", { status: 404 });
  }

  return new Response(JSON.stringify({ msg: "Employee deleted successfully" }), { status: 200 });
}