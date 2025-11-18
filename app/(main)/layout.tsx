import Footer from "@/components/mainComponents/Footer";
import Header from "@/components/mainComponents/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Header />
    {children}
    <Footer />
    </>
  );
}
