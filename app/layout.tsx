import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/lib/fonts";
import { CartContextProvider } from "@/context/CartContext";


export const metadata: Metadata = {
  title: "MIRMEE – Premium Hair Accessories",
  description:
    "Shop premium handmade hair bows, scrunchies, headbands, and formal accessories at MIRMEE. High-quality, elegant, and comfortable designs for kids, teens, and women.",
  keywords: [
    "MIRMEE",
    "hair accessories",
    "handmade hair bows",
    "scrunchies",
    "headbands",
    "formal accessories",
    "girls hair accessories",
    "women hair accessories",
    "handcrafted accessories",
    "premium scrunchies Pakistan",
    "hair bow shop",
    "fashion accessories"
  ],
  authors: [
    { name: "MIRMEE" },
    { name: "Mussadiq Khan", url: "https://www.shopmirmee.com/" }
  ],
  creator: "MIRMEE",
  publisher: "MIRMEE",
  openGraph: {
    title: "MIRMEE – Handmade Hair Accessories",
    description:
      "Explore a curated collection of handmade hair bows, elegant scrunchies, stylish headbands, and formal accessories designed with care and comfort.",
    url: "https://www.shopmirmee.com/",
    siteName: "MIRMEE",
    images: [
      {
        url: "/hero (2).jpg", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "MIRMEE Hair Accessories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIRMEE – Premium Hair Accessories",
    description:
      "High-quality handmade hair bows, scrunchies, headbands, and formal accessories for every occasion.",
    images: ["/hero (2).jpg"], // update if needed
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="iL9sB0SYQqfW0NDKIoWWMdbb1PdRmBMZqTMNBGEdlB8" />
      </head>
      <body
        className={`bg-light ${roboto.className} max-w-[1440px] mx-auto antialiased`}
      >
        <CartContextProvider>
        {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
