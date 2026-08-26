const rawSiteName =
  process.env.NEXT_PUBLIC_SITE_NAME ||
  process.env.SITE_NAME ||
  "Gia Phả Họ Nguyễn Mậu - Thôn Thượng - Thị trấn Cổ Lễ - huyện Trực Ninh - tỉnh Nam Định";

// Loại bỏ các chữ "(Ngành 4)", "(Ngành tư)", "(Ngành Tư)" nếu có trong biến môi trường
const cleanedSiteName = rawSiteName
  .replace(/\s*\(\s*Ngành\s*(?:4|tư|Tư)\s*\)/gi, "")
  .trim();

const config = {
  siteName: cleanedSiteName,
  exampleEmail: process.env.EXAMPLE_EMAIL || "",
  examplePassword: process.env.EXAMPLE_PASSWORD || "",
  demoDomain: process.env.DEMO_DOMAIN || "giapha-os.homielab.com",
};

export default config;
