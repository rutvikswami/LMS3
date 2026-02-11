import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import type { CourseDetail, Section, Chapter } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function CourseBuilder() {
  const { id } = useParams();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const [chapterInputs, setChapterInputs] = useState<{
    [key: number]: {
      title: string;
      video_url: string;
      video_duration: number;
    };
  }>({});

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/instructor/course/${id}/`);
      setCourse(res.data);
    } catch (err) {
      console.error("Failed to load course");
    }
  };

  // ===============================
  // PUBLISH TOGGLE
  // ===============================

  const handleTogglePublish = async () => {
    await api.patch(`/courses/${course?.id}/toggle-publish/`);
    fetchCourse();
  };

  // ===============================
  // SECTION CREATE
  // ===============================

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;

    await api.post("/courses/section/create/", {
      course: id,
      title: newSectionTitle.trim(),
    });

    setNewSectionTitle("");
    fetchCourse();
  };

  // ===============================
  // CHAPTER CREATE
  // ===============================

  const handleAddChapter = async (sectionId: number) => {
    const input = chapterInputs[sectionId];
    if (!input) return;

    if (!input.title || !input.video_url || !input.video_duration) {
      alert("All fields required");
      return;
    }

    await api.post("/courses/chapter/create/", {
      section: sectionId,
      title: input.title,
      video_url: input.video_url,
      video_duration: input.video_duration,
    });

    setChapterInputs((prev) => ({
      ...prev,
      [sectionId]: {
        title: "",
        video_url: "",
        video_duration: 0,
      },
    }));

    fetchCourse();
  };

  // ===============================
  // CHAPTER DELETE
  // ===============================

  const handleDeleteChapter = async (chapterId: number) => {
    await api.delete(`/courses/chapter/${chapterId}/delete/`);
    fetchCourse();
  };

  // ===============================
  // DRAG REORDER
  // ===============================

  const handleDragEnd = async (event: DragEndEvent, section: Section) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = section.chapters.findIndex((c) => c.id === active.id);

    const newIndex = section.chapters.findIndex((c) => c.id === over.id);

    const newChapters = arrayMove(section.chapters, oldIndex, newIndex);

    // Update UI instantly
    setCourse((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === section.id ? { ...s, chapters: newChapters } : s,
        ),
      };
    });

    // Send to backend
    await api.patch("/courses/chapter/reorder/", {
      section_id: section.id,
      chapters: newChapters.map((c, index) => ({
        id: c.id,
        order: index + 1,
      })),
    });
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Course Builder: {course.title}</h1>

        <Button onClick={handleTogglePublish}>
          {course.is_published ? "Unpublish" : "Publish"}
        </Button>
      </div>

      {/* ADD SECTION */}
      <div className="flex gap-4">
        <Input
          placeholder="New section title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <Button onClick={handleAddSection}>Add Section</Button>
      </div>

      {/* SECTIONS */}
      {course.sections.map((section) => (
        <div key={section.id} className="border rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold">{section.title}</h2>

          {/* DRAG CONTEXT */}
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, section)}
          >
            <SortableContext
              items={section.chapters.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {section.chapters.map((chapter) => (
                <SortableItem
                  key={chapter.id}
                  chapter={chapter}
                  onDelete={handleDeleteChapter}
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* ADD CHAPTER */}
          <div className="flex flex-col gap-2 mt-4">
            <Input
              placeholder="Chapter title"
              value={chapterInputs[section.id]?.title || ""}
              onChange={(e) =>
                setChapterInputs((prev) => ({
                  ...prev,
                  [section.id]: {
                    ...prev[section.id],
                    title: e.target.value,
                    video_url: prev[section.id]?.video_url || "",
                    video_duration: prev[section.id]?.video_duration || 0,
                  },
                }))
              }
            />

            <Input
              placeholder="Video URL"
              value={chapterInputs[section.id]?.video_url || ""}
              onChange={(e) =>
                setChapterInputs((prev) => ({
                  ...prev,
                  [section.id]: {
                    ...prev[section.id],
                    title: prev[section.id]?.title || "",
                    video_url: e.target.value,
                    video_duration: prev[section.id]?.video_duration || 0,
                  },
                }))
              }
            />

            <Input
              type="number"
              placeholder="Video Duration"
              value={chapterInputs[section.id]?.video_duration || ""}
              onChange={(e) =>
                setChapterInputs((prev) => ({
                  ...prev,
                  [section.id]: {
                    ...prev[section.id],
                    title: prev[section.id]?.title || "",
                    video_url: prev[section.id]?.video_url || "",
                    video_duration: Number(e.target.value),
                  },
                }))
              }
            />

            <Button onClick={() => handleAddChapter(section.id)}>
              Add Chapter
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseBuilder;

// ===============================
// SORTABLE ITEM COMPONENT
// ===============================

function SortableItem({
  chapter,
  onDelete,
}: {
  chapter: Chapter;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-gray-100 rounded flex justify-between items-center cursor-grab"
    >
      <span>{chapter.title}</span>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(chapter.id)}
      >
        Delete
      </Button>
    </div>
  );
}
