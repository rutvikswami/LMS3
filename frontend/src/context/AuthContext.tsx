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
  fetchEnrollments: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  // ===============================
  // FETCH ENROLLMENTS (SAFE)
  // ===============================
  const fetchEnrollments = async () => {
    if (!user) return; // ✅ important safety check

    try {
      const res = await api.get("/courses/my-enrollments/");
      const ids = res.data.map((c: any) => c.id);
      setEnrolledCourses(ids);
    } catch (err) {
      console.error("Failed to fetch enrollments");
    }
  };

  // ===============================
  // LOAD USER FROM LOCALSTORAGE
  // ===============================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // ===============================
  // FETCH ENROLLMENTS WHEN USER CHANGES
  // ===============================
  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  // ===============================
  // LOGIN
  // ===============================
  const login = (data: any) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setEnrolledCourses([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        enrolledCourses,
        login,
        logout,
        fetchEnrollments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
