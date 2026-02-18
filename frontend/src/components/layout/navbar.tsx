import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  LogOut,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Menu,
} from "lucide-react";
import Authorization from "@/utils/auth";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** * Note for Preview: These imports refer to your local project files.
 * The code below is designed for your 'lms_v3' project structure.
 */
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!search.trim()) {
      navigate("/");
      return;
    }
    navigate(`/?search=${search}`);
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Brand & Search */}
        <div className="flex items-center gap-8 flex-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-all duration-300"
          >
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
              Blue<span className="text-primary">Learn</span>
            </span>
          </Link>

          <div
            className={`relative w-full max-w-[320px] hidden md:block transition-all duration-500 ease-in-out ${isSearchFocused ? "max-w-[420px]" : ""}`}
          >
            <form onSubmit={handleSearch}>
              <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${isSearchFocused ? "text-primary" : "text-muted-foreground"}`}
              />

              <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="search for courses..."
              className="pl-11 h-11 bg-muted/40 border-transparent focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/10 transition-all rounded-2xl shadow-none"
              />
            </form>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-8 mr-6">
            <Link
              to="/"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>

            {Authorization.isAuthenticated() && (
              <Link
                to="/my-learning"
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                My Learning
              </Link>
            )}

            {Authorization.isAuthenticated() &&
              !Authorization.isAuthenticated("create_course") && (
                <Link
                  to="/become-instructor"
                  className="text-sm font-bold text-primary hover:opacity-80 transition-opacity"
                >
                  Become Instructor
                </Link>
              )}
          </nav>

          <div className="flex items-center gap-2">
            {Authorization.isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-2 overflow-hidden hover:bg-muted hover:border-primary/20 transition-all active:scale-95"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-3 p-2 rounded-2xl shadow-2xl border-muted-foreground/10 animate-in fade-in zoom-in-95"
                >
                  {Authorization.isAuthenticated("create_course") && (
                    <>
                      <div className="p-1 space-y-1">
                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-primary/5 focus:text-primary"
                        >
                          <Link to="/instructor/dashboard">
                            <LayoutDashboard className="mr-3 h-4 w-4" />
                            <span className="font-semibold text-sm">
                              Dashboard
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-primary/5 focus:text-primary"
                        >
                          <Link to="/my-courses">
                            <BookOpen className="mr-3 h-4 w-4" />
                            <span className="font-semibold text-sm">
                              Creator Studio
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator className="my-1.5 opacity-50" />
                    </>
                  )}

                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer rounded-xl py-2.5 px-3 text-destructive font-bold text-sm focus:text-destructive focus:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  asChild
                  className="hidden sm:flex font-bold rounded-xl h-10 px-5 transition-transform active:scale-95"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="font-bold rounded-xl shadow-lg shadow-primary/20 px-7 h-11 transition-all active:scale-95 hover:shadow-primary/30"
                >
                  <Link to="/register">Join Free</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl h-10 w-10 hover:bg-primary/5"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
