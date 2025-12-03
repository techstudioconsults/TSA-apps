export const queryKeys = {
  auth: {
    login: () => ["auth", "login"] as const,
    currentUser: () => ["auth", "currentUser"] as const,
  },
  dashboard: {
    activities: (filters: Filters) =>
      ["dashboard", "activities", filters] as const,
    stats: () => ["dashboard", "stats"] as const,
  },

  courses: {
    all: ["courses"] as const,
    lists: () => [...queryKeys.courses.all, "list"] as const,
    list: (filters: Filters) =>
      [...queryKeys.courses.lists(), filters] as const,
    details: () => [`courses`, "detail"] as const,
    detail: (id: string) => [...queryKeys.courses.details(), id] as const,
    total: () => [...queryKeys.courses.all, "total"] as const,
  },

  // Add other domains as needed
};
