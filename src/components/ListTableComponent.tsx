import { useNavigate } from "react-router";
import LogoSVG from "@/icons/cabiLogo.svg?react";

interface Column<T, K extends keyof T = keyof T> {
  key: string;
  label: string;
  render: (value: T[K]) => JSX.Element | string | number;
}

interface CabinetLoactionType {
  building: string;
  floor: number;
  section: string;
  cabinetNumber: number;
}

interface ListTableProps<T> {
  columns: Column<T>[];
  data: T[];
  setObserverRef: (node: HTMLTableRowElement) => void;
  isScrollLoading: boolean;
  theadClassName: string;
  thClassName: string;
  tdClassName: string;
}

const ListTableComponent = <T,>({
  columns,
  data,
  setObserverRef,
  isScrollLoading,
  theadClassName,
  thClassName,
  tdClassName,
}: ListTableProps<T>) => {
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <table className="w-full">
      <thead
        className={`bg-blue-500 text-white rounded-t-lg sticky z-10 top-0 ${theadClassName}`}
      >
        <tr>
          <th className={`w-80 table-cell text-center ${thClassName}`}>위치</th>
          {columns.map((columm) => (
            <th
              key={columm.key}
              className={`w-1/3 table-cell text-center ${thClassName}`}
            >
              {columm.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            ref={index === data.length - 1 ? setObserverRef : null}
            className="even:bg-white cursor-pointer hover:bg-gray-300"
            onClick={() => {
              navigate(
                {
                  pathname: isAdmin ? "/admin/main" : "/main",
                  // 쿼리파라미터 설정
                  search: `?building=${encodeURIComponent((item as CabinetLoactionType).building)}&floors=${(item as CabinetLoactionType).floor}`,
                },
                {
                  // useLoaction().state 로 접근 가능능
                  state: {
                    cabinetNumber: (item as CabinetLoactionType).cabinetNumber,
                  },
                },
              );
            }}
          >
            <td className={`w-80 table-cell text-center ${tdClassName}`}>
              {`${(item as CabinetLoactionType).building}-${(item as CabinetLoactionType).section}-${(item as CabinetLoactionType).cabinetNumber}-${(item as CabinetLoactionType).floor}F`}
            </td>
            {columns.map((column) => (
              <td
                key={column.key}
                className={`w-1/3 table-cell text-center ${tdClassName}`}
              >
                {column.render!(item[column.key as keyof T])}
              </td>
            ))}
          </tr>
        ))}
        {isScrollLoading && (
          <div className="flex justify-center bg-white items-center">
            <LogoSVG className="animate-spin" width={40} height={50} />
          </div>
        )}
      </tbody>
    </table>
  );
};
export default ListTableComponent;
