// import { create } from "zustand";

// import { MarketingCycle } from "~/schemas/marketing-cycle.schema";

// interface MarketingCycleStore {
//   marketingCycles: MarketingCycle[];
//   setMarketingCycles: (marketingCycles: MarketingCycle[]) => void;
//   addMarketingCycle: (marketingCycle: MarketingCycle) => void;
//   updateMarketingCycle: (id: string, data: Partial<MarketingCycle>) => void;
//   deleteMarketingCycle: (id: string) => void;
// }

// export const useMarketingCycleStore = create<MarketingCycleStore>((set) => ({
//   marketingCycles: [], // Initialize as empty array
//   setMarketingCycles: (marketingCycles) => {
//     // Ensure we're always setting an array
//     const cyclesArray = Array.isArray(marketingCycles) ? marketingCycles : [];
//     set({ marketingCycles: cyclesArray });
//   },
//   addMarketingCycle: (marketingCycle) =>
//     set((state) => {
//       // Ensure we're not adding duplicates
//       const exists = state.marketingCycles.some(
//         (cycle) => cycle.id === marketingCycle.id,
//       );
//       if (exists) {
//         return state;
//       }
//       return {
//         marketingCycles: [...state.marketingCycles, marketingCycle],
//       };
//     }),
//   updateMarketingCycle: (id, data) =>
//     set((state) => ({
//       marketingCycles: state.marketingCycles.map((mc) =>
//         mc.id === id ? { ...mc, ...data } : mc,
//       ),
//     })),
//   deleteMarketingCycle: (id) =>
//     set((state) => ({
//       marketingCycles: state.marketingCycles.filter((mc) => mc.id !== id),
//     })),
// }));
export {};
