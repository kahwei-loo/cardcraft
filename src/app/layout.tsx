import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
    title: "Festive E-Card Studio",
    description: "Create magical animated greeting cards for every celebration",
};

const FONT_URL = [
    "https://fonts.googleapis.com/css2?",
    "family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400",
    "&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400",
    "&family=Ma+Shan+Zheng",
    "&family=Noto+Serif+SC:wght@400;500;600;700",
    "&display=swap",
].join("");

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href={FONT_URL} rel="stylesheet" />
            </head>
            <body className="font-serif antialiased bg-parchment overflow-x-hidden">
                <ToastProvider>{children}</ToastProvider>
            </body>
        </html>
    );
}
