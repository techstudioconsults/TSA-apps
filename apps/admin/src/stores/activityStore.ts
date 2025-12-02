// import { create } from 'zustand'

// interface ActivityState {
//   activities: Activity[]
//   isLoading: boolean
//   error: string | null
//   page: number
//   totalPages: number
//   fetchActivities: (token: string, page?: number) => void
// }

// export const useActivityStore = create<ActivityState>((set) => ({
//   activities: [],
//   isLoading: false,
//   error: null,
//   page: 1,
//   totalPages: 1,

//   fetchActivities: async (token: string, page = 1) => {
//     set({ isLoading: true, error: null })
//     try {
//       const { data, totalPages } = await getAllActivityAction(token, page)
//       set({ activities: data, totalPages, page, isLoading: false })
//     } catch {
//       set({ error: 'Failed to load activities', isLoading: false })
//     }
//   },
// }))
export {};
