import { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  date: string; // "2025-04-17"
  amount: number; // 472.38
}

interface SalesChartProps {
  salesOverTime: ChartDataPoint[];
}

export default class SalesChart extends PureComponent<SalesChartProps> {
  componentDidMount() {
    console.log(
      "SalesChart data:",
      this.props.salesOverTime
      //   JSON.stringify(this.props.salesOverTime)
    );
  }

  render() {
    const { salesOverTime } = this.props;

    return (
      <div style={{ margin: "3rem 0" }}>
        <h2>Sales Chart</h2>
        <ResponsiveContainer width="100%" minHeight={300}>
          <LineChart
            data={salesOverTime}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD", // or PHP
                  minimumFractionDigits: 2,
                })
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
