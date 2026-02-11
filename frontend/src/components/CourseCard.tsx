import { Link } from "react-router-dom";
import type { Course } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  course: Course;
  link?: string;
};

function CourseCard({ course, link }: Props) {
  const target = link ?? `/course/${course.id}`;

  return (
    <Link to={target}>
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

          <p className="text-sm mt-2">{course.total_hours.toFixed(1)} hours</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
