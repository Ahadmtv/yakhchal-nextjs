import Icon from "@/components/Icon";

export const calorieFaqs = [
  { q: "منبع کالری هر ۱۰۰ گرم چیست؟", a: "برای اقلام مجموعه فعلی منبع مستقل و تاریخ بازبینی ثبت نشده است؛ بنابراین اعداد باید برآورد عمومی و غیرکلینیکی تلقی شوند." },
  { q: "آیا روش پخت روی کالری اثر دارد؟", a: "بله. مقدار روغن، سس، آب و نسبت مواد می‌تواند کالری هر ۱۰۰ گرم را تغییر دهد؛ نتیجه ابزار یک دستور مشخص را مدل نمی‌کند." },
  { q: "چطور واحدهای مرسوم را به گرم تبدیل کنم؟", a: "کفگیر، قاشق یا سیخ اندازه ثابت ندارند. برای دقت بهتر بخش خوراکی را با ترازو وزن کنید و از حدس یک واحد عمومی پرهیز کنید." },
  { q: "آیا می‌توان نتایج را ذخیره کرد؟", a: "بله. اقلام واردشده در مرورگر ذخیره می‌شوند و دفعه بعد در دسترس خواهند بود." },
] as const;

export default function CalorieHelp() {
  return (
    <section className="calorie-help" aria-labelledby="calorie-help-title">
      <h2 id="calorie-help-title">چگونه کالری را دقیق‌تر محاسبه کنیم؟</h2>
      <p>مقادیر برای هر ۱۰۰ گرم ثبت شده‌اند. تاریخ بازبینی منبع: ثبت نشده. روش پخت و مواد افزوده مانند روغن و سس نیز بر نتیجه اثر دارند.</p>
      <div>{calorieFaqs.map((item) => <details key={item.q} data-analytics-event="open_faq" data-analytics-source="calorie_help"><summary><span>{item.q}</span><Icon name="add" /></summary><p>{item.a}</p></details>)}</div>
    </section>
  );
}
