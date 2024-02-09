import { Address } from "@patchwallet/patch-sdk";
import { create } from "zustand";

interface SendContextStore {
  to: Address | null;
  actions: {
    setTo: (to: Address | null) => void;
  };
}

// Note: As much as I want to avoid client state, I think that's the *only* place where it would become pretty messy if we don't use it
// We will have to make the whole "Send" modal a client component in order to share the state between the 2 forms.
// That would increase the loading time of the page because the authChecks would need to happen before showing the page and right now they are pre-rendered inside the "Send" modal.
export const useSendContextStore = create<SendContextStore>((set) => ({
  to: null,
  actions: {
    setTo: (to) => set({ to }),
  },
}));

export const useSendContextTo = () => useSendContextStore((state) => state.to);
export const useSendContextActions = () =>
  useSendContextStore((state) => state.actions);
