import { create } from "zustand";

export type DialogId = "SuccessDialog" | "sendDialog";

interface Meta {
	[name: string]: unknown;
}
interface Dialog {
	meta?: Meta;
	opened: boolean;
}

interface DialogProps {
	openedModals: Record<DialogId, Dialog>;
	lazyModals: DialogId[];
	actions: {
		open: (id: DialogId, meta?: Meta) => void;
		close: (id: DialogId) => void;
	};
}

const useDialogStore = create<DialogProps>((set) => ({
	lazyModals: [], // Add dialogs that need to be lazy loaded via the ModalProvider - deprecated
	openedModals: {
		// successDialog: false,
		sendDialog: {
			opened: false,
		},
		SuccessDialog: {
			opened: false,
			meta: {},
		},
	},
	actions: {
		open: (id: DialogId, meta?: Meta) =>
			set((prev) => ({
				openedModals: {
					...prev.openedModals,
					[id]: {
						opened: true,
						meta,
					},
				},
			})),
		close: (id: DialogId) =>
			set((prev) => ({
				openedModals: {
					...prev.openedModals,
					[id]: {
						opened: false,
					},
				},
			})),
	},
}));

export const useDialogIsOpen = (id: DialogId) =>
	useDialogStore((state) => state.openedModals[id].opened);

export const useDialogActions = () => useDialogStore((state) => state.actions);
export const useOpenedModals = () =>
	useDialogStore((state) =>
		state.lazyModals.filter((id) => state.openedModals[id].opened),
	);

export const useDialogMeta = <T>(id: DialogId) =>
	useDialogStore((state) => state.openedModals[id].meta as T);
