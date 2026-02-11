import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import type { CourseDetail, Section, Chapter } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { DndContext, closestCenter } from "@dnd-kit/core";
import type{ DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function CourseBuilder() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);

  const [editCourse, setEditCourse] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const res = await api.get(`/courses/instructor/course/${id}/`);
    setCourse(res.data);
  };

  if (!course) return <div>Loading...</div>;

  // ============================
  // COURSE UPDATE
  // ============================

  const handleUpdateCourse = async () => {
    await api.patch(`/courses/${course.id}/update/`, {
      title: course.title,
      description: course.description,
      requirements: course.requirements,
    });

    setEditCourse(false);
  };

  const handleTogglePublish = async () => {
    await api.patch(`/courses/${course.id}/toggle-publish/`);
    fetchCourse();
  };

  // ============================
  // SECTION CRUD
  // ============================

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;

    await api.post("/courses/section/create/", {
      course: course.id,
      title: newSectionTitle,
    });

    setNewSectionTitle("");
    fetchCourse();
  };

  const handleUpdateSection = async (sectionId: number, title: string) => {
    await api.patch(`/courses/section/${sectionId}/update/`, { title });
    fetchCourse();
  };

  const handleDeleteSection = async (sectionId: number) => {
    await api.delete(`/courses/section/${sectionId}/delete/`);
    fetchCourse();
  };

  const handleSectionDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = course.sections.findIndex((s) => s.id === active.id);
    const newIndex = course.sections.findIndex((s) => s.id === over.id);

    const newSections = arrayMove(course.sections, oldIndex, newIndex);

    setCourse({
      ...course,
      sections: newSections,
    });

    await api.patch("/courses/section/reorder/", {
      sections: newSections.map((s, index) => ({
        id: s.id,
        order: index + 1,
      })),
    });
  };

  // ============================
  // CHAPTER CRUD
  // ============================

  const handleAddChapter = async (sectionId: number) => {
    await api.post("/courses/chapter/create/", {
      section: sectionId,
      title: "New Chapter",
      video_url: "",
      video_duration: 0,
    });

    fetchCourse();
  };

  const handleUpdateChapter = async (
    chapterId: number,
    data: Partial<Chapter>,
  ) => {
    await api.patch(`/courses/chapter/${chapterId}/update/`, data);
    fetchCourse();
  };

  const handleDeleteChapter = async (chapterId: number) => {
    await api.delete(`/courses/chapter/${chapterId}/delete/`);
    fetchCourse();
  };

  const handleChapterDragEnd = async (
    event: DragEndEvent,
    section: Section,
  ) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = section.chapters.findIndex((c) => c.id === active.id);
    const newIndex = section.chapters.findIndex((c) => c.id === over.id);

    const newChapters = arrayMove(section.chapters, oldIndex, newIndex);

    setCourse({
      ...course,
      sections: course.sections.map((s) =>
        s.id === section.id ? { ...s, chapters: newChapters } : s,
      ),
    });

    await api.patch("/courses/chapter/reorder/", {
      section_id: section.id,
      chapters: newChapters.map((c, index) => ({
        id: c.id,
        order: index + 1,
      })),
    });
  };

  // ============================
  // RENDER
  // ============================

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* COURSE HEADER */}
      <div className="space-y-4">
        {editCourse ? (
          <>
            <Input
              value={course.title}
              onChange={(e) =>
                setCourse({
                  ...course,
                  title: e.target.value,
                })
              }
            />
            <Textarea
              value={course.description}
              onChange={(e) =>
                setCourse({
                  ...course,
                  description: e.target.value,
                })
              }
            />
            <Button onClick={handleUpdateCourse}>Save</Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <Button onClick={() => setEditCourse(true)}>Edit Course</Button>
          </>
        )}

        <Button onClick={handleTogglePublish}>
          {course.is_published ? "Unpublish" : "Publish"}
        </Button>
      </div>

      {/* ADD SECTION */}
      <div className="flex gap-4">
        <Input
          placeholder="New section"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <Button onClick={handleAddSection}>Add Section</Button>
      </div>

      {/* SECTIONS DRAG */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleSectionDragEnd}
      >
        <SortableContext
          items={course.sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {course.sections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              onUpdateSection={handleUpdateSection}
              onDeleteSection={handleDeleteSection}
              onAddChapter={handleAddChapter}
              onUpdateChapter={handleUpdateChapter}
              onDeleteChapter={handleDeleteChapter}
              onChapterDragEnd={handleChapterDragEnd}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default CourseBuilder;

function SectionItem({
  section,
  onUpdateSection,
  onDeleteSection,
  onAddChapter,
  onUpdateChapter,
  onDeleteChapter,
  onChapterDragEnd,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editTitle, setEditTitle] = useState(section.title);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-4 rounded space-y-4 bg-white"
    >
      <div {...attributes} {...listeners} className="cursor-grab font-semibold">
        Section Drag
      </div>

      <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

      <div className="flex gap-2">
        <Button onClick={() => onUpdateSection(section.id, editTitle)}>
          Save
        </Button>

        <Button
          variant="destructive"
          onClick={() => onDeleteSection(section.id)}
        >
          Delete
        </Button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(e) => onChapterDragEnd(e, section)}
      >
        <SortableContext
          items={section.chapters.map((c: any) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {section.chapters.map((chapter: any) => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              onUpdate={onUpdateChapter}
              onDelete={onDeleteChapter}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button variant="secondary" onClick={() => onAddChapter(section.id)}>
        Add Chapter
      </Button>
    </div>
  );
}

function ChapterItem({
  chapter,
  onUpdate,
  onDelete,
}: {
  chapter: any;
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editData, setEditData] = useState({
    title: chapter.title || "",
    video_url: chapter.video_url || "",
    video_duration: chapter.video_duration || 0,
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-gray-100 rounded space-y-3"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-sm text-gray-500"
      >
        ☰ Drag
      </div>

      {/* Title */}
      <Input
        placeholder="Chapter Title"
        value={editData.title}
        onChange={(e) =>
          setEditData({
            ...editData,
            title: e.target.value,
          })
        }
      />

      {/* Video URL */}
      <Input
        placeholder="Video URL"
        value={editData.video_url}
        onChange={(e) =>
          setEditData({
            ...editData,
            video_url: e.target.value,
          })
        }
      />

      {/* Duration */}
      <Input
        type="number"
        placeholder="Video Duration (hours)"
        value={editData.video_duration}
        onChange={(e) =>
          setEditData({
            ...editData,
            video_duration: Number(e.target.value),
          })
        }
      />

      {/* Actions */}
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onUpdate(chapter.id, editData)}>
          Save
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(chapter.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
