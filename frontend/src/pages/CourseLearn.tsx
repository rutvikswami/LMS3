import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Play,
  CheckCircle2,
  ArrowLeft,
  Clock,
  User,
  Maximize2,
  Minimize2,
  ListVideo,
  Info,
  Layout,
  MessageSquare,
  StickyNote,
  Megaphone,
  Star,
} from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import api from "@/api/axios";
import type { CourseDetail, Chapter } from "@/types/course";

function CourseLearn() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [isWideMode, setIsWideMode] = useState(false);

  // CORE FETCH & PERMISSION LOGIC (STRICTLY PRESERVED)
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/learn/${id}/`);
        setCourse(res.data);

        const firstChapter = res.data.sections?.[0]?.chapters?.[0] || null;
        setCurrentChapter(firstChapter);
      } catch (err: any) {
        if (err.response?.status === 403) {
          navigate(`/course/${id}`);
        } else {
          console.error("Failed to load course");
        }
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const getEmbedUrl = (url: string | null) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;
    }
    return url;
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100/50">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 overflow-hidden">
          <Link
            to="/my-learning"
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-900 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-sm font-black text-slate-900 truncate max-w-[200px] md:max-w-md leading-none tracking-tight">
              {course.title}
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] truncate">
                {currentChapter?.title || "Selecting Transmission..."}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsWideMode(!isWideMode)}
            className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-10 px-4 rounded-none border border-slate-200"
          >
            {isWideMode ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
            <span className="ml-2 hidden md:inline text-[10px] font-black uppercase tracking-widest">
              {isWideMode ? "Standard" : "Wide Mode"}
            </span>
          </Button>
        </div>
      </header>

      {/* Main Full-Width Layout */}
      <main className="w-full transition-all duration-500 ease-in-out">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Display: Video Player + Content Below */}
          <div
            className={`${isWideMode ? "lg:col-span-12" : "lg:col-span-9"} bg-white`}
          >
            {/* Rectangular Video Interface (No rounded edges) */}
            <div
              className={`relative bg-slate-900 transition-all duration-700 overflow-hidden shadow-lg ${isWideMode ? "aspect-[21/9]" : "aspect-video"}`}
            >
              {currentChapter?.video_url ? (
                <iframe
                  className="w-full h-full rounded-none"
                  src={getEmbedUrl(currentChapter.video_url) || ""}
                  title={currentChapter.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-6 text-slate-400 bg-slate-100">
                  <div className="p-8 bg-white rounded-none border border-slate-200 shadow-sm">
                    <Play className="w-16 h-16 text-slate-300" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.4em]">
                    Select Unit to Begin Transmission
                  </p>
                </div>
              )}
            </div>

            {/* Information Hub (Below Video) */}
            <div className="max-w-6xl mx-auto py-12 px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-slate-100 border border-slate-200 p-1 h-12 rounded-none mb-10 w-full justify-start overflow-x-auto no-scrollbar">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-[0.15em] px-8 transition-all h-full"
                  >
                    <Info className="w-3.5 h-3.5 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="qa"
                    className="rounded-none data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-[0.15em] px-8 transition-all h-full"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                    Q&A
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-none data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-[0.15em] px-8 transition-all h-full"
                  >
                    <StickyNote className="w-3.5 h-3.5 mr-2" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger
                    value="announcements"
                    className="rounded-none data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-[0.15em] px-8 transition-all h-full"
                  >
                    <Megaphone className="w-3.5 h-3.5 mr-2" />
                    Announcements
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-[0.15em] px-8 transition-all h-full"
                  >
                    <Star className="w-3.5 h-3.5 mr-2" />
                    Reviews
                  </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent
                  value="overview"
                  className="space-y-12 focus-visible:ring-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">
                          Module Objective
                        </h3>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                          {course.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">
                          System Pre-requisites
                        </h4>
                        <div className="p-8 bg-slate-50 border border-slate-200 rounded-none">
                          <ul className="space-y-4">
                            {course.requirements.split("\n").map((req, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-4 text-slate-700"
                              >
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                                <span className="font-medium text-sm md:text-base">
                                  {req}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-4 space-y-8 border-l border-slate-200 pl-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                          Faculty Lead
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <User className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h5 className="font-black text-slate-900 text-lg">
                              {course.creator_name || "Staff Educator"}
                            </h5>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                              Verified Instructor
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-slate-200" />

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                          Technical Spec
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-widest">
                              Total Volume
                            </span>
                            <span className="text-slate-900 font-black">
                              {course.total_hours}H
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-widest">
                              Protocol
                            </span>
                            <span className="text-blue-600 font-black tracking-tighter">
                              V3.0 TERMINAL
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-widest">
                              Access Mode
                            </span>
                            <span className="text-slate-900 font-black">
                              Lifetime Node
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Placeholder Tabs */}
                {["qa", "notes", "announcements", "reviews"].map((tab) => (
                  <TabsContent
                    key={tab}
                    value={tab}
                    className="focus-visible:ring-0"
                  >
                    <div className="p-20 flex flex-col items-center justify-center text-center space-y-6 border border-slate-200 bg-slate-50">
                      <div className="h-16 w-16 bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <Layout className="w-8 h-8 text-slate-300" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest">
                          Protocol Link Pending
                        </h4>
                        <p className="text-sm text-slate-500 font-medium max-w-sm">
                          The {tab} interface is currently undergoing system
                          calibration and will be synchronized in a future
                          update.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* Right Column: Curriculum Navigation (Hidden when wide) */}
          {!isWideMode && (
            <div className="lg:col-span-3 border-l border-slate-200 h-full min-h-[calc(100vh-64px)] flex flex-col bg-slate-50">
              <div className="p-6 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <ListVideo className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">
                    Curriculum_Log
                  </h3>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-0">
                  <Accordion
                    type="multiple"
                    defaultValue={[`section-${course.sections?.[0]?.id}`]}
                    className="w-full"
                  >
                    {course.sections.map((section, sIndex) => (
                      <AccordionItem
                        key={section.id}
                        value={`section-${section.id}`}
                        className="border-b border-slate-200"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-100 transition-colors text-left group">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-400">
                              0{sIndex + 1}
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-600 group-hover:text-slate-900">
                              {section.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                          <div className="flex flex-col">
                            {section.chapters.map((chapter) => (
                              <button
                                key={chapter.id}
                                onClick={() => setCurrentChapter(chapter)}
                                className={`w-full flex items-center gap-4 px-8 py-4 border-l-2 transition-all text-left group ${currentChapter?.id === chapter.id ? "bg-blue-50 border-blue-600" : "bg-transparent border-transparent hover:bg-slate-100"}`}
                              >
                                <div
                                  className={`p-1.5 transition-all ${currentChapter?.id === chapter.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
                                >
                                  <Play
                                    className={`w-3.5 h-3.5 ${currentChapter?.id === chapter.id ? "fill-current" : ""}`}
                                  />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                  <p
                                    className={`text-[12px] font-bold truncate transition-colors ${currentChapter?.id === chapter.id ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}
                                  >
                                    {chapter.title || "Unit_Transmission"}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5 opacity-70">
                                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                      {chapter.video_duration} Hours
                                    </span>
                                  </div>
                                </div>
                                {currentChapter?.id === chapter.id && (
                                  <div className="h-1 w-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                )}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </main>

      {/* Global Status Footer */}
      <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <div className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
            <span>LINK_SECURE</span>
          </div>
          <Separator orientation="vertical" className="h-3 bg-slate-200" />
          <span>BL-OS TERMINAL v3.0.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-300">
            ENCRYPTED_STREAM_ID: {course.id}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default CourseLearn;
