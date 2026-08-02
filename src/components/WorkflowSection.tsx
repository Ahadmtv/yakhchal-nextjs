import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { assets } from "@/lib/assets";

const steps: ReadonlyArray<{ icon: IconName; title: string; description: string }> = [
  { icon: "restaurant", title: "مواد غذایی موجود را ثبت کن", description: "مواد خانه را در موجودی یخچال، فریزر یا کابینت نگه دار." },
  { icon: "sparkle", title: "غذاهای مناسب با موجودی را ببین", description: "از مواد ثبت‌شده برای پیدا کردن گزینه‌های قابل‌پخت کمک بگیر." },
  { icon: "calendar", title: "برنامه هفته و لیست خرید را بساز", description: "وعده‌ها را بچین و کمبودهای برنامه را به فهرست خرید ببر." },
  { icon: "shopping", title: "انقضا و خریدها را مدیریت کن", description: "مواد نزدیک به انقضا و اقلام خرید را در یک جریان مرور کن." },
];

export default function WorkflowSection() {
  return (
    <section className="workflow-section deferred-section" id="workflow" aria-labelledby="workflow-title">
      <div className="container workflow-grid">
        <div>
          <SectionHeading
            eyebrow="چهار قدم کوتاه"
            title={<span id="workflow-title">از موجودی خانه تا برنامه قابل‌اجرا</span>}
            description="موجودی، پیشنهاد غذا، برنامه هفتگی و خرید در یک مسیر به هم متصل می‌شوند."
          />
          <ol className="workflow-steps">
            {steps.map((step, index) => (
              <li className="workflow-step" key={step.title}>
                <span><Icon name={step.icon} /><b>{index + 1}</b></span>
                <div><strong>{step.title}</strong><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="workflow-app-preview">
          <Image src={assets.appPreview760} alt="نمای واقعی رابط فعلی اپلیکیشن یخچال" width={760} height={1516} sizes="(max-width: 899px) 280px, 330px" quality={80} />
          <figcaption>نمای فعلی اپلیکیشن؛ جزئیات هر نسخه ممکن است تغییر کند.</figcaption>
        </figure>
      </div>
    </section>
  );
}
