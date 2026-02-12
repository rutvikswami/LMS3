import React from "react";
import { Sparkles, PlayCircle, Users, GraduationCap } from "lucide-react";

function HomeBanner() {
  return (
    <div className="relative group overflow-hidden rounded-[2rem] bg-slate-900 mb-8 shadow-2xl shadow-primary/20">
      {/* Dynamic Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -top-32 -right-16 animate-pulse duration-[8000ms]" />
        <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -bottom-16 -left-16 animate-pulse duration-[6000ms] delay-1000" />

        {/* Abstract Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-10 lg:p-12">
        {/* Left Content: Text & CTA */}
        <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-100">
              New courses added weekly
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Learn skills that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                shape your future
              </span>
            </h1>
            <p className="text-base md:text-lg text-blue-100/70 max-w-lg leading-relaxed font-medium">
              Join 5,000+ students and explore thousands of high-quality courses
              from industry-leading expert instructors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white cursor-pointer transition-colors group/play px-3 py-1.5 rounded-lg hover:bg-white/5">
              <PlayCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              How it works
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-200" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-white leading-none">
                  5,000+
                </span>
                <span className="text-[9px] uppercase font-bold text-blue-100/40 tracking-tighter">
                  Active Students
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-xs font-black text-white leading-none">
                200+
              </span>
              <span className="text-[9px] uppercase font-bold text-blue-100/40 tracking-tighter">
                Expert Mentors
              </span>
            </div>
          </div>
        </div>

        {/* Right Content: Visual Element */}
        <div className="hidden lg:flex justify-center items-center animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <div className="relative w-full max-w-[320px] aspect-square">
            {/* Animated Floating Shapes */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/20 rounded-2xl rotate-12 animate-bounce duration-[4000ms] border border-white/10 backdrop-blur-sm shadow-2xl" />
            <div className="absolute bottom-8 left-0 w-20 h-20 bg-cyan-400/20 rounded-full -rotate-12 animate-pulse duration-[3000ms] border border-white/10 backdrop-blur-sm shadow-2xl" />

            {/* Main Central Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/10 rounded-[2.5rem] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-inner overflow-hidden group-hover:border-primary/30 transition-colors">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-primary/40 rounded-full animate-pulse" />
                  <div className="relative bg-white/5 p-6 rounded-full border border-white/10 backdrop-blur-xl">
                    <GraduationCap className="h-14 w-14 text-white drop-shadow-2xl" />
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/10 inline-block">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Excellence
                  </span>
                </div>
              </div>

              {/* Decorative "Scanning" line animation */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[scan_5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-30px); opacity: 0; }
          20%, 80% { opacity: 1; }
          50% { transform: translateY(350px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default HomeBanner;
