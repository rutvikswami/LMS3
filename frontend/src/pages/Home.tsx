import { useEffect, useState } from "react";
import api from "@/api/axios";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import HomeBanner from "@/components/HomeBanner";

// shadcn components
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")

  // Logic: Unchanged as per instructions
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/", {
          params: searchQuery ? {search: searchQuery}: {}
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Banner Section with refined animation */}
        <section className="animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5 ring-1 ring-slate-200/50">
            <HomeBanner />
          </div>
        </section>

        {/* Main Content Area */}
        <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">
                  Exploration Hub
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                All{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Courses
                </span>
              </h2>
              <p className="text-slate-500 text-sm font-medium max-w-md leading-relaxed">
                Unlock your potential with our meticulously structured learning
                paths designed for modern technical mastery.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="px-4 py-2 rounded-xl bg-white border-slate-200 shadow-sm flex items-center gap-2 group transition-all hover:border-primary/30"
              >
                <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                  Active Programs:
                </span>
                <span className="text-primary font-black text-sm transition-transform group-hover:scale-110">
                  {courses.length}
                </span>
              </Badge>
            </div>
          </div>

          <Separator className="bg-slate-200/60" />

          {/* Optimized Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.id} className="h-full">
                  <CourseCard course={course} />
                </div>
              ))
            ) : (
              // Empty State UI
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300 mb-4 ring-1 ring-slate-100">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold text-lg">
                  Initialising Modules...
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Retrieving the latest curriculum from the cloud.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
