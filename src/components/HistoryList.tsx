import { HistoryData } from "@/types/ListType";
import ListTableComponent from "@/components/ListTableComponent";

interface HistoryListProp {
  userHistoryData: HistoryData[];
  setObserverRef: (node: HTMLTableRowElement) => void;
  scrollLoading: boolean;
}

const HistoryList = ({
  userHistoryData,
  setObserverRef,
  scrollLoading,
}: HistoryListProp) => {
  const columns = [
    {
      key: "startDate",
      label: "대여일",
      render: (value: HistoryData[keyof HistoryData]) =>
        value
          ? new Date(value)
              .toLocaleDateString("ko-kR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\.$/, "")
          : "날짜 정보를 불러올 수 없습니다.",
    },
    {
      key: "endDate",
      label: "반납일",
      render: (value: HistoryData[keyof HistoryData]) =>
        value
          ? new Date(value)
              .toLocaleDateString("ko-kR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\.$/, "")
          : "날짜 정보를 불러올 수 없습니다.",
    },
  ];
  return (
    <ListTableComponent
      columns={columns}
      data={userHistoryData}
      setObserverRef={setObserverRef}
      scrollLoading={scrollLoading}
      theadClassName="text-xl"
      thClassName="p-5"
      tdClassName="p-5"
    />
  );
};

export default HistoryList;
