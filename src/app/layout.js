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
  title: "Zain",
  description: "A place for me to show my work.",
  icons: {
    icon: [
      { url: 'portfolio-favicon.png' },
      { url: 'portfolio-favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/portfolio-favicon.png' },
    ],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          {/* <link rel="icon" href="/portfolio-favicon.png"/> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}> */}
        <Navbar />
        <main className="flex-grow">
          <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-14">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
