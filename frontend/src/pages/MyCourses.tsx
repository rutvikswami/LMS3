import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Layout,
  GraduationCap,
  Cpu,
  Sparkles,
  ArrowRight,
  BookOpen,
  Clock,
  MoreVertical,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


import api from "@/api/axios";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  // Logic: Unchanged as per instructions
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/courses/my-courses/");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load instructor courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 relative pb-20">
      {/* Soft Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 z-10 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-slate-200 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-blue-900 rounded-full" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
                <Cpu className="w-3 h-3 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Curriculum Management
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-blue-950">
                My <span className="text-blue-700">Courses</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed">
                Manage your created modules, monitor distribution status, and
                initialize new educational paths.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="hidden sm:flex h-fit py-2.5 px-5 rounded-xl border-blue-200 bg-white text-blue-800 font-black uppercase tracking-widest text-[10px] shadow-sm"
            >
              <Sparkles className="w-3 h-3 mr-2 text-blue-600" />
              Instructor Mode
            </Badge>
            <Button
              asChild
              className="h-14 px-8 bg-blue-950 hover:bg-blue-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3 border-t border-white/10"
            >
              <Link to="/create-course">
                <Plus className="w-4 h-4" />
                Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-[2rem] bg-white border border-slate-100" />
                <Skeleton className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center space-y-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm transition-all hover:shadow-xl group">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-blue-100 rounded-full animate-pulse" />
              <div className="relative p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-transform duration-500 group-hover:scale-110">
                <BookOpen className="w-16 h-16 text-blue-950 opacity-20" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-blue-950">
                No courses detected
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                You haven't initialized any learning modules yet. Start your
                journey as an instructor by creating your first course.
              </p>
            </div>

            <Button
              asChild
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
            >
              <Link to="/create-course">Initialize First Course</Link>
            </Button>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-both">
            {courses.map((course) => (
              <div key={course.id}>
                <CourseCard
                  course={course}
                  link={`/instructor/course/${course.id}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* System Footer Tag */}
        <div className="flex items-center justify-center gap-6 pt-10 border-t border-slate-200/60">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Course Protocols Verified
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-2 text-slate-400">
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Faculty Access Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
