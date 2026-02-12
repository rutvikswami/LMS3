import React, { useEffect, useState, createContext, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  PlayCircle,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
} from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/** * PROJECT IMPORTS
 * In your local project, uncomment these and remove the mock logic below.
 */
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import type { CourseDetail } from "@/types/course";

function CourseDetailPage() {
  // Use mocks for preview; your local code uses the real hooks
  const { id } = useParams();
  const navigate =  useNavigate();
  const { fetchEnrollments } = useAuth();

  const [course, setCourse] = useState<CourseDetail | null>(null); 

  // Logic: Unchanged as per instructions
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
      await fetchEnrollments();
      navigate(`/learn/${id}`);
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Initializing Module...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 relative pb-20">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px]" />
      </div>

      {/* Breadcrumbs / Back Navigation */}
      <div className="relative max-w-7xl mx-auto px-6 pt-10 z-10">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Catalog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-900">Module Detail</span>
        </nav>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Course Info (8 Cols) */}
          <div className="lg:col-span-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Hero Image / Video Placeholder */}
            <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white group">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-100">
                  <BookOpen className="w-20 h-20 text-slate-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-blue-950/10 transition-colors duration-500 flex items-center justify-center">
                <div className="p-6 rounded-full bg-white/90 backdrop-blur-md shadow-2xl transform transition-transform group-hover:scale-110">
                  <PlayCircle className="w-12 h-12 text-blue-900 fill-current" />
                </div>
              </div>
            </div>

            {/* Course Content Headers */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  Professional Curriculum
                </Badge>
                <div className="h-1 w-12 bg-slate-200 rounded-full" />
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-blue-950 leading-[0.95]">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{course.total_hours.toFixed(1)} Learning Hours</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Verified Certification</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Comprehensive Resources</span>
                </div>
              </div>

              <Separator className="bg-slate-200/60" />

              <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-900/60">
                  Module Abstract
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {course.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Action Card (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 animate-in fade-in slide-in-from-right-6 duration-1000 delay-200">
            <Card className="border-slate-200 shadow-2xl shadow-blue-900/10 rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-blue-950 tracking-tight">
                    Access Module
                  </CardTitle>
                  <CardDescription className="text-slate-500 font-medium">
                    Initialize your enrollment protocol
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      Time Allocation
                    </h3>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xl font-black text-blue-950">
                        {course.total_hours.toFixed(1)} Hours Total
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      Pre-requisites
                    </h3>
                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm font-medium leading-relaxed">
                      {course.requirements ||
                        "No specific entry parameters detected."}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <Button
                    className="w-full h-16 bg-blue-950 hover:bg-blue-900 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-950/20 transition-all active:scale-[0.98] group flex items-center justify-center gap-3 border-t border-white/10"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </Button>

                  <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest leading-relaxed px-4">
                    Immediate access to all technical documentation and video
                    modules upon authentication.
                  </p>
                </div>

                <Separator className="bg-slate-100" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Lifetime Repository Access
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Verified Accreditation
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <div className="mt-6 p-6 rounded-[2rem] bg-blue-50/50 border border-blue-100/50 flex items-center gap-4">
              <div className="bg-blue-600/10 p-3 rounded-xl">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest leading-none">
                  Faculty Support
                </p>
                <p className="text-xs font-semibold text-blue-600/70">
                  Direct Q&A with instructor active
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Status Footer */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 z-50 flex items-center justify-center gap-8 md:hidden">
        <div className="flex-1">
          <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
            Enrollment Node
          </p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {course.total_hours}H Duration
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleEnroll}
          className="bg-blue-950 font-black text-[10px] uppercase tracking-widest px-6 rounded-xl"
        >
          Enroll
        </Button>
      </div>
    </div>
  );
}

export default CourseDetailPage;
