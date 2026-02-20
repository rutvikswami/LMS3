import React, { useState, createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/api/axios";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  GraduationCap,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";


function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/accounts/register/", {
        email,
        user_name: userName,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.log(err.response?.data)
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50/50 selection:bg-blue-100">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Join our learning community today
            </p>
          </div>
        </div>


        <Card className="border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Register your student profile to start learning
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-0.5">
                    Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      placeholder="johndoe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="h-12 pl-10 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Email Input Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-0.5">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      type="email"
                      placeholder="name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Input Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-0.5">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10 border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-blue-600/20 transition-all rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Form Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Redirect Section */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm text-center text-slate-500 font-medium">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Trust/Compliance Footer */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Secure SSL
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Privacy Protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
