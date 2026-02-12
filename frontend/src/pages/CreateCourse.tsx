import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GraduationCap,
  Plus,
  FileText,
  Image as ImageIcon,
  ListChecks,
  Sparkles,
  Cpu,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- PROJECT IMPORTS (UNCOMMENT THESE IN YOUR LOCAL CODE) ---
import api from "@/api/axios";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Use <File | null> in TS

  const navigate = useNavigate();

  // Logic: Unchanged as per instructions - strictly preserving your project's data handling
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("requirements", requirements);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await api.post("/courses/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Course created successfully");
      navigate("/my-courses/"); 
    } catch (err: any) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 relative pb-20">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-12 md:py-20 z-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="space-y-5">
            <Link
              to="/instructor/courses"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Catalog
            </Link>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-blue-950">
                Initialize <span className="text-blue-700">Module</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed">
                Configure the core metadata and instructional parameters for
                your new learning path.
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="h-fit py-2.5 px-5 rounded-xl border-blue-200 bg-white text-blue-800 font-black uppercase tracking-widest text-[10px] shadow-sm"
          >
            <Cpu className="w-3 h-3 mr-2 text-blue-600" />
            V3.0 Protocol
          </Badge>
        </div>

        {/* Creation Form Card */}
        <Card className="border-slate-200 shadow-2xl shadow-blue-900/5 rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl text-blue-950">
                  Module Configuration
                </CardTitle>
                <CardDescription>
                  Enter primary curriculum details
                </CardDescription>
              </div>
              <Sparkles className="w-5 h-5 text-blue-600 opacity-20" />
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                {/* Title Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">
                    Course Nomenclature
                  </label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      placeholder="e.g. Advanced System Architecture"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-14 pl-12 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-2xl font-semibold"
                      required
                    />
                  </div>
                </div>

                {/* Description Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">
                    Instructional Abstract
                  </label>
                  <Textarea
                    placeholder="Provide a comprehensive summary of the course objectives..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[150px] p-5 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-2xl resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">
                    Visual Identifier (Thumbnail)
                  </label>
                  <div className="relative group flex items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/30 rounded-2xl p-8 hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e: any) =>
                        setThumbnail(e.target.files?.[0] || null)
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Recommended ratio 16:9 • JPG, PNG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements Input */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      Pre-requisite Parameters
                    </label>
                    <ListChecks className="w-4 h-4 text-slate-300" />
                  </div>
                  <Textarea
                    placeholder="List required skills or prior module completions..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="min-h-[120px] p-5 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-2xl resize-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 bg-blue-950 hover:bg-blue-900 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-t border-white/10"
                >
                  Confirm & Initialize
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Metadata */}
        <div className="flex items-center justify-center gap-6 pt-6 opacity-40">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Deployment Verified
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-400" />
          <div className="flex items-center gap-2 text-slate-600">
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Faculty Auth active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
