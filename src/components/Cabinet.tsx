const Cabinet = () => {
  const cabinetButtons = () => {
    const columns = 10; // 총 4개의 열
    const rows = 6; // 각 열에 6개의 버튼
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
    <div className="absoulte p-24 flex justify-center items-center">
      {cabinetButtons()}
    </div>
  );
};

export default Cabinet;
