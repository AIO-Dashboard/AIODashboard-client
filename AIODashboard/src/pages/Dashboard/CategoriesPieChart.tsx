import { Stack } from "@mui/material";
import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  //   Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CategoriesPieChartProps {
  categoryDist: { category: string; count: number }[];
}

const getRandomBlueShade = () => {
  const hue = 210; // Blue hue
  const saturation = Math.floor(70 + Math.random() * 20); // 70–90%
  const lightness = Math.floor(40 + Math.random() * 40); // 40–80%
  return hslToHex(hue, saturation, lightness);
};

// Helper: Convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    );

  return `#${[f(0), f(8), f(4)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
}

export default class CategoriesPieChart extends PureComponent<CategoriesPieChartProps> {
  render() {
    const { categoryDist } = this.props;
    console.log("CategoriesPieChart data:", categoryDist);
    return (
      <>
        <ResponsiveContainer width="100%" minHeight="300px">
          <PieChart width={500} height={500}>
            <Pie
              dataKey="count"
              isAnimationActive={false}
              data={categoryDist}
              cx="50%"
              cy="50%"
              outerRadius={110}
              // fill="#8884d8"

              label={({ category, count }) => `${category}: ${count}`}
            >
              {categoryDist.map((entry, index) => (
                <Cell
                  key={`cell-${entry.category}`}
                  fill={getRandomBlueShade()}
                >
                  {entry.category}
                </Cell>
              ))}
            </Pie>
            {/* <Pie
            dataKey="value"
            data={data02}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          /> */}
            <Tooltip
              formatter={(value: number, _name: string, props: any) => {
                const category = props.payload.category;
                return [`${value} products`, `${category}`];
              }}
            />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>
      </>
    );
  }
}
