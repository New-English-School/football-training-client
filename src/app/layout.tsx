import type { Metadata } from "next";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Football Training System",
  description: "Manage teams, schedules, and players efficiently",
};

const FOOTER_HEIGHT = 72; // px

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <AppProviders>
          <Header />

          <main
            className="flex-grow flex flex-col items-center w-full"
            style={{ paddingBottom: `${FOOTER_HEIGHT}px` }}
          >
            <div className="w-full max-w-7xl px-4 py-6 flex-grow">
              {children}
            </div>
          </main>

          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
