import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "カムカム生徒ポータル",
  description: "生徒たちの日記を管理するためのポータルサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`min-h-svh flex flex-col items-center justify-center`}>
        <Header />
        <main className="flex flex-col items-center  flex-1 w-full ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
