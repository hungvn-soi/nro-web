import AuthModal from "@/components/auth/AuthModal";
import BannerV2 from "@/components/banner/MainBannerV2";
import Footer from "@/components/footter/Footer";
import Header from "@/components/header/Header";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="relative min-h-screen">

                {/* Background */}
                <div
                    className="
                        fixed
                        inset-0
                        -z-20
                        bg-[url('/assets/BG.webp')]
                        bg-cover
                        bg-center
                        bg-no-repeat
                    "
                />

                {/* Overlay */}
                <div className="fixed inset-0 -z-10 bg-[#06111f]/70" />

                <Header />

            {/* className="relative z-10 flex-1 max-w-7xl mx-auto px-4 w-full */}
                <main className="">
                    {children}
                </main>

                <AuthModal />

            <Footer />

            </div>
        </AuthProvider>
    );
}