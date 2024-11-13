import { useHistoryData } from "@/hooks/useHistoryData";
const HistoryList = () => {
  const { userHistoryData } = useHistoryData();
  console.log(userHistoryData[0]);
  return (
    <div className="p-10">
      {userHistoryData.map((item, index) => (
        <div key={index}>
          <p>{item.building}</p>
          <p>{item.floor}</p>
          <p>{item.cabinetNumber}</p>
          <p>{item.section}</p>
          <p>{item.startDate}</p>
          <p>{item.endDate}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
