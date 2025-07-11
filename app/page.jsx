'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Prodigy Employee Management System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Effortlessly manage your workforce, streamline operations, and boost productivity — all in one secure platform.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </main>
  );
}