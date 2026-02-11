import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardData {
  total_courses: number;
  published_courses: number;
  unpublished_courses: number;
  total_enrollments: number;
  total_students: number;
}

function InstructorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/courses/instructor/dashboard/");
      setData(res.data);
    } catch (err) {
      console.error("Failed to load dashboard");
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Instructor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Courses" value={data.total_courses} />

        <StatCard title="Published Courses" value={data.published_courses} />

        <StatCard
          title="Unpublished Courses"
          value={data.unpublished_courses}
        />

        <StatCard title="Total Enrollments" value={data.total_enrollments} />

        <StatCard title="Total Students" value={data.total_students} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-gray-500 text-sm">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  );
}

export default InstructorDashboard;
