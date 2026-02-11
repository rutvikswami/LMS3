import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import type { CourseDetail } from "@/types/course";
import { Button } from "@/components/ui/button";

function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetail | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}/`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course");
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll/`);
      navigate(`/learn/${id}`);
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side: course info */}
      <div className="lg:col-span-2 space-y-6">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full rounded-lg"
          />
        )}

        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      {/* Right side: enroll card */}
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {course.total_hours.toFixed(1)} hours
        </h2>

        <Button className="w-full" onClick={handleEnroll}>
          Enroll Now
        </Button>

        <div>
          <h3 className="font-semibold mb-2">Requirements</h3>
          <p className="text-sm text-gray-600">
            {course.requirements || "None"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
