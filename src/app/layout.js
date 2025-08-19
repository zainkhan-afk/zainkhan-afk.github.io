import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zain Khan",
  description: "A place for me to show my work.",
  icons: {
    icon: '/portfolio-favicon.png', // Can also be png or svg
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/portfolio-favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}> */}
        <Navbar />
        <main className="flex-grow">
          <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-20">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
