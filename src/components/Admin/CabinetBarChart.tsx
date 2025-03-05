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

const CabinetBarChart = () => {
  const mockData = [
    { name: "가온관", 사용중: 30, 반납지연: 10, 사용불가: 5, 사용가능: 55 },
    {
      name: "건축관",
      사용중: 25,
      반납지연: 15,
      사용불가: 10,
      사용가능: 50,
    },
    { name: "공학1관", 사용중: 35, 반납지연: 5, 사용불가: 7, 사용가능: 53 },
    {
      name: "디자인관",
      사용중: 28,
      반납지연: 12,
      사용불가: 6,
      사용가능: 54,
    },
    { name: "누리관", 사용중: 33, 반납지연: 8, 사용불가: 9, 사용가능: 50 },
    {
      name: "수산과학관",
      사용중: 27,
      반납지연: 14,
      사용불가: 5,
      사용가능: 54,
    },
    { name: "응비관", 사용중: 31, 반납지연: 9, 사용불가: 4, 사용가능: 56 },
    { name: "가온관", 사용중: 30, 반납지연: 10, 사용불가: 5, 사용가능: 55 },
    {
      name: "건축관",
      사용중: 25,
      반납지연: 15,
      사용불가: 10,
      사용가능: 50,
    },
    { name: "공학1관", 사용중: 35, 반납지연: 5, 사용불가: 7, 사용가능: 53 },
    {
      name: "디자인관",
      사용중: 28,
      반납지연: 12,
      사용불가: 6,
      사용가능: 54,
    },
    { name: "누리관", 사용중: 33, 반납지연: 8, 사용불가: 9, 사용가능: 50 },
    {
      name: "수산과학관",
      사용중: 27,
      반납지연: 14,
      사용불가: 5,
      사용가능: 54,
    },
    { name: "응비관", 사용중: 31, 반납지연: 9, 사용불가: 4, 사용가능: 56 },
    { name: "응비관", 사용중: 31, 반납지연: 9, 사용불가: 4, 사용가능: 56 },
    { name: "응비관", 사용중: 31, 반납지연: 9, 사용불가: 4, 사용가능: 56 },
    { name: "응비관", 사용중: 31, 반납지연: 9, 사용불가: 4, 사용가능: 56 },
  ];
  const colorPerStatus: Record<string, string> = {
    사용중: "#22c55e",
    반납지연: "#ef4444",
    사용불가: "#111827",
    사용가능: "#d1d5db",
  };
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={mockData} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="4 0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
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
