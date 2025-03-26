import { formatDate } from "@/utils/formatDate";
import ListTableComponent from "./ListTableComponent";

interface UserHistoryData {
  building: string;
  floor: number;
  section: string;
  cabinetNumber: number;
  startDate: string | null;
  endDate: string | null;
}

interface HistoryListProp {
  userHistoryData: UserHistoryData[];
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
      render: (value: string | null) =>
        value ? formatDate(value) : "날짜 정보를 불러올 수 없습니다.",
    },
    {
      key: "endDate",
      label: "반납일",
      render: (value: string | null) =>
        value ? formatDate(value) : "날짜 정보를 불러올 수 없습니다.",
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
