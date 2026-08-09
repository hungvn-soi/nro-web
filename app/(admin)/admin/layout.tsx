import AdminSidebar from "@/components/admin/sliderbar/AdminSidebar";
import AuthModal from "@/components/auth/AuthModal";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="flex min-h-screen">
                {/* Sidebar bên trái */}
                <aside className="w-64 shrink-0">
                    <AdminSidebar />
                </aside>

                {/* Nội dung các page bên phải */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>

            <AuthModal />
        </AuthProvider>
    );
}