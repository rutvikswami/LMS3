import { PERMISSIONS } from "@/constants/permissions";

export const isAllowed = (action?: string): boolean => {
  const token = localStorage.getItem("access");
  const user = localStorage.getItem("user");

  if (!token || !user) return false;

  if (!action) return true;

  const parsedUser = JSON.parse(user);
  const permissions: number[] = parsedUser.permissions || [];

  switch (action) {
    case "creator":
      return permissions.includes(PERMISSIONS.CREATE_COURSE);

    case "enroll":
      return permissions.includes(PERMISSIONS.ENROLL_COURSE);

    case "editCourse":
      return permissions.includes(PERMISSIONS.EDIT_OWN_COURSE);

    default:
      return false;
  }
};
