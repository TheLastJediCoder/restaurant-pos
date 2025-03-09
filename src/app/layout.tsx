import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from "./theme";



export const metadata: Metadata = {
  title: "Restaurant POS",
  description: "Restaurant Point Of Sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={darkTheme}>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
