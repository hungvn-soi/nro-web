
import AuthModal from "@/components/auth/AuthModal";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="relative min-h-screen">
                <main className="">
                    {children}
                </main>

                <AuthModal />
            </div>
        </AuthProvider>
    );
}