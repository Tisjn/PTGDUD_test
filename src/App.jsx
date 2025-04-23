import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import AddStudentPage from "./pages/AddStudentPage"
import EditStudentPage from "./pages/EditStudentPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddStudentPage />} />
            <Route path="/edit/:id" element={<EditStudentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
