import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import type { CourseDetail, Section } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CourseBuilder() {
  const { id } = useParams();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const [chapterInputs, setChapterInputs] = useState<{
    [key: number]: {
      title: string;
      video_url: string | null;
      video_duration: number | null;
    };
  }>({});

  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingChapterId, setEditingChapterId] = useState<number | null>(null);
  const [editSectionTitle, setEditSectionTitle] = useState("");

  const [editChapterData, setEditChapterData] = useState<{
    title: string;
    video_url: string;
    video_duration: number;
  }>({
    title: "",
    video_url: "",
    video_duration: 0,
  });


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


  const handleTogglePublish = async () => {
    try {
      await api.patch(`/courses/${course?.id}/toggle-publish/`);
      fetchCourse();
    } catch (err: any) {
      console.log(err.response?.data);
      alert(err.response?.data);
    }
  };


  // ===============================
  // SECTION CREATE
  // ===============================

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;

    try {
      await api.post("/courses/section/create/", {
        course: id,
        title: newSectionTitle.trim(),
      });

      setNewSectionTitle("");
      fetchCourse();
    } catch (err: any) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  // ===============================
  // SECTION DELETE
  // ===============================

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm("Delete this section?")) return;

    try {
      await api.delete(`/courses/section/${sectionId}/delete/`);
      fetchCourse();
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Failed to delete section");
    }
  };

  // ===============================
  // SECTION UPDATE
  // ===============================

  const handleUpdateSection = async (sectionId: number) => {
    if (!editSectionTitle.trim()) return;

    try {
      await api.patch(`/courses/section/${sectionId}/update/`, {
        title: editSectionTitle.trim(),
      });

      setEditingSectionId(null);
      fetchCourse();
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Failed to update section");
    }
  };

  // ===============================
  // CHAPTER STATE UPDATE (CLEAN)
  // ===============================

  const updateChapterInput = (
    sectionId: number,
    field: "title" | "video_url" | "video_duration",
    value: string | number,
  ) => {
    setChapterInputs((prev) => ({
      ...prev,
      [sectionId]: {
        title: prev[sectionId]?.title || "",
        video_url: prev[sectionId]?.video_url || "",
        video_duration: prev[sectionId]?.video_duration || 0,
        [field]: value,
      },
    }));
  };

  // ===============================
  // CHAPTER CREATE
  // ===============================

  const handleAddChapter = async (sectionId: number) => {
    const input = chapterInputs[sectionId];

    if (
      !input?.title?.trim() ||
      !input?.video_url?.trim() ||
      !input?.video_duration
    ) {
      alert("All chapter fields are required.");
      return;
    }

    try {
      await api.post("/courses/chapter/create/", {
        section: sectionId,
        title: input.title.trim(),
        video_url: input.video_url.trim(),
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
    } catch (err: any) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  // ===============================
  // CHAPTER DELETE
  // ===============================

  const handleDeleteChapter = async (chapterId: number) => {
    if (!confirm("Delete this chapter?")) return;

    try {
      await api.delete(`/courses/chapter/${chapterId}/delete/`);
      fetchCourse();
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Failed to delete chapter");
    }
  };

  // ===============================
  // CHAPTER UPDATE
  // ===============================

  const handleUpdateChapter = async (chapterId: number) => {
    if (
      !editChapterData.title.trim() ||
      !editChapterData.video_url.trim() ||
      !editChapterData.video_duration
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      await api.patch(`/courses/chapter/${chapterId}/update/`, {
        title: editChapterData.title.trim(),
        video_url: editChapterData.video_url.trim(),
        video_duration: editChapterData.video_duration,
      });

      setEditingChapterId(null);
      setEditChapterData({
        title: "",
        video_url: "",
        video_duration: 0,
      });

      fetchCourse();
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Failed to update chapter");
    }
  };


  if (!course) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Course Builder: {course.title}</h1>

        <Button
          variant={course.is_published ? "secondary" : "default"}
          onClick={handleTogglePublish}
        >
          {course.is_published ? "Unpublish" : "Publish"}
        </Button>
      </div>

      {/* ===============================
          ADD SECTION
         =============================== */}
      <div className="flex gap-4">
        <Input
          placeholder="New section title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <Button onClick={handleAddSection}>Add Section</Button>
      </div>

      {/* ===============================
          SECTIONS
         =============================== */}
      <div className="space-y-6">
        {course.sections.map((section: Section) => (
          <div key={section.id} className="border rounded-lg p-4 space-y-4">
            {/* SECTION HEADER */}
            <div className="flex justify-between items-center">
              {editingSectionId === section.id ? (
                <div className="flex gap-2 w-full">
                  <Input
                    value={editSectionTitle}
                    onChange={(e) => setEditSectionTitle(e.target.value)}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleUpdateSection(section.id)}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingSectionId(null);
                      setEditSectionTitle("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-semibold text-lg">{section.title}</h2>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingSectionId(section.id);
                        setEditSectionTitle(section.title);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* CHAPTERS */}
            <ul className="space-y-2">
              {section.chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="flex justify-between items-center text-sm text-gray-600"
                >
                  {editingChapterId === chapter.id ? (
                    <div className="flex flex-col gap-2 w-full">
                      <Input
                        value={editChapterData.title}
                        onChange={(e) =>
                          setEditChapterData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />

                      <Input
                        value={editChapterData.video_url}
                        onChange={(e) =>
                          setEditChapterData((prev) => ({
                            ...prev,
                            video_url: e.target.value,
                          }))
                        }
                      />

                      <Input
                        type="number"
                        value={editChapterData.video_duration}
                        onChange={(e) =>
                          setEditChapterData((prev) => ({
                            ...prev,
                            video_duration: Number(e.target.value),
                          }))
                        }
                      />

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateChapter(chapter.id)}
                        >
                          Save
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingChapterId(null);
                            setEditChapterData({
                              title: "",
                              video_url: "",
                              video_duration: 0,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {chapter.title}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingChapterId(chapter.id);
                            setEditChapterData({
                              title: chapter.title || "",
                              video_url: chapter.video_url || "",
                              video_duration: chapter.video_duration || 0,
                            });
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteChapter(chapter.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {/* ADD CHAPTER */}
            <div className="flex flex-col gap-2 mt-4">
              <Input
                placeholder="Chapter title"
                value={chapterInputs[section.id]?.title || ""}
                onChange={(e) =>
                  updateChapterInput(section.id, "title", e.target.value)
                }
              />

              <Input
                placeholder="Video URL"
                value={chapterInputs[section.id]?.video_url || ""}
                onChange={(e) =>
                  updateChapterInput(section.id, "video_url", e.target.value)
                }
              />

              <Input
                type="number"
                placeholder="Video Duration (in hours)"
                value={chapterInputs[section.id]?.video_duration || ""}
                onChange={(e) =>
                  updateChapterInput(
                    section.id,
                    "video_duration",
                    Number(e.target.value),
                  )
                }
              />

              <Button onClick={() => handleAddChapter(section.id)}>
                Add Chapter
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseBuilder;
