// Remove the "use client" directive as it's Next.js specific

import { useNavigate } from "react-router-dom"
import StudentForm from "../components/StudentForm"
import { getStudentsFromStorage, saveStudentsToStorage } from "../utils/localStorage"

export default function AddStudentPage() {
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    const students = getStudentsFromStorage()

    // Check if student ID already exists
    if (students.some((student) => student.studentId === data.studentId)) {
      alert("Mã sinh viên đã tồn tại. Vui lòng sử dụng mã khác.")
      return
    }

    const newStudent = {
      ...data,
      id: Date.now().toString(),
    }

    const updatedStudents = [...students, newStudent]
    saveStudentsToStorage(updatedStudents)

    alert("Thêm sinh viên thành công!")
    navigate("/")
  }

  return <StudentForm onSubmit={handleSubmit} />
}
