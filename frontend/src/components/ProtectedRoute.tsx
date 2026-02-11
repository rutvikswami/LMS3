import { Navigate } from "react-router-dom";
import { isAllowed } from "@/utils/auth";

function ProtectedRoute({
  children,
  requiredCreator = false,
}: {
  children: React.ReactNode;
  requiredCreator?: boolean;
}) {
  // Check authentication (default behavior)
  if (!isAllowed()) {
    return <Navigate to="/login" />;
  }

  // Check creator permission if required
  if (requiredCreator && !isAllowed("creator")) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
