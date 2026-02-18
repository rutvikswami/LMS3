import React from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  User,
  PlayCircle,
  BookOpen,
  ArrowRight,
  Star,
} from "lucide-react";

// shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Project Imports (Underlying code preserved)
import { useAuth } from "@/context/AuthContext";
import Authorization from "@/utils/auth";

// Types
import type { Course } from "@/types/course";

type Props = {
  course: Course;
  link?: string;
};

function CourseCard({ course, link }: Props) {
  const { user, enrolledCourses } = useAuth();

  // Logic: Unchanged as per instructions
  const getTargetLink = () => {
    if (link) return link;
    if (!user) return `/course/${course.id}`;
    if (
      Authorization.isAuthenticated("create_course") &&
      course.creator_id === user.id
    ) {
      return `/learn/${course.id}`;
    }
    if (enrolledCourses.includes(course.id)) {
      return `/learn/${course.id}`;
    }
    return `/course/${course.id}`;
  };

  return (
    <Link to={getTargetLink()} className="block group">
      <Card className="h-full overflow-hidden border-slate-200 bg-white hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-2 active:scale-[0.99] rounded-3xl relative">
        {/* Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-300">
              <BookOpen className="w-12 h-12" />
            </div>
          )}

          {/* Glassmorphism Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white/90 p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <PlayCircle className="w-8 h-8 text-primary fill-current" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur-md border-none text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm"
            >
              Professional
            </Badge>
          </div>

          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[10px] font-medium border border-white/10">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          <div className="space-y-3">
            {/* Creator Attribution */}
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <User className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[150px]">
                {course.creator_name}
              </span>
            </div>

            <h3 className="font-bold text-lg leading-snug tracking-tight text-slate-900 group-hover:text-primary transition-colors min-h-[3rem] line-clamp-2">
              {course.title}
            </h3>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Bottom Meta Information */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-slate-500">
              <div className="p-1.5 rounded-md bg-slate-50">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-600">
                {course.total_hours?.toFixed(1)}{" "}
                <span className="text-slate-400 font-medium">Hrs</span>
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-0 text-primary hover:bg-transparent font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all"
            >
              Learn
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
