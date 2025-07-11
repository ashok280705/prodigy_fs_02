import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);