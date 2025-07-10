import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export async function POST(req) {
  await connectDB();
  const { name, username, email, password } = await req.json();

  if (!name || !username || !email || !password) {
    return new Response(JSON.stringify({ msg: "Missing fields" }), { status: 400 });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return new Response(JSON.stringify({ msg: "User already exists" }), { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    email,
    password: hashed,
  });

  return new Response(JSON.stringify({ msg: "User created", user }), { status: 201 });
}