import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsBrowser } from "@june-so/analytics-next";
import { UserAnalytics } from "@/components/Analytics";
import { Suspense } from "react";
import { PHProvider, PostHogPageview } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giftronic",
  description: "Create animated memes with the power of AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let analytics = AnalyticsBrowser.load({
    writeKey: "uL2wwPoWSiTPDqti",
  });

  return (
    <ClerkProvider>
      <html lang="en">
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PHProvider>
          <body className={inter.className}>
            {children}
            <UserAnalytics />
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
