import { AdminListTableType } from "@/types/ListType";
import ListTableComponent from "@/components/ListTableComponent";
import { useOverdueCabinetListData } from "@/hooks/useOverdueCabinetListData";

const OverdueCabinetList = () => {
  const { overdueCabinetData, setObserverRef, scrollLoading } =
    useOverdueCabinetListData();
  console.log(overdueCabinetData);
  const columns = [
    {
      key: "user",
      label: "사용자 학번",
      render: (
        value: AdminListTableType[keyof AdminListTableType], //모든 타입을 유니온으로 묶음
      ) => {
        //studentNumber 타입을 가진 객체타입임을 명시
        if (value && typeof value === "object" && "studentNumber" in value) {
          return value.studentNumber ?? "학번 없음";
        } else {
          return "정보 없음";
        }
      },
    },
    {
      key: "overDate",
      label: "연체일",
      render: (value: AdminListTableType[keyof AdminListTableType]) => {
        {
          if (
            value &&
            (typeof value === "string" || typeof value === "number")
          ) {
            const now = new Date();
            const overDate = new Date(value);
            const diffDate = Math.floor(
              (now.getTime() - overDate.getTime()) / (1000 * 60 * 60 * 24),
            );
            return `${diffDate}일`;
          } else {
            return "정보 없음";
          }
        }
      },
    },
  ];
  return (
    <ListTableComponent
      columns={columns}
      data={overdueCabinetData}
      setObserverRef={setObserverRef}
      scrollLoading={scrollLoading}
      theadClassName="text-xl"
      thClassName="p-5"
      tdClassName="p-5"
    />
  );
};

export default OverdueCabinetList;
