import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import MyLearning from "./pages/MyLearning";
import CreateCourse from "./pages/CreateCourse";
import CourseLearn from "./pages/CourseLearn";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseBuilder from "./pages/CourseBuilder";
import InstructorDashboard from "./pages/InstructorDashboard";
import Footer from "./components/Footer";
import InstructorRequest from "./pages/InstructorRequest";



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
          <Route
            path="/learn/:id"
            element={
              <ProtectedRoute>
                <CourseLearn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute requiredCreator>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/:id"
            element={
              <ProtectedRoute requiredCreator>
                <CourseBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute requiredCreator>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-learning"
            element={
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRoute>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/become-instructor"
            element={
              <ProtectedRoute>
                <InstructorRequest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
