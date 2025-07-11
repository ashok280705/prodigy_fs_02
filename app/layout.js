import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Employee Management System",
  description: "Admin CRUD with secure auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}