import type { Metadata } from "next";
import { Aleo} from "next/font/google";
import "./ui/globals.css";
import { AppProvider } from "./lib/AppContext";

const aleoSans = Aleo({
  variable: "--font-aleo-sans",
  subsets: ["latin"],
  weight: ["400","700"]
});

export const metadata: Metadata = {
  title: "Curiosity Kindler",
  description: "description TODO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aleoSans.variable} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
