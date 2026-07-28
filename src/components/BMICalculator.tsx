"use client";

import { useCallback, useMemo, useState, type ChangeEvent, type CSSProperties } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const normalizeNumber = (value: string) => value
  .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
  .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
  .replace(/[^\d.]/g, "");

type BmiCategory = { label: string; color: string };

function getCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return { label: "کمبود وزن", color: "var(--info)" };
  if (bmi < 25) return { label: "نرمال", color: "var(--success)" };
  if (bmi < 30) return { label: "اضافه وزن", color: "var(--warning)" };
  return { label: "چاقی", color: "var(--error)" };
}

const ranges = [
  ["کمبود وزن", "var(--info)"], ["نرمال", "var(--success)"],
  ["اضافه وزن", "var(--warning)"], ["چاقی", "var(--error)"],
] as const;

export default function BMICalculator() {
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const height = useMemo(() => Number(normalizeNumber(heightInput)), [heightInput]);
  const weight = useMemo(() => Number(normalizeNumber(weightInput)), [weightInput]);
  const heightIsValid = height >= 100 && height <= 250;
  const weightIsValid = weight >= 25 && weight <= 350;
  const bmi = useMemo(() => submitted && heightIsValid && weightIsValid ? Number((weight / (height / 100) ** 2).toFixed(1)) : null, [height, heightIsValid, submitted, weight, weightIsValid]);
  const category = useMemo(() => bmi ? getCategory(bmi) : null, [bmi]);
  const color = category?.color ?? "var(--primary)";
  const progress = bmi ? clamp(bmi / 40, 0, 1) : 0;

  const calculate = useCallback(() => {
    setTouched(true);
    setSubmitted(heightIsValid && weightIsValid);
  }, [heightIsValid, weightIsValid]);
  const handleHeight = useCallback((event: ChangeEvent<HTMLInputElement>) => { setHeightInput(event.target.value); setSubmitted(false); }, []);
  const handleWeight = useCallback((event: ChangeEvent<HTMLInputElement>) => { setWeightInput(event.target.value); setSubmitted(false); }, []);

  return (
    <section className="bmi-section" id="bmi" aria-labelledby="bmi-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">ابزار رایگان سلامت</p>
          <h2 id="bmi-title">محاسبه سریع شاخص توده بدنی</h2>
          <p className="section-description">قد و وزن خود را وارد کنید تا نمایی کلی از وضعیت وزنی‌تان ببینید. این نتیجه جایگزین ارزیابی تخصصی پزشکی نیست.</p>
        </div>
        <div className="bmi-card" style={{ "--bmi-color": color } as CSSProperties}>
          <div className="bmi-form">
            <Field id="height" label="قد" unit="cm" placeholder="مثلاً ۱۷۵" value={heightInput} onChange={handleHeight} invalid={touched && !heightIsValid} message="قد را بین ۱۰۰ تا ۲۵۰ وارد کنید." />
            <Field id="weight" label="وزن" unit="kg" placeholder="مثلاً ۷۰" value={weightInput} onChange={handleWeight} invalid={touched && !weightIsValid} message="وزن را بین ۲۵ تا ۳۵۰ وارد کنید." />
            <button className="button button-primary button-large bmi-submit" type="button" onClick={calculate}>محاسبه</button>
            <p className="form-note">توجه: BMI تنها یک شاخص کلی است و برای ارزیابی دقیق‌تر با متخصص مشورت کنید.</p>
          </div>
          <div className="bmi-result">
            <div className="bmi-gauge-wrap" aria-live="polite">
              <div className="bmi-gauge" style={{ background: `conic-gradient(${color} ${progress * 360}deg,color-mix(in srgb, ${color} 15%, transparent) ${progress * 360}deg 360deg)` }}>
                <div><strong>{bmi?.toFixed(1) ?? "--"}</strong><span>BMI</span></div>
              </div>
            </div>
            <div className="bmi-summary">
              <h3>{category?.label ?? "نتیجه"}</h3>
              <div className="bmi-progress"><span style={{ width: `${progress * 100}%`, backgroundColor: color }} /></div>
              <div className="bmi-ranges">{ranges.map(([label, rangeColor]) => <span key={label} style={{ color: rangeColor, background: `color-mix(in srgb, ${rangeColor} 16%, transparent)` }}>{label}</span>)}</div>
              {bmi && <p>محدوده سالم معمولاً بین ۱۸.۵ تا ۲۴.۹ است.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, unit, placeholder, value, onChange, invalid, message }: Readonly<{
  id: string; label: string; unit: string; placeholder: string; value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; invalid: boolean; message: string;
}>) {
  return (
    <div className={`field${invalid ? " invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="input-with-unit"><input id={id} value={value} onChange={onChange} placeholder={placeholder} inputMode="decimal" aria-invalid={invalid} aria-describedby={`${id}-help`} /><span>{unit}</span></div>
      <small id={`${id}-help`}>{invalid ? message : "\u00a0"}</small>
    </div>
  );
}
