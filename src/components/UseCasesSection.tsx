import Icon, { type IconName } from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

const useCases: ReadonlyArray<{ icon: IconName; title: string; description: string }> = [
  { icon: "clock", title: "افراد پرمشغله", description: "وعده روزهای کاری را از قبل مشخص کنید و خرید لازم را یکجا ببینید." },
  { icon: "restaurant", title: "خانواده‌ها", description: "برنامه هفته و فهرست خرید را منظم‌تر نگه دارید تا تصمیم هر روز ساده‌تر شود." },
  { icon: "shield", title: "کاهش دورریز", description: "مواد موجود و تاریخ انقضا را مرور کنید و پیش از خرید دوباره از آن‌ها استفاده کنید." },
  { icon: "calendar", title: "برنامه‌ریزی غذا", description: "وعده‌های چند روز آینده را کنار هم بچینید و در صورت نیاز تغییر دهید." },
  { icon: "shopping", title: "خرید هفتگی", description: "کمبودهای برنامه را به فهرست خرید ببرید و اقلام را حین خرید علامت بزنید." },
];

export default function UseCasesSection() {
  return (
    <section className="use-cases-section deferred-section" aria-labelledby="use-cases-title">
      <div className="container">
        <SectionHeading
          eyebrow="برای زندگی واقعی"
          title={<span id="use-cases-title">یخچال برای چه کسانی مفید است؟</span>}
          description="برای روزهای شلوغ، خرید منظم و استفاده بهتر از مواد غذایی خانه."
          align="center"
        />
        <div className="use-cases-grid">
          {useCases.map((item) => <article className="use-case-card" key={item.title}><span><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
