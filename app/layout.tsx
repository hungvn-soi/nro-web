import type { Metadata } from "next";
import "./globals.css";
import { NotificationProvider } from "@/components/notification";


export const metadata: Metadata = {
  title: "Ngọc Rồng ZENZ",
  description: "Cùng nhau làm nên một cộng đồng Ngọc Rồng ZENZ vững mạnh",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans min-h-screen antialiased`}>
      <body className="min-h-screen flex flex-col">
        <NotificationProvider position="top-right">
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
