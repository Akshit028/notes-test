import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/lib/auth";
import { MenuToggle } from "@/components/menu-toggle";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes app with categories",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col items-center">
            {/* Container for max-w-2xl */}
            <div className="container mx-auto px-4 max-w-2xl">
              {/* Shared Header */}
              <header className="flex justify-between items-center my-8">
                <h1 className="text-2xl font-semibold">Notes</h1>
                <div className="flex justify-between gap-2 items-center">
                  <ModeToggle />
                  {session?.user && <MenuToggle />}
                </div>

              </header>

              {/* Main Content */}
              <main>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
