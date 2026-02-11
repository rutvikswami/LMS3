import React, { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { Clock, User, PlayCircle, BookOpen } from "lucide-react";

// shadcn components
import { Card, CardContent } from "@/components/ui/card";

// Types
import type { Course } from "@/types/course";

/** * NOTE FOR PREVIEW: Mocking dependencies to prevent compilation errors in this environment.
 * In your project, these will resolve correctly from your existing files.
 */
// import { useAuth } from "@/context/AuthContext";
// import { isAllowed } from "@/utils/auth";

// --- MOCK LOGIC (Remove in your local project) ---
const AuthContext = createContext({
  user: { id: 1 },
  enrolledCourses: [1, 2] as number[],
});
const useAuth = () => useContext(AuthContext);
const isAllowed = (perm: string) => true;
// --- END MOCK ---

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
    if (isAllowed("creator") && course.creator_id === user.id) {
      return `/learn/${course.id}`;
    }
    if (enrolledCourses.includes(course.id)) {
      return `/learn/${course.id}`;
    }
    return `/course/${course.id}`;
  };

  return (
    <Link to={getTargetLink()} className="block group">
      <Card className="h-full overflow-hidden border-none bg-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.99]">
        {/* Image Container with tighter Aspect Ratio */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground/20">
              <BookOpen className="w-10 h-10" />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 p-2.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <PlayCircle className="w-5 h-5 text-primary fill-current" />
            </div>
          </div>
        </div>

        <CardContent className="p-3.5 space-y-2.5">
          <div className="space-y-1.5">
            <h3 className="font-bold text-[15px] leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors min-h-[40px]">
              {course.title}
            </h3>

            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                <User className="w-2.5 h-2.5 text-primary" />
              </div>
              <span className="text-[11px] font-medium truncate">
                {course.creator_name}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-muted/30">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-[11px] font-bold tracking-tight">
                {course.total_hours?.toFixed(1)} hrs
              </span>
            </div>

            <div className="text-[10px] font-black uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Go <PlayCircle className="w-2.5 h-2.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
