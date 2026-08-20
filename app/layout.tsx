import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import config from "./config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});
export const metadata: Metadata = {
  title: `${config.siteName} - Thôn Thượng Đền, Cổ Lễ, Trực Ninh, Nam Định`,
  description:
    "Trang thông tin gia phả Dòng họ Nguyễn Mậu (Ngành 4) tại Thôn Thượng Đền, Thị trấn Cổ Lễ, Huyện Trực Ninh, Tỉnh Nam Định. Tra cứu phả hệ, thế thứ, ngày giỗ và truyền thống dòng tộc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased relative`}
      >
        {children}
      </body>
    </html>
  );
}
