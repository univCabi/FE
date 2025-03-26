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
            className="even:bg-white"
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
            <LogoSVG className="animate-spin" />
          </div>
        )}
      </tbody>
    </table>
  );
};
export default ListTableComponent;
