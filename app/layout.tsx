import type { Metadata } from "next";
import "./globals.css";
import { NotificationProvider } from "@/components/notification";

export const metadata: Metadata = {
  metadataBase: new URL("https://ngocrongzenz.com"),

  title: {
    default: "Ngọc Rồng ZENZ",
    template: "%s | Ngọc Rồng ZENZ",
  },

  description:
    "Cùng nhau làm nên một cộng đồng Ngọc Rồng ZENZ vững mạnh",

  alternates: {
    canonical: "https://ngocrongzenz.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Ngọc Rồng ZENZ",
    description:
      "Cùng nhau làm nên một cộng đồng Ngọc Rồng ZENZ vững mạnh",
    url: "https://ngocrongzenz.com",
    siteName: "Ngọc Rồng ZENZ",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="font-sans min-h-screen antialiased">
      <body className="min-h-screen flex flex-col">
        <NotificationProvider position="top-right">
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}