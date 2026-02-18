import { Navigate } from "react-router-dom";
import Authorization from "@/utils/auth";

function ProtectedRoute({
  children,
  requiredCreator = false,
}: {
  children: React.ReactNode;
  requiredCreator?: boolean;
}) {
  // Check authentication (default behavior)
  if (!Authorization.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Check creator permission if required
  if (requiredCreator && !Authorization.isAuthenticated("create_course")) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
