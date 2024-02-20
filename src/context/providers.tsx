import UserProvider from "./user-provider";
import { ClerkProvider } from "@clerk/nextjs";
import SuccessDialogLocal from "@/components/modal/SuccessDialog/SuccessDialogLocal";
import { ModalProvider } from "./modal-provider";

interface IProvidersProps {
	children: React.ReactNode;
}

export function Providers(props: IProvidersProps) {
	return (
		<>
			<UserProvider>
				<ClerkProvider>{props.children}</ClerkProvider>
				<ModalProvider />
			</UserProvider>
		</>
	);
}
