require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("[LOG]: MongoDB Connected"))
  .catch(err => console.error("[LOG]: MongoDB Connection Error:", err));


const studentSchema = new mongoose.Schema({
  name: String,
  roll_number: { type: String, unique: true },
  dob: String,
  marks: [{ subject: String, marks: Number }],
  total: Number,
  percentage: Number,
  grade: String
});

const Student = mongoose.model("Student", studentSchema);

app.get("/api/student/:roll", async (req, res) => {
  try {
    const student = await Student.findOne({ roll_number: req.params.roll });
    if (!student) return res.status(404).json({ error: "Student not found!" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/student/:roll", async (req, res) => {
  try {
    const { marks } = req.body;
    const student = await Student.findOne({ roll_number: req.params.roll });

    if (!student) return res.status(404).json({ error: "Student not found!" });

    student.marks = marks;
    student.total = marks.reduce((sum, m) => sum + m.marks, 0);
    student.percentage = student.total / marks.length;
    student.grade =
      student.percentage >= 90 ? "A+" :
      student.percentage >= 80 ? "A" :
      student.percentage >= 70 ? "B" : "C";

    await student.save();
    res.json({ message: "Marks updated successfully!", student });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`[LOG]: Server running on port ${PORT}`));
