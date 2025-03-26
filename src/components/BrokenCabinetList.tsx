import { AdminListTableType } from "@/types/ListType";
import ListTableComponent from "@/components/ListTableComponent";
import { useBrokenCabinetListData } from "@/hooks/useBrokenCabinetListData";

const BrokenCabinetList = () => {
  const { brokenCabinetData, setObserverRef, scrollLoading } =
    useBrokenCabinetListData();
  const columns = [
    {
      key: "brokenDate",
      label: "고장일",
      render: (value: AdminListTableType[keyof AdminListTableType]) =>
        value
          ? new Date(value as string | number)
              .toLocaleDateString("ko-kR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\.$/, "")
          : "날짜 정보가 없습니다",
    },
    {
      key: "reason",
      label: "고장 원인",
      render: (value: AdminListTableType[keyof AdminListTableType]) => {
        return value ? (value as string) : "고장 정보가 없습니다";
      },
    },
  ];
  return (
    <ListTableComponent
      columns={columns}
      data={brokenCabinetData}
      setObserverRef={setObserverRef}
      scrollLoading={scrollLoading}
      theadClassName="text-xl"
      thClassName="p-5"
      tdClassName="p-5"
    />
  );
};

export default BrokenCabinetList;
