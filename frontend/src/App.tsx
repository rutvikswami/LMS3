import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import MyLearning from "./pages/MyLearning";
import CreateCourse from "./pages/CreateCourse";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/create-course" element={<CreateCourse />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
