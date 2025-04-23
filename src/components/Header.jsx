import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản Lý Sinh Viên</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Danh sách
                </Link>
              </li>
              <li>
                <Link to="/add" className="hover:underline">
                  Thêm sinh viên
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
