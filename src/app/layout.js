import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import ChatWidget from "../components/ChatWidget";

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
          
        {/* <!-- Google tag (gtag.js) --> */}
        <Script 
        async src="https://www.googletagmanager.com/gtag/js?id=G-RZZBC2P6RL"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RZZBC2P6RL');
          `}
        </Script>

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}> */}
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
