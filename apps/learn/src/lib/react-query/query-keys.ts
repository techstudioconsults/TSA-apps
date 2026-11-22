export const queryKeys = {
  me: ["me"] as const,
  courses: ["learn", "courses"] as const,
  outline: (idOrSlug: string) => ["learn", "outline", idOrSlug] as const,
  lecture: (id: string) => ["learn", "lecture", id] as const,
  continue: ["learn", "continue"] as const,
};
