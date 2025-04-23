const STUDENTS_STORAGE_KEY = "students"

export const getStudentsFromStorage = () => {
  const studentsJson = localStorage.getItem(STUDENTS_STORAGE_KEY)
  return studentsJson ? JSON.parse(studentsJson) : []
}

export const saveStudentsToStorage = (students) => {
  localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students))
}
