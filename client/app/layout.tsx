import "./globals.css";
import Navbar from "../components/Navbar";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>the fashion.</title>
        <link
          rel="description"
          content="New gen shop for luxury clothes & watches."
        />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
