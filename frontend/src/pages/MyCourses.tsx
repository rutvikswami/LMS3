import { useEffect, useState } from "react";
import api from "@/api/axios";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/my-courses/");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load instructor courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>

        <Button asChild>
          <Link to="/create-course">Create Course</Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-500">You haven't created any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              link={`/instructor/course/${course.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
