import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const dm_serif_display = DM_Serif_Display({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
});

const APP_NAME = "M-PjBL";
const APP_DEFAULT_TITLE = "Mobile-Project Based Learning";
const APP_TITLE_TEMPLATE = "%s - M-PjBL";
const APP_DESCRIPTION = "Skripsi Aldi Maulana";

export const metadata: Metadata = {
  // title: "Mobile-Project Based Learning",
  // description: "Skripsi Mobile-Project Based Learning",
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  manifest: "manifest.json",
};

export const viewport: Viewport = {
  themeColor: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const style: React.CSSProperties = {
    maskImage: "linear-gradient(transparent, black)",
  };
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${dm_serif_display.variable} kotak-kotak`}
      >
        <div className="container py-4 flex flex-col min-h-screen ">
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </Provider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
