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

  classes: {
    all: ["classes"] as const,
    lists: () => [...queryKeys.classes.all, "list"] as const,
    list: (filters: Filters) =>
      [...queryKeys.classes.lists(), filters] as const,
    details: () => ["classes", "detail"] as const,
    detail: (id: string) => [...queryKeys.classes.details(), id] as const,
    total: () => [...queryKeys.classes.all, "total"] as const,
  },

  sheets: {
    all: ["sheets"] as const,
    lists: () => [...queryKeys.sheets.all, "list"] as const,
    list: (filters: Filters) => [...queryKeys.sheets.lists(), filters] as const,
    details: () => ["sheets", "detail"] as const,
    detail: (id: string) => [...queryKeys.sheets.details(), id] as const,
    total: () => [...queryKeys.sheets.all, "total"] as const,
  },

  // Add other domains as needed
};
