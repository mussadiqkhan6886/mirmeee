import { montserrat } from "@/lib/fonts";
import "@/app/globals.css"
import Header from "@/components/adminComp/Header";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
            <Header />
            {children}
    </>
  );
}
