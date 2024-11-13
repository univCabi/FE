interface HistoryListProp {
  userHistoryData: {
    building: string;
    floor: number;
    section: string;
    cabinetNumber: number;
    startDate: string;
    endDate: string;
  }[];
}

const HistoryList = ({ userHistoryData }: HistoryListProp) => {
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
