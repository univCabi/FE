// 사물함 버튼 컴포넌트 배열 관련

interface CabinetButtonComponentProps {
  rows: number;
  columns: number;
}

const CabinetButtonComponent = ({
  rows,
  columns,
}: CabinetButtonComponentProps) => {
  const cabinetButtons = () => {
    const buttons = []; // 사물함 버튼 배열

    for (let i = 0; i < columns; i++) {
      buttons.push(
        <div key={i} className="mx-1">
          {Array(rows)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className="w-16 h-16 my-2 rounded-md bg-gray-300 text-gray-500 text-sm hover:bg-gray-200 flex justify-start items-end p-2"
              ></button>
            ))}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div className="absolute p-24 flex justify-center items-center w-full">
      {cabinetButtons()}
    </div>
  );
};

export default CabinetButtonComponent;
