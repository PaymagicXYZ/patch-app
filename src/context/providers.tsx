import UserProvider from "./user-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "./modal-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: IProvidersProps) {
  return (
    <>
      <UserProvider>
        <ClerkProvider>{props.children}</ClerkProvider>
        <ModalProvider />
        <ToastContainer />
      </UserProvider>
    </>
  );
}
