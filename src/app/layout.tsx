import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme";
import ResponsiveAppBar from "./components/responsive-app-bar";
import { Container } from "@mui/material";

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
          <ResponsiveAppBar></ResponsiveAppBar>
          <Container maxWidth="xl" sx={{ paddingY: "24px" }}>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
