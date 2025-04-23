"use client"

import { useState, useEffect } from "react"
import StudentList from "../components/StudentList"
import { getStudentsFromStorage, saveStudentsToStorage } from "../utils/localStorage"
import { initializeSampleData } from "../utils/sampleData"

export default function HomePage() {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    let storedStudents = getStudentsFromStorage()

    // If no students in storage, initialize with sample data
    if (storedStudents.length === 0) {
      storedStudents = initializeSampleData()
    }

    setStudents(storedStudents)
    setFilteredStudents(storedStudents)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      const updatedStudents = students.filter((student) => student.id !== id)
      setStudents(updatedStudents)
      setFilteredStudents(filteredStudents.filter((student) => student.id !== id))
      saveStudentsToStorage(updatedStudents)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    applyFilters(term, students)
  }

  const applyFilters = (term, studentList, className) => {
    const classToFilter =
      className !== undefined
        ? className
        : filteredStudents.length === students.length
          ? ""
          : document.getElementById("classFilter")?.value || ""

    let filtered = studentList

    // Apply class filter if specified
    if (classToFilter) {
      filtered = filtered.filter((student) => student.class === classToFilter)
    }

    // Apply search filter if term exists
    if (term) {
      const searchTermLower = term.toLowerCase()
      filtered = filtered.filter((student) => student.name.toLowerCase().includes(searchTermLower))
    }

    setFilteredStudents(filtered)
  }

  const handleFilter = (className) => {
    applyFilters(searchTerm, students, className)
  }

  return (
    <StudentList
      students={filteredStudents}
      onDelete={handleDelete}
      onFilter={handleFilter}
      onSearch={handleSearch}
      searchTerm={searchTerm}
    />
  )
}
