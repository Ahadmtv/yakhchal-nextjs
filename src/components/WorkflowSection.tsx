import Icon, { type IconName } from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

const steps: ReadonlyArray<{ icon: IconName; title: string; description: string }> = [
  { icon: "sparkle", title: "هدفتان را مشخص کنید", description: "هدف سلامتی، سلیقه و محدودیت‌های غذایی‌تان را یک‌بار ثبت کنید." },
  { icon: "calendar", title: "برنامه شخصی بگیرید", description: "یخچال برای هر روز، وعده‌های متعادل و قابل‌اجرا پیشنهاد می‌دهد." },
  { icon: "shopping", title: "هوشمند خرید کنید", description: "مواد لازم خودکار جمع می‌شوند تا خرید سریع‌تر و دورریز کمتر شود." },
];

const meals = [
  { day: "شنبه", meal: "مرغ و سبزیجات", calories: "۵۳۰" },
  { day: "یکشنبه", meal: "عدس‌پلو سبک", calories: "۴۸۰" },
  { day: "دوشنبه", meal: "سالاد مدیترانه", calories: "۴۲۰" },
] as const;

export default function WorkflowSection() {
  return (
    <section className="workflow-section deferred-section" aria-labelledby="workflow-title">
      <div className="container workflow-grid">
        <div>
          <SectionHeading
            eyebrow="ساده از روز اول"
            title={<span id="workflow-title">مسیر سالم‌تر، بدون تصمیم‌های خسته‌کننده</span>}
            description="یخچال کارهای پراکنده برنامه‌ریزی، انتخاب غذا و خرید را به یک جریان ساده و منظم تبدیل می‌کند."
          />
          <div className="workflow-steps">
            {steps.map((step, index) => (
              <div className={`workflow-step${index === 0 ? " active" : ""}`} key={step.title}>
                <span><Icon name={step.icon} /></span>
                <div><strong>{step.title}</strong><p>{step.description}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="plan-wrap">
          <div className="plan-glow" aria-hidden="true" />
          <div className="plan-card">
            <div className="plan-head"><div><small>برنامه این هفته</small><h3>۵ وعده تا هدف</h3></div><span className="plan-chip"><Icon name="check" />۸۲٪ آماده</span></div>
            <div className="plan-progress" role="progressbar" aria-label="پیشرفت برنامه هفتگی" aria-valuenow={82} aria-valuemin={0} aria-valuemax={100}><span /></div>
            <div className="meal-list">
              {meals.map((meal, index) => (
                <div className={`meal-row${index === 0 ? " active" : ""}`} key={meal.day}>
                  <div><b>{index + 1}</b><span><small>{meal.day}</small><strong>{meal.meal}</strong></span></div>
                  <small>{meal.calories} کالری</small>
                </div>
              ))}
            </div>
            <p className="plan-note">مواد لازم همین حالا به لیست خرید اضافه شد</p>
          </div>
        </div>
      </div>
    </section>
  );
}
