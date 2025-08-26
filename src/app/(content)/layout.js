import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Breadcrumbs from "@/components/Breadcrumbs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
      <main className="flex-grow">
        <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center pt-14">
          <Breadcrumbs/>
          {children}
        </div>
      </main>
  );
}
