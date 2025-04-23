// Remove the "use client" directive as it's Next.js specific

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import StudentForm from "../components/StudentForm"
import { getStudentsFromStorage, saveStudentsToStorage } from "../utils/localStorage"

export default function EditStudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)

  useEffect(() => {
    const students = getStudentsFromStorage()
    const foundStudent = students.find((s) => s.id === id)

    if (foundStudent) {
      setStudent({
        name: foundStudent.name,
        studentId: foundStudent.studentId,
        class: foundStudent.class,
        email: foundStudent.email,
        phone: foundStudent.phone,
        address: foundStudent.address,
        dateOfBirth: foundStudent.dateOfBirth,
      })
    } else {
      alert("Không tìm thấy sinh viên!")
      navigate("/")
    }
  }, [id, navigate])

  const handleSubmit = (data) => {
    const students = getStudentsFromStorage()
    const updatedStudents = students.map((s) =>
      s.id === id
        ? {
            ...s,
            name: data.name,
            class: data.class,
            email: data.email,
            phone: data.phone,
            address: data.address,
            dateOfBirth: data.dateOfBirth,
          }
        : s,
    )

    saveStudentsToStorage(updatedStudents)
    alert("Cập nhật thông tin sinh viên thành công!")
    navigate("/")
  }

  if (!student) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>
  }

  return <StudentForm initialData={student} onSubmit={handleSubmit} isEditing={true} />
}
