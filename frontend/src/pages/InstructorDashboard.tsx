import React, { useEffect, useState } from "react";
import {
  Layout,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Cpu,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

// shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import api from "@/api/axios";

interface DashboardData {
  total_courses: number;
  published_courses: number;
  unpublished_courses: number;
  total_enrollments: number;
  total_students: number;
}

function InstructorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null); 

  // Logic: Unchanged as per instructions
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

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 md:p-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <Skeleton className="h-12 w-64 bg-slate-200 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-40 bg-white rounded-[2rem] border border-slate-100"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 relative pb-20">
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]" />
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
                  Instructor Node v3.0
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-blue-950">
                Instructor <span className="text-blue-700">Dashboard</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
                Comprehensive overview of your curriculum reach and student
                engagement metrics.
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="h-fit py-2.5 px-5 rounded-xl border-blue-200 bg-white text-blue-800 font-black uppercase tracking-widest text-[10px] shadow-sm"
          >
            <Sparkles className="w-3 h-3 mr-2 text-blue-600" />
            Live Analytics
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-both">
          <StatCard
            title="Total Courses"
            value={data.total_courses}
            icon={<Layout className="w-5 h-5" />}
            description="Active Learning Modules"
            theme="darkBlue"
          />

          <StatCard
            title="Published"
            value={data.published_courses}
            icon={<CheckCircle className="w-5 h-5" />}
            description="Live for Enrollment"
            theme="blue"
          />

          <StatCard
            title="Drafts"
            value={data.unpublished_courses}
            icon={<BookOpen className="w-5 h-5" />}
            description="In Development"
            theme="slate"
          />

          <StatCard
            title="Enrollments"
            value={data.total_enrollments}
            icon={<TrendingUp className="w-5 h-5" />}
            description="Total seat registrations"
            theme="indigo"
          />

          <StatCard
            title="Active Students"
            value={data.total_students}
            icon={<Users className="w-5 h-5" />}
            description="Unique participants"
            theme="navy"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description, theme }) {
  // Theme definitions for Dark Blue accents on White/Gray
  const themes = {
    darkBlue: "bg-blue-950 text-white icon-bg-blue-800 shadow-blue-900/10",
    blue: "bg-white text-blue-950 icon-bg-blue-50 border-blue-100 shadow-blue-100/50",
    indigo:
      "bg-white text-indigo-950 icon-bg-indigo-50 border-indigo-100 shadow-indigo-100/50",
    slate:
      "bg-white text-slate-900 icon-bg-slate-50 border-slate-200 shadow-slate-200/50",
    navy: "bg-blue-900 text-white icon-bg-blue-700 shadow-blue-900/10",
  };

  const isDark = theme === "darkBlue" || theme === "navy";

  return (
    <Card
      className={`rounded-[2.5rem] border overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${themes[theme]} ${!isDark ? "border-slate-100" : "border-transparent"}`}
    >
      <CardContent className="p-8 relative">
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-30 transition-opacity">
          <ArrowUpRight className="w-6 h-6" />
        </div>

        <div className="space-y-8">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm
            ${isDark ? "bg-white/10 text-white" : "bg-blue-50 text-blue-700"}`}
          >
            {icon}
          </div>

          <div className="space-y-1">
            <h2
              className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? "text-blue-200/60" : "text-slate-400"}`}
            >
              {title}
            </h2>
            <div className="flex items-baseline gap-3">
              <p className="text-6xl font-black tracking-tighter">{value}</p>
              <div
                className={`h-1.5 w-10 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-100"}`}
              >
                <div
                  className={`h-full w-3/4 animate-pulse ${isDark ? "bg-blue-400" : "bg-blue-600"}`}
                />
              </div>
            </div>
          </div>

          <p
            className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? "text-blue-200/40" : "text-slate-400"}`}
          >
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorDashboard;
