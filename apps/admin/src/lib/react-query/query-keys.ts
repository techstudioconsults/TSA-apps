export const queryKeys = {
  auth: {
    login: () => ["auth", "login"] as const,
    currentUser: () => ["auth", "currentUser"] as const,
  },
  dashboard: {
    activities: (page: number, limit: number) =>
      ["dashboard", "activities", page, limit] as const,
    stats: () => ["dashboard", "stats"] as const,
  },

  courses: {
    list: () => ["courses", "list"] as const,
    byId: (id: string) => ["courses", "byId", id] as const,
    total: () => ["courses", "total"] as const,
  },

  // Add other domains as needed
};
