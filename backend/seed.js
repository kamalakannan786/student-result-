require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("[LOG]: Connected to MongoDB"))
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

const students = [
  { name: "Name 1", roll_number: "22EC01", dob: "2007-05-10", marks: [{ subject: "Math", marks: 95 }, { subject: "Science", marks: 89 }, { subject: "English", marks: 91 }] },
  { name: "Name 2", roll_number: "22EC02", dob: "2007-07-22", marks: [{ subject: "Math", marks: 88 }, { subject: "Science", marks: 84 }, { subject: "English", marks: 79 }] },
  { name: "Name 3", roll_number: "22EC03", dob: "2006-11-15", marks: [{ subject: "Math", marks: 76 }, { subject: "Science", marks: 80 }, { subject: "English", marks: 72 }] },
];

students.forEach(student => {
  student.total = student.marks.reduce((sum, m) => sum + m.marks, 0);
  student.percentage = student.total / student.marks.length;
  student.grade =
    student.percentage >= 90 ? "A+" :
    student.percentage >= 80 ? "A" :
    student.percentage >= 70 ? "B" : "C";
});

Student.insertMany(students)
  .then(() => {
    console.log("[LOG]: Sample students inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("[LOG]: Error inserting students:", err);
    mongoose.connection.close();
  });
