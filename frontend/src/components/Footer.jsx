import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Authorization from "@/utils/auth";

// shadcn components
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

function Footer() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <footer className="relative bg-[#0a0c10] border-t border-white/5 mt-20 overflow-hidden">
      {/* Visual Accent: Top Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Brand & Mission (Col 5) */}
          <div className="md:col-span-5 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-all"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-lg bg-primary/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-primary p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-xl shadow-primary/20">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Blue
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Learn
                </span>
              </span>
            </Link>

            <p className="text-[12px] text-slate-400 leading-relaxed max-w-sm font-medium uppercase tracking-[0.05em]">
              Empowering the next generation of creators through structured
              technical mastery and industry-standard workflows.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div className="md:col-span-3">
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Navigation
            </h3>
            <ul className="space-y-4">
              <li key="Home">
                <Link
                  to="/"
                  className="text-[11px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-[0.15em] flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all mr-0 group-hover:mr-3 rounded-full" />
                  Home
                </Link>
              </li>
              <li key="My Learning">
                <Link
                  to="/my-learning"
                  className="text-[11px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-[0.15em] flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all mr-0 group-hover:mr-3 rounded-full" />
                  My Learning
                </Link>
              </li>
              {Authorization.isAuthenticated() ? (
                <li key="Logout">
                <Link
                  to="/"
                  className="text-[11px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-[0.15em] flex items-center group"
                  onClick={handleLogout}
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all mr-0 group-hover:mr-3 rounded-full" />
                  Logout
                </Link>
              </li>
              ) : (
                <li key="Login">
                <Link
                  to="/login"
                  className="text-[11px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-[0.15em] flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all mr-0 group-hover:mr-3 rounded-full" />
                  Login
                </Link>
              </li>
              )}

            </ul>
          </div>

          {/* System Status (Col 4) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Infrastructure Status
            </h3>
            <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest px-2 py-0"
                >
                  Network Operational
                </Badge>
              </div>

              <div className="mt-4 flex items-center gap-3 text-slate-400 relative z-10">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-[11px] font-bold tracking-wider text-slate-300">
                  support@bluelearn.io
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.25em]">
                © {new Date().getFullYear()} BL-OS v3.0.0
              </p>
              <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                All security modules fully initialized
              </p>
            </div>

            <div className="flex items-center gap-8">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary cursor-pointer transition-all hover:translate-y-[-1px]">
                Privacy_Protocols
              </span>
              <Separator orientation="vertical" className="h-3 bg-white/10" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary cursor-pointer transition-all hover:translate-y-[-1px]">
                Terms_Of_Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
