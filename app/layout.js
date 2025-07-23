import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Lernen - AI-Powered Study Companion",
  description: "Master anything with your AI study assistant. Personalized learning, smart summaries, and interactive quizzes.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          <Provider>
            {children}
          </Provider> 
        </body>
      </html>
    </ClerkProvider>
  );
}