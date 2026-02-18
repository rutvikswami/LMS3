class Authorization {

  private static getPermissionMap(): Record<string, boolean> {
    const stored = localStorage.getItem("permission_map");
    return stored ? JSON.parse(stored) : {};
  }

  static isAuthenticated(permission?: string): boolean {
    const token = localStorage.getItem("access");
    if(!token) return false;
    if(!permission) return true;
    const permissionMap = this.getPermissionMap();
    return permissionMap[permission];
  }

  static getUser() {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null;
  }
}

export default Authorization;
