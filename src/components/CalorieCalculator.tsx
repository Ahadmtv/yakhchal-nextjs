"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Icon from "@/components/Icon";
import { iranianFoods } from "@/data/foods";
import { trackEvent } from "@/lib/analytics";
import type {
  BarDatum,
  CalculatedCalorieRow,
  CalorieRowState,
  CategoryDatum,
} from "@/components/calorie/types";

const CalorieCharts = dynamic(() => import("@/components/calorie/CalorieCharts"), {
  ssr: false,
  loading: () => <div className="chart-skeleton" aria-hidden="true" />,
});

const STORAGE_KEY = "yakhchal:calorie:rows";
const MAX_GRAMS = 5000;
const FOOD_BY_ID = new Map(iranianFoods.map((food) => [food.id, food]));
const VALID_IDS = new Set(FOOD_BY_ID.keys());
const FOOD_OPTIONS = iranianFoods.map((food) => ({
  label: `${food.name} — ${food.category}`,
  search: `${food.name} ${food.category}`.toLocaleLowerCase("fa"),
  id: food.id,
}));
const NUMBER_FORMAT = new Intl.NumberFormat("fa-IR");

function parseStoredRows(raw: string | null): CalorieRowState[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const candidate = item as { id?: unknown; grams?: unknown };
      if (typeof candidate.id !== "string" || !VALID_IDS.has(candidate.id)) return [];
      const grams = Number(candidate.grams);
      if (!Number.isFinite(grams)) return [];
      return [{ id: candidate.id, grams: Math.max(0, Math.min(MAX_GRAMS, grams)) }];
    });
  } catch {
    return [];
  }
}

function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660));
}

function numericDigits(value: string): number {
  return Number(toEnglishDigits(value).replace(/[^0-9]/g, ""));
}

function formatNumber(value: number): string {
  return NUMBER_FORMAT.format(Math.round(value));
}

function calculateRows(rows: readonly CalorieRowState[]): CalculatedCalorieRow[] {
  return rows.flatMap((row) => {
    const food = FOOD_BY_ID.get(row.id);
    return food ? [{ ...row, food, calories: (food.caloriesPer100g * row.grams) / 100 }] : [];
  });
}

function createBarData(rows: readonly CalculatedCalorieRow[]): BarDatum[] {
  return rows.map((row) => ({
    name: row.food.name.length > 18 ? `${row.food.name.slice(0, 17)}…` : row.food.name,
    calories: Math.round(row.calories),
  }));
}

function createCategoryData(rows: readonly CalculatedCalorieRow[]): CategoryDatum[] {
  const categories = new Map<string, number>();
  for (const row of rows) categories.set(row.food.category, (categories.get(row.food.category) ?? 0) + row.calories);
  return [...categories].map(([name, calories]) => ({ name, calories: Math.round(calories) }));
}

type RowProps = Readonly<{
  row: CalculatedCalorieRow;
  onUpdate: (id: string, grams: number) => void;
  onRemove: (id: string) => void;
}>;

const CalorieItemRow = memo(function CalorieItemRow({ row, onUpdate, onRemove }: RowProps) {
  const invalid = row.grams <= 0;
  const errorId = `weight-${row.id}-error`;
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => onUpdate(row.id, numericDigits(event.target.value)), [onUpdate, row.id]);
  const handleRemove = useCallback(() => onRemove(row.id), [onRemove, row.id]);
  const set50 = useCallback(() => onUpdate(row.id, 50), [onUpdate, row.id]);
  const set100 = useCallback(() => onUpdate(row.id, 100), [onUpdate, row.id]);
  const set150 = useCallback(() => onUpdate(row.id, 150), [onUpdate, row.id]);

  return (
    <div className="calorie-row">
      <div className="calorie-row-title"><strong>{row.food.name}</strong><small>هر ۱۰۰ گرم: {formatNumber(row.food.caloriesPer100g)} کالری</small></div>
      <label className="grams-field"><span className="sr-only">وزن {row.food.name}</span><input value={formatNumber(row.grams)} onChange={handleChange} inputMode="numeric" min={1} max={MAX_GRAMS} aria-label={`وزن ${row.food.name} به گرم`} aria-invalid={invalid} aria-describedby={invalid ? errorId : undefined} /><i>گرم</i></label>
      <div className="quick-grams"><button type="button" onClick={set50}>۵۰</button><button type="button" onClick={set100}>۱۰۰</button><button type="button" onClick={set150}>۱۵۰</button></div>
      <button className="icon-button danger" type="button" onClick={handleRemove} aria-label={`حذف ${row.food.name}`}><Icon name="delete" /></button>
      <strong className="row-calories">{formatNumber(row.calories)} کالری</strong>
      {invalid && <small className="row-weight-error" id={errorId}>وزن باید بیشتر از صفر و حداکثر ۵٬۰۰۰ گرم باشد.</small>}
    </div>
  );
});

