import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Zap,
  ArrowRight,
  Clock,
  Search,
} from "lucide-react";
import api from "@/api/axios";
import type { Course } from "@/types/course";
// shadcn components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/CourseCard";

function MyLearning() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/courses/my-enrollments/");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load enrolled courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600/70">
                  Student Dashboard
                </span>
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">
                    My Learning
                  </span>
                </h1>
                <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl">
                  Track your progress and continue your journey toward mastering
                  professional skills.
                </p>
              </div>
            </div>

            {!isLoading && courses.length > 0 && (
              <div className="flex items-center gap-4 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="bg-blue-50 p-2.5 rounded-xl">
                  <Zap className="w-5 h-5 text-blue-600 fill-current" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 leading-none">
                    {courses.length}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">
                    Enrolled Courses
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Rendering */}
          {isLoading ? (
            /* Loading State Skeleton */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-3xl bg-slate-200/60" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-slate-200/60" />
                    <Skeleton className="h-3 w-1/2 bg-slate-200/60" />
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            /* Professional Empty State */
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center space-y-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-blue-100 rounded-full animate-pulse" />
                <div className="relative p-8 bg-blue-50 rounded-3xl border border-blue-100">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  No active enrollments
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                  It looks like you haven't started any courses yet. Explore our
                  catalog to begin your learning journey.
                </p>
              </div>

              <Button
                asChild
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                <Link to="/">
                  Browse Catalog
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          ) : (
            /* Course Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="animate-in fade-in zoom-in-95 duration-500"
                >
                  <CourseCard course={course} link={`/learn/${course.id}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLearning;
