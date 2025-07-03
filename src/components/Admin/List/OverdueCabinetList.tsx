import { AdminListTableTypeValue } from "@/types/ListType";
import ListTableComponent from "@/components/ListTableComponent";
import { useOverdueCabinetListData } from "@/hooks/Admin/List/useOverdueCabinetListData";

const OverdueCabinetList = () => {
  const { overdueCabinetData, setObserverRef, isScrollLoading } =
    useOverdueCabinetListData();
  const columns = [
    {
      key: "user",
      label: "사용자 학번",
      render: (
        value: AdminListTableTypeValue, //모든 타입을 유니온으로 묶음
      ) => {
        //studentNumber 타입을 가진 객체타입임을 명시
        if (value && typeof value === "object" && "studentNumber" in value) {
          return value.studentNumber ?? "학번 정보가 null 입니다";
        } else {
          return "user 정보가 없습니다";
        }
        // if (value && typeof value === "object" && "studentNumber" in value) {
        //   const studentNumber =
        //     value.studentNumber ?? "학번 정보가 null 입니다";
        //   const userName = value.name ?? "";
        //   return `${studentNumber} (${userName})`;
        // } else {
        //   return "user 정보가 없습니다";
        // }
      },
    },
    {
      key: "overDate",
      label: "연체일",
      render: (value: AdminListTableTypeValue) => {
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
            return "날짜 정보가 없습니다";
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
      isScrollLoading={isScrollLoading}
      theadClassName="text-xl"
      thClassName="p-5"
      tdClassName="p-5"
    />
  );
};

export default OverdueCabinetList;
