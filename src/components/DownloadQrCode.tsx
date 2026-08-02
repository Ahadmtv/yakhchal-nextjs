import Image from "next/image";
import QRCode from "qrcode";
import { siteConfig } from "@/lib/site";

export default async function DownloadQrCode() {
  const target = `${siteConfig.url}/download?source=qr&utm_source=desktop_qr&utm_medium=qr&utm_campaign=app_download`;
  const dataUrl = await QRCode.toDataURL(target, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 224,
    color: { dark: "#14271D", light: "#FFFFFF" },
  });

  return (
    <figure className="download-qr">
      <Image src={dataUrl} alt="QR Code صفحه دانلود یخچال" width={176} height={176} unoptimized />
      <figcaption>با دوربین گوشی اسکن کنید</figcaption>
    </figure>
  );
}
