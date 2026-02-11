import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { isAllowed } from "@/utils/auth";


function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            BlueLearn
          </Link>

          <Input
            placeholder="Search courses..."
            className="w-80 hidden md:block"
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/">Home</Link>

          {isAllowed() && <Link to="/my-learning">My Learning</Link>}

          {/* Show Become Instructor if logged in but not creator */}
          {isAllowed() && !isAllowed("creator") && (
            <Link to="/become-instructor">Become Instructor</Link>
          )}

          {/* Creator links */}
          {isAllowed("creator") && (
            <>
              <Link to="/instructor/dashboard">Dashboard</Link>
              <Link to="/my-courses">Creator</Link>
            </>
          )}

          {isAllowed() ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
