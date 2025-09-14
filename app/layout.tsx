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
  description: "A search engine that generates questions, not answers.",
  authors: [{name: 'Avery Keare', url:'http://linkedin.com/in/averykeare'}],
  keywords: ['Question Generator', 'Questions', "Question Engine", "Search Engine", "Questionaire Generator", "Brainstorm Help", "Interviews", "Create Questions", "Inspiration", "Curious", "Curiosity"], 
  openGraph: {
    title: 'Curiosity Kindler',
    description: 'A search engine that generates questions, not answers.',
    url: 'https://curiosity-kindler.vercel.app',
    type: 'website',
  },
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
