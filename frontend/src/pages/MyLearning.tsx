import { useEffect, useState } from "react";
import api from "@/api/axios";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

function MyLearning() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/my-enrollments/");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load enrolled courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Learning</h1>

      {courses.length === 0 ? (
        <p className="text-gray-500">
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              link={`/learn/${course.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearning;
