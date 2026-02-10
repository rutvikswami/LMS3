import { useEffect, useState } from "react";
import api from "@/api/axios";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import HomeBanner from "@/components/HomeBanner";

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <HomeBanner />

      <h2 className="text-2xl font-bold mb-6">All Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Home;
