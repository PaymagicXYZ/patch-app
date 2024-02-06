import { Address } from "@patchwallet/patch-sdk";
import { create } from "zustand";

const useBearStore = create<{ to: Address }>((set) => ({
  to: "0",
  setTo: (to: Address) => set({ to }),
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));
