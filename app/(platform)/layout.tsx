import { ModalProvider } from "@/components/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

interface Props {
    children: React.ReactNode;
}

const PlatformLayout = ({children}: Props) => {
    return (
        <ClerkProvider>
            <Toaster />
            <ModalProvider />
            {children}
        </ClerkProvider>
    )
}

export default PlatformLayout;