export default function CalorieCalculator() {
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rows, setRows] = useState<CalorieRowState[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    try {
      setRows(parseStoredRows(localStorage.getItem(STORAGE_KEY)));
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {
      // Storage can be unavailable in restricted contexts.
    }
  }, [rows, storageReady]);

  const normalizedQuery = query.trim().toLocaleLowerCase("fa");
  const suggestions = useMemo(() => {
    if (!normalizedQuery) return FOOD_OPTIONS.slice(0, 8);
    return FOOD_OPTIONS.filter((option) => option.search.includes(normalizedQuery)).slice(0, 8);
  }, [normalizedQuery]);
  const calculatedRows = useMemo(() => calculateRows(rows), [rows]);
  const total = useMemo(() => calculatedRows.reduce((sum, row) => sum + row.calories, 0), [calculatedRows]);
  const bars = useMemo(() => createBarData(calculatedRows), [calculatedRows]);
  const categories = useMemo(() => createCategoryData(calculatedRows), [calculatedRows]);

  useEffect(() => {
    if (!storageReady || completedRef.current) return;
    const validItemCount = calculatedRows.filter((row) => row.grams > 0).length;
    if (!validItemCount) return;
    completedRef.current = true;
    trackEvent("complete_calorie_calculation", { item_count: validItemCount });
  }, [calculatedRows, storageReady]);

  const add = useCallback((id: string) => {
    if (rows.some((row) => row.id === id)) return;
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("start_calorie_calculation", { source: "food_search" });
    }
    setRows((current) => {
      if (current.some((row) => row.id === id)) return current;
      return [...current, { id, grams: 100 }];
    });
    setQuery("");
    setSearchOpen(false);
  }, [rows]);
  const update = useCallback((id: string, grams: number) => {
    const safeGrams = Math.max(0, Math.min(MAX_GRAMS, Number.isFinite(grams) ? grams : 0));
    setRows((current) => current.map((row) => row.id === id ? { ...row, grams: safeGrams } : row));
  }, []);
  const remove = useCallback((id: string) => setRows((current) => current.filter((row) => row.id !== id)), []);
  const clear = useCallback(() => setRows([]), []);
  const handleQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setActiveIndex(0);
    setSearchOpen(true);
  }, []);
  const handleSearchKeyDown = useCallback((event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSearchOpen(true);
      setActiveIndex((current) => Math.min(current + 1, Math.max(0, suggestions.length - 1)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(0, current - 1));
    } else if (event.key === "Enter" && searchOpen && suggestions[activeIndex]) {
      event.preventDefault();
      add(suggestions[activeIndex].id);
    } else if (event.key === "Escape") {
      setSearchOpen(false);
    }
  }, [activeIndex, add, searchOpen, suggestions]);

  return (
    <section className="calorie-section" aria-labelledby="calorie-title">
      <div className="container">
        <div className="calorie-card">
          <div className="calorie-head">
            <div><p className="eyebrow">ابزار محاسبه آنلاین</p><h1 id="calorie-title">کالری غذاهای ایرانی</h1></div>
            <button className="button button-ghost" type="button" onClick={clear} disabled={!rows.length}><Icon name="reset" />حذف همه</button>
          </div>
          <p className="calorie-intro">کالری غذاهای ایرانی را بر اساس وزن بر حسب گرم محاسبه کنید. اعداد فعلی منبع مستقل کنار هر خوراک ندارند و فقط برآورد عمومی‌اند؛ <Link href="/calorie-data-methodology">روش‌شناسی و محدودیت‌ها</Link> را بخوانید.</p>

          <div className="food-search">
            <label htmlFor="food-query">جست‌وجوی غذا</label>
            <div className="combobox-wrap">
              <input
                id="food-query"
                value={query}
                onChange={handleQuery}
                onFocus={() => { setActiveIndex(0); setSearchOpen(true); }}
                onKeyDown={handleSearchKeyDown}
                onBlur={() => window.setTimeout(() => setSearchOpen(false), 100)}
                placeholder="مثلاً قرمه‌سبزی یا نان سنگک"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={searchOpen}
                aria-controls={listboxId}
                aria-activedescendant={searchOpen && suggestions[activeIndex] ? `${listboxId}-${activeIndex}` : undefined}
              />
              <Icon name="add" />
              {searchOpen && (
                <div className="suggestions" id={listboxId} role="listbox">
                  {suggestions.length ? suggestions.map((option, index) => (
                    <button
                      key={option.id}
                      id={`${listboxId}-${index}`}
                      className={index === activeIndex ? "active" : undefined}
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      tabIndex={-1}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event: ReactMouseEvent<HTMLButtonElement>) => event.preventDefault()}
                      onClick={() => add(option.id)}
                    >{option.label}</button>
                  )) : <p>موردی یافت نشد</p>}
                </div>
              )}
            </div>
          </div>

          {calculatedRows.length ? (
            <div className="calorie-results">
              <div className="calorie-rows">{calculatedRows.map((row) => <CalorieItemRow key={row.id} row={row} onUpdate={update} onRemove={remove} />)}</div>
              <div className="calorie-total" aria-live="polite"><span>جمع کل</span><strong>{formatNumber(total)} کالری</strong></div>
              <CalorieCharts bars={bars} categories={categories} />
            </div>
          ) : (
            <div className="calorie-empty"><Icon name="add" /><p>یک غذا جست‌وجو کرده و مقدار آن را وارد کنید.</p></div>
          )}
          <aside className="calorie-app-cta"><div><strong>برنامه غذا و خرید را یکجا نگه دارید</strong><p>برای ادامه مسیر از محاسبه تا برنامه هفتگی، نسخه اندروید یخچال را ببینید.</p></div><Link className="button button-primary" href="/download" data-analytics-event="click_calorie_install_cta" data-analytics-source="calorie_calculator"><Icon name="download" />رفتن به صفحه دانلود</Link></aside>
        </div>
      </div>
    </section>
  );
}
