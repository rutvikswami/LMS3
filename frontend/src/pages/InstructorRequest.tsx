import React, { useState } from "react";
import {
  GraduationCap,
  Send,
  Sparkles,
  ShieldCheck,
  Cpu,
  MessageSquareText,
  CheckCircle2,
} from "lucide-react";

// shadcn components
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

// --- END MOCK LOGIC ---

// --- PROJECT IMPORTS (UNCOMMENT THESE IN YOUR LOCAL CODE) ---
import api from "@/api/axios";

function InstructorRequest() {
  const [message, setMessage] = useState("");

  // Logic: Unchanged as per instructions
  const handleSubmit = async () => {
    try {
      await api.post("/accounts/instructor-request/", {
        message,
      });

      alert("Request submitted successfully.");
      setMessage("");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to submit request");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 text-slate-900 selection:bg-blue-100 relative flex items-center justify-center p-6">
      {/* Subtle Background Accents (Matching Dashboard) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex flex-col items-center space-y-3">
            <div className="bg-blue-950 p-4 rounded-[1.5rem] shadow-xl shadow-blue-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <Cpu className="w-3 h-3 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Application Node v3.0
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-blue-950">
              Become an <span className="text-blue-700">Instructor</span>
            </h1>
            <p className="text-slate-500 font-medium text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              Join our elite network of educators and empower the next
              generation of technical creators.
            </p>
          </div>
        </div>

        {/* Request Card */}
        <Card className="border-slate-200 shadow-2xl shadow-blue-900/5 rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="border-b border-slate-50 pb-6 bg-slate-50/30">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl text-blue-950">
                  Submission Portal
                </CardTitle>
                <CardDescription>
                  Tell us why you want to join our faculty
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="border-blue-200 bg-white text-blue-700 font-black px-3 py-1 uppercase tracking-widest text-[9px]"
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                Open Application
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                  Statement of Intent
                </label>
                <MessageSquareText className="w-3.5 h-3.5 text-blue-200" />
              </div>

              <div className="relative group">
                <Textarea
                  placeholder="Describe your expertise, teaching philosophy, and what courses you intend to distribute..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[200px] p-5 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-2xl text-slate-700 placeholder:text-slate-400 leading-relaxed resize-none"
                />
                {/* Subtle internal border accent */}
                <div className="absolute bottom-4 right-4 text-slate-300 pointer-events-none uppercase text-[9px] font-black tracking-widest opacity-40">
                  Required Field
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="w-full h-14 bg-blue-950 hover:bg-blue-900 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-950/20 transition-all active:scale-[0.98] group flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
            >
              Submit Application
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Verified Protocol
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600/70">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Direct Review Line
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Policy Tag */}
        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-sm mx-auto">
          Applications are processed within 48-72 hours. All intellectual
          property remains protected under BL-OS protocols.
        </p>
      </div>
    </div>
  );
}

export default InstructorRequest;
