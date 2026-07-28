"use client";

import { memo } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { BarDatum, CategoryDatum } from "@/components/calorie/types";

const COLORS = ["#4F8F32", "#D8A927", "#7FB65D", "#8B6F36", "#557A62", "#A5C86B", "#B97A45", "#315E43"] as const;

type Props = Readonly<{ bars: readonly BarDatum[]; categories: readonly CategoryDatum[] }>;

function CalorieCharts({ bars, categories }: Props) {
  return (
    <div className="calorie-charts">
      <h2>نمودار کالری اقلام</h2>
      <div className="chart-box" aria-label="نمودار کالری اقلام">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[...bars]} margin={{ top: 8, right: 8, left: 0, bottom: 40 }}>
            <XAxis dataKey="name" interval={0} angle={-25} dy={20} tick={{ fontSize: 11 }} height={64} />
            <YAxis tick={{ fontSize: 11 }} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <Tooltip />
            <Bar dataKey="calories" radius={[6, 6, 0, 0]} isAnimationActive={false}>
              {bars.map((item, index) => <Cell key={item.name} fill={COLORS[index % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {categories.length > 1 && <><h2>سهم کالری بر اساس دسته‌بندی</h2><div className="chart-box pie" aria-label="نمودار سهم دسته‌بندی‌ها"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[...categories]} dataKey="calories" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} isAnimationActive={false}>{categories.map((item, index) => <Cell key={item.name} fill={COLORS[index % COLORS.length]} />)}</Pie><Legend /><Tooltip /></PieChart></ResponsiveContainer></div></>}
    </div>
  );
}

export default memo(CalorieCharts);
