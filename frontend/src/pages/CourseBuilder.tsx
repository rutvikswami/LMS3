import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  GripVertical,
  Plus,
  Save,
  Trash2,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowLeft,
  Cpu,
  Sparkles,
  Video,
  Clock,
  Settings2,
  CheckCircle2,
  Edit2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Dnd Kit
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import api from "@/api/axios";
import type { CourseDetail, Section, Chapter } from "@/types/course";


function CourseBuilder() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const navigate = useNavigate();
  const [editCourse, setEditCourse] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);


  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    const res = await api.get(`/courses/instructor/course/${id}/`);
    setCourse(res.data);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ============================
  // UNDERLYING WORKING (STRICTLY FROM YOUR SNIPPET)
  // ============================

  const handleUpdateCourse = async () => {
    try {
      const formData = new FormData();

      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("requirements", course.requirements);

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      await api.patch(`/courses/${course.id}/update/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchCourse();
      setEditCourse(false);
    } catch (err) {
      console.error("Failed to update course");
    }
  };


  const handleTogglePublish = async () => {
    if (!course) return;
    await api.patch(`/courses/${course.id}/toggle-publish/`);
    fetchCourse();
  };


  const handleAddSection = async () => {
    if (!newSectionTitle.trim() || !course) return;
    await api.post("/courses/section/", {
      course: course.id,
      title: newSectionTitle.trim(),
    });
    setNewSectionTitle("");
    fetchCourse();
  };

  const handleUpdateSection = async (sectionId: number, title: string) => {
    await api.patch(`/courses/section/${sectionId}/`, { title });
    fetchCourse();
  };

  const handleDeleteSection = async (sectionId: number) => {
    await api.delete(`/courses/section/${sectionId}/`);
    fetchCourse();
  };

  const handleSectionDragEnd = async (event: DragEndEvent) => {
    if (!course) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = course.sections.findIndex((s) => s.id === active.id);
    const newIndex = course.sections.findIndex((s) => s.id === over.id);
    const newSections = arrayMove(course.sections, oldIndex, newIndex);

    setCourse({ ...course, sections: newSections });

    await api.patch("/courses/section/reorder/", {
      sections: newSections.map((s, index) => ({
        id: s.id,
        order: index + 1,
      })),
    });
  };

  const handleAddChapter = async (sectionId: number) => {
    await api.post("/courses/chapter/", {
      section: sectionId,
      title: "New Chapter",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      video_duration: 1,
    });
    fetchCourse();
  };

  const handleUpdateChapter = async (
    chapterId: number,
    data: Partial<Chapter>,
  ) => {
    await api.patch(`/courses/chapter/${chapterId}/`, data);
    fetchCourse();
  };

  const handleDeleteChapter = async (chapterId: number) => {
    await api.delete(`/courses/chapter/${chapterId}/`);
    fetchCourse();
  };

  const handleChapterDragEnd = async (
    event: DragEndEvent,
    section: Section,
  ) => {
    if (!course) return;
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 relative pb-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-10 z-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="space-y-5">
            <Link
              to="/instructor/courses"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Instructor Catalog
            </Link>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-blue-900 rounded-full" />
                <Badge
                  variant="outline"
                  className="border-blue-200 bg-white text-blue-800 font-black uppercase tracking-widest text-[9px]"
                >
                  <Cpu className="w-3 h-3 mr-1.5" />
                  Builder Node
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-blue-950">
                Course <span className="text-blue-700">Builder</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleTogglePublish}
              className={`h-12 px-6 rounded-xl border-slate-200 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-sm ${course.is_published ? "text-amber-600 border-amber-100 hover:bg-amber-50" : "text-emerald-600 border-emerald-100 hover:bg-emerald-50"}`}
            >
              {course.is_published ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {course.is_published ? "Unpublish" : "Publish Module"}
            </Button>
            <Button
              onClick={() => navigate(`/learn/${course.id}`)}
              className="h-12 px-6 bg-blue-950 hover:bg-blue-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-blue-950/20"
            >
              Preview Mode
            </Button>
          </div>
        </div>

        {/* Core Configuration Card */}
        <Card className="border-slate-200 shadow-2xl shadow-blue-900/5 rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl text-blue-950">
                  Core Configuration
                </CardTitle>
                <CardDescription>
                  Primary metadata for the learning module
                </CardDescription>
              </div>
              <Settings2 className="w-5 h-5 text-blue-900/20" />
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {editCourse ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Title
                  </label>
                  <Input
                    value={course.title}
                    onChange={(e) =>
                      setCourse({ ...course, title: e.target.value })
                    }
                    className="h-12 border-slate-200 bg-slate-50/50 rounded-xl focus-visible:ring-blue-600/20 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Abstract
                  </label>
                  <Textarea
                    value={course.description}
                    onChange={(e) =>
                      setCourse({ ...course, description: e.target.value })
                    }
                    className="min-h-[120px] border-slate-200 bg-slate-50/50 rounded-xl focus-visible:ring-blue-600/20 leading-relaxed resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Thumbnail
                  </label>

                  {/* Preview */}
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt="Thumbnail"
                      className="w-40 rounded-lg mb-2"
                    />
                  )}

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setThumbnailFile(e.target.files?.[0] || null)
                    }
                    className="border-slate-200 bg-slate-50/50 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Requirements
                  </label>
                  <Textarea
                    value={course.requirements}
                    onChange={(e) =>
                      setCourse({ ...course, requirements: e.target.value })
                    }
                    className="min-h-[100px] border-slate-200 bg-slate-50/50 rounded-xl focus-visible:ring-blue-600/20 leading-relaxed resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="ghost"
                    onClick={() => setEditCourse(false)}
                    className="rounded-xl px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateCourse}
                    className="bg-blue-600 rounded-xl px-8 flex items-center gap-2 text-white"
                  >
                    <Save className="w-4 h-4" />
                    Sync Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between group">
                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black text-blue-950 tracking-tight">
                        {course.title}
                      </h2>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                        {course.description}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Requirements
                      </h3>
                      <p className="text-slate-500 text-sm italic">
                        {course.requirements || "None specified"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setEditCourse(true)}
                    className="h-10 w-10 p-0 rounded-full hover:bg-blue-50 text-blue-600"
                  >
                    <Settings2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Curriculum Structure Section */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-blue-950 tracking-tight">
                Curriculum Structure
              </h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Construct your learning path
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Input
                placeholder="New Section Title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="h-11 border-slate-200 bg-white rounded-xl focus-visible:ring-blue-600/20 w-full md:w-64"
              />
              <Button
                onClick={handleAddSection}
                className="h-11 px-6 bg-blue-950 text-white font-bold rounded-xl whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleSectionDragEnd}
          >
            <SortableContext
              items={course.sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
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
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="flex items-center justify-center gap-4 py-8 opacity-40">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Protocol Integrity Verified
          </span>
        </div>
      </div>
    </div>
  );
}

interface SectionItemProps {
  section: Section;
  onUpdateSection: (id: number, title: string) => void;
  onDeleteSection: (id: number) => void;
  onAddChapter: (id: number) => void;
  onUpdateChapter: (id: number, data: Partial<Chapter>) => void;
  onDeleteChapter: (id: number) => void;
  onChapterDragEnd: (event: DragEndEvent, section: Section) => void;
}

function SectionItem({
  section,
  onUpdateSection,
  onDeleteSection,
  onAddChapter,
  onUpdateChapter,
  onDeleteChapter,
  onChapterDragEnd,
}: SectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const [editTitle, setEditTitle] = useState(section.title);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white border rounded-[2rem] transition-all duration-300 ${isDragging ? "shadow-2xl border-blue-200" : "border-slate-200 shadow-sm hover:shadow-md"}`}
    >
      <div className="p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              {...attributes}
              {...listeners}
              className="p-2 rounded-lg bg-slate-50 text-slate-300 cursor-grab active:cursor-grabbing hover:bg-blue-50 hover:text-blue-400 transition-colors"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            {isEditing ? (
              <div className="flex-1 flex items-center gap-3">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="h-10 border-slate-200 bg-slate-50/50 rounded-lg focus-visible:ring-blue-600/20 font-bold flex-1"
                />
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    onClick={() => {
                      onUpdateSection(section.id, editTitle);
                      setIsEditing(false);
                    }}
                    className="bg-blue-600 h-9 rounded-lg text-white"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditTitle(section.title);
                      setIsEditing(false);
                    }}
                    className="h-9 rounded-lg text-slate-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-between">
                <h3 className="font-black text-xl text-blue-950 truncate">
                  {section.title}
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:bg-blue-50 rounded-lg h-9 w-9 p-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSection(section.id)}
                    className="text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg h-9 w-9 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chapters Area */}
        <div className="pl-12 space-y-4">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(e) => onChapterDragEnd(e, section)}
          >
            <SortableContext
              items={(section.chapters || []).map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {(section.chapters || []).map((chapter) => (
                  <ChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    onUpdate={onUpdateChapter}
                    onDelete={onDeleteChapter}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <Button
            variant="secondary"
            onClick={() => onAddChapter(section.id)}
            className="w-full h-12 rounded-2xl border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-blue-600 border-dashed border-2"
          >
            <Plus className="w-4 h-4" />
            Append New Chapter
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ChapterItemProps {
  chapter: Chapter;
  onUpdate: (id: number, data: Partial<Chapter>) => void;
  onDelete: (id: number) => void;
}

function ChapterItem({ chapter, onUpdate, onDelete }: ChapterItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : undefined,
  };

  const [editData, setEditData] = useState<Partial<Chapter>>({
    title: chapter.title || "",
    video_url: chapter.video_url || "",
    video_duration: chapter.video_duration || 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-2xl transition-all duration-300 border ${isDragging ? "shadow-xl bg-blue-50 border-blue-200" : "bg-slate-50/50 border-slate-100 hover:border-slate-200"}`}
    >
      {isEditing ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="flex items-center justify-between ml-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600/60">
              Chapter Configuration
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="h-7 w-7 p-0 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Chapter Title"
              type="string"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="h-10 bg-white border-slate-200 rounded-lg text-sm font-bold"
            />
            <Input
              placeholder="Video URL"
              value={editData.video_url || ""}
              onChange={(e) =>
                setEditData({ ...editData, video_url: e.target.value })
              }
              className="h-10 bg-white border-slate-200 rounded-lg text-sm"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-48">
              <Input
                type="number"
                placeholder="Duration (hrs)"
                value={editData.video_duration}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    video_duration: Number(e.target.value),
                  })
                }
                className="h-10 bg-white border-slate-200 rounded-lg text-sm"
              />
            </div>

            <Button
              size="sm"
              onClick={() => {
                onUpdate(chapter.id, editData);
                setIsEditing(false);
              }}
              className="bg-blue-600 rounded-lg h-9 px-6 font-bold text-white flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              Save Chapter
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 group/chapter">
          <div
            {...attributes}
            {...listeners}
            className="text-slate-300 hover:text-blue-400 cursor-grab active:cursor-grabbing transition-colors"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                <Video className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-slate-700 text-sm truncate">
                  {chapter.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {chapter.video_duration} Hours
                  </span>
                  {chapter.video_url && (
                    <span className="text-[9px] font-bold text-blue-500/60 truncate max-w-[120px]">
                      {chapter.video_url}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover/chapter:opacity-100 transition-all transform translate-x-2 group-hover/chapter:translate-x-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(chapter.id)}
                className="h-8 w-8 p-0 text-slate-300 hover:text-rose-600 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseBuilder;
