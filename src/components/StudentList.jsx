"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

export default function StudentList({ students, onDelete, onFilter, onSearch, searchTerm }) {
  const [filterClass, setFilterClass] = useState("")
  const classes = [...new Set(students.map((student) => student.class))]

  const handleFilterChange = (e) => {
    const value = e.target.value
    setFilterClass(value)
    onFilter(value)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Danh sách sinh viên</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="searchName" className="text-sm font-medium">
              Tìm kiếm:
            </label>
            <input
              type="text"
              id="searchName"
              value={searchTerm || ""}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Tìm theo tên..."
              className="border rounded px-3 py-1 text-sm w-48"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="classFilter" className="text-sm font-medium">
              Lọc theo lớp:
            </label>
            <select
              id="classFilter"
              value={filterClass}
              onChange={handleFilterChange}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="">Tất cả</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Không có sinh viên nào. Hãy thêm sinh viên mới!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Họ tên</th>
                <th className="py-2 px-4 border text-left">Mã SV</th>
                <th className="py-2 px-4 border text-left">Lớp</th>
                <th className="py-2 px-4 border text-left">Email</th>
                <th className="py-2 px-4 border text-left">Số điện thoại</th>
                <th className="py-2 px-4 border text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{student.name}</td>
                  <td className="py-2 px-4 border">{student.studentId}</td>
                  <td className="py-2 px-4 border">{student.class}</td>
                  <td className="py-2 px-4 border">{student.email}</td>
                  <td className="py-2 px-4 border">{student.phone}</td>
                  <td className="py-2 px-4 border text-center">
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`/edit/${student.id}`}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => onDelete(student.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
