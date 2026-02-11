import { Link } from "react-router-dom";
import type { Course } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { isAllowed } from "@/utils/auth";

type Props = {
  course: Course;
  link?: string;
};

function CourseCard({ course, link }: Props) {
  const { user, enrolledCourses } = useAuth();

  const getTargetLink = () => {
    // If link manually passed → override
    if (link) return link;

    // Not logged in
    if (!user) return `/course/${course.id}`;

    // If creator and this is own course → builder
    if (isAllowed("creator") && course.creator_id === user.id) {
      return `/learn/${course.id}`;
    }

    if (enrolledCourses.includes(course.id)) {
      return `/learn/${course.id}`;
    }

    // Default → course landing page
    return `/course/${course.id}`;
  };

  return (
    <Link to={getTargetLink()}>
      <Card className="hover:shadow-lg transition cursor-pointer">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-40 object-cover rounded-t"
          />
        )}

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>

          <p className="text-sm text-gray-500">{course.creator_name}</p>

          <p className="text-sm mt-2">{course.total_hours?.toFixed(1)} hours</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
