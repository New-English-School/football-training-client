import Footer from "@/components/layout/footer/footer";
import { AppProviders } from "./providers";
import Header from "@/components/layout/header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppProviders>
          <Header />
          <main
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
