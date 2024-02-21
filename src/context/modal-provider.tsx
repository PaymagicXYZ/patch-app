import SuccessDialogLocal from "@/components/modal/SuccessDialog/SuccessDialogLocal";

// Note: Temporary solution to the neater way of handling modals in components/modal/lazy-setup.
// It seems slower connections are causing lazily loaded imports to sometimes fail which would cause the app to crash or not load the modal.
// Hence for the initial release we are moving to a more traditional approach of importing all modals at once, but manipulating them dynamically via zustand.
export const ModalProvider = () => {
  return (
    <>
      <SuccessDialogLocal />
    </>
  );
};
