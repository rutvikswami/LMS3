import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import type { CourseDetail, Chapter } from "@/types/course";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function CourseLearn() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}/`);
        setCourse(res.data);

        const firstChapter = res.data.sections?.[0]?.chapters?.[0] || null;

        setCurrentChapter(firstChapter);
      } catch (err) {
        console.error("Failed to load course");
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left: video */}
      <div className="flex-1 bg-black">
        {currentChapter?.video_url ? (
          <video
            src={currentChapter.video_url}
            controls
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Enroll to watch this video
          </div>
        )}
      </div>

      {/* Right: sections */}
      <div className="w-80 border-l bg-white overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Course Content</h2>

        <Accordion type="single" collapsible>
          {course.sections.map((section) => (
            <AccordionItem key={section.id} value={`section-${section.id}`}>
              <AccordionTrigger>{section.title}</AccordionTrigger>

              <AccordionContent>
                <ul className="space-y-2">
                  {section.chapters.map((chapter) => (
                    <li
                      key={chapter.id}
                      className="cursor-pointer p-2 rounded hover:bg-gray-100"
                      onClick={() => setCurrentChapter(chapter)}
                    >
                      {chapter.title}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default CourseLearn;
