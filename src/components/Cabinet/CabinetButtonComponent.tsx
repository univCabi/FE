// 사물함 버튼 컴포넌트 배열 관련

interface CabinetButtonComponentProps {
  rows: number;
  columns: number;
  selectedBuilding: { name: string } | null;
  selectedFloor: number | null;
  setSelectedCabinet: (cabinetNumber: number) => void;
}

const CabinetButtonComponent = ({
  rows,
  columns,
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
}: CabinetButtonComponentProps) => {
  const cabinetButtons = () => {
    const buttons = []; // 사물함 버튼 배열

    for (let i = 0; i < columns; i++) {
      buttons.push(
        <div key={i} className="mx-1">
          {Array(rows)
            .fill(0)
            .map((_, index) => {
              const cabinetNumber = i * rows + index + 1; // 사물함 고유 번호 지정: 단순한 숫자 값

              return (
                <button
                  key={index}
                  onClick={() => setSelectedCabinet(cabinetNumber)}
                  className="w-16 h-20 my-2 rounded-md bg-gray-300 text-gray-500 text-sm hover:bg-gray-200 flex justify-start items-end p-2"
                >
                  {cabinetNumber}
                </button>
              );
            })}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div className="absolute py-24 px-6 flex justify-center w-full">
      <div className="flex flex-wrap">{cabinetButtons()}</div>
    </div>
  );
};

export default CabinetButtonComponent;
