import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";

type User = {
  id: number;
  email: string;
  user_name: string;
  permissions: number[];
};

type AuthContextType = {
  user: User | null;
  enrolledCourses: number[];
  login: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get("/courses/my-enrollments/");
      const ids = res.data.map((c: any) => c.id);
      setEnrolledCourses(ids);
    } catch (err) {
      console.error("Failed to fetch enrollments");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data: any) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    fetchEnrollments();
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, enrolledCourses }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
