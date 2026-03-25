import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Charles E. MacKay — Aviation History Books",
  description: "Buy aviation history books by Charles E. MacKay. Scottish aviation, WWI/WWII aircraft, helicopters & naval ops. Free worldwide shipping.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Discount banner */}
        <div style={{ background: 'var(--gold)', color: 'var(--navy)', textAlign: 'center', padding: '8px 16px', fontSize: 13, fontWeight: 600 }}>
          Save 5% on 2 books or 10% on 3+ — Free worldwide shipping on every order
        </div>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
