import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container container-narrow">
        <p className="not-found-code">۴۰۴</p>
        <h1>این صفحه پیدا نشد</h1>
        <p>ممکن است نشانی تغییر کرده باشد یا صفحه‌ای که دنبال آن هستید دیگر وجود نداشته باشد.</p>
        <div><Link className="button button-primary" href="/">بازگشت به خانه<Icon name="arrow" /></Link><Link className="button button-outline" href="/articles">مشاهده مقاله‌ها</Link></div>
      </div>
    </main>
  );
}
