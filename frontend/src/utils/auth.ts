class Authorization {

  private static getPermissionMap(): Record<string, boolean> {
    const stored = localStorage.getItem("permission_map");
    return stored ? JSON.parse(stored) : {};
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("access");
    return token ? true : false;
  }

  static isAuthorized(permission: string): boolean {
    if (!this.isAuthenticated()) return false;
    const permissionMap = this.getPermissionMap();
    return !!permissionMap[permission];
  }

  static getUser() {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null;
  }
}

export default Authorization;
