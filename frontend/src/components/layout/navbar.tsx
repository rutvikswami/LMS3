import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PERMISSIONS } from "@/constants/permissions";

function Navbar() {
  const { user, logout } = useAuth();

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
          <Link to="/my-learning">My Learning</Link>

          {/* Creator link only if has create_course permission */}
          {user?.permissions?.includes(PERMISSIONS.CREATE_COURSE) && (
            <Link to="/my-courses">Creator</Link>
          )}

          {user ? (
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
