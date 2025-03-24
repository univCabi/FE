import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChartData, useBarChartData } from "@/hooks/useBarChartData";

const CabinetBarChart = () => {
  const { barChartData } = useBarChartData();

  // 범례를 한국어로 표기하기 위한 data 가공공
  const convertedBarChartData = barChartData.map((data: BarChartData) => ({
    name: data.name,
    사용중: data.using,
    반납지연: data.overdue,
    사용불가: data.broken,
    사용가능: data.available,
  }));
  console.log(convertedBarChartData);

  const colorPerStatus: Record<string, string> = {
    사용중: "#22c55e",
    반납지연: "#ef4444",
    사용불가: "#111827",
    사용가능: "#d1d5db",
  };

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={convertedBarChartData} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="4 0" />
        <XAxis
          dataKey="name"
          tick={{
            fontSize: 12,
          }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip wrapperStyle={{ fontWeight: "bold" }} />{" "}
        <Legend verticalAlign="bottom" />
        {Object.keys(colorPerStatus).map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={colorPerStatus[key]}
            animationBegin={index * 500}
            animationDuration={500}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CabinetBarChart;
