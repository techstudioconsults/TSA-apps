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

  // Add other domains as needed
};
