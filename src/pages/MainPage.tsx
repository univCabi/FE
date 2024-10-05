import { useState } from "react";
import React from "react";
import Nav from "./Nav";
import Cabinet from "../components/Cabinet";
import CabinetInfo from "../components/CabinetInfo";

const MainPage = () => {
  // 건물별 층수에 대한 정보 예시(사물함이 위치한 층수)
  const buildings = [
    { name: "가온관", floors: ["1층", "2층", "3층"] },
    { name: "공학1관", floors: ["4층", "5층", "6층"] },
    { name: "공학2관", floors: ["7층", "8층", "9층"] },
    { name: "디자인관", floors: ["10층", "11층", "12층"] },
    { name: "나래관", floors: ["13층", "14층", "15층"] },
    { name: "누리관", floors: ["16층", "17층", "18층"] },
    { name: "수산과학관", floors: ["19층", "20층", "21층"] },
    { name: "웅비관", floors: ["22층", "23층", "24층"] },
    { name: "인문사회경영관", floors: ["25층", "26층", "27층"] },
    { name: "자연과학1관", floors: ["28층", "29층", "30층"] },
    { name: "자연과학2관", floors: ["31층", "32층", "33층"] },
    { name: "장영실관", floors: ["34층", "35층", "36층"] },
    { name: "창의관", floors: ["37층", "38층", "39층"] },
    { name: "충무관", floors: ["40층", "41층", "42층"] },
    { name: "향파관", floors: ["43층", "44층", "45층"] },
    { name: "환경해양관", floors: ["46층", "47층", "48층"] },
    { name: "호연관", floors: ["49층", "50층", "51층"] },
  ];

  // 선택한 건물의 인덱스를 저장하는 상태
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  // 선택한 층수의 인덱스를 저장하는 상태
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  // 드롭다운 상태
  const [isOpen, setIsOpen] = useState(false);

  // 선택된 건물의 인덱스를 변경하는 함수
  const toggleBuilding = (index: number) => {
    setSelectedBuilding(index);
    setSelectedFloor(null);
    setIsOpen(false);
  };

  // 선택된 층수의 인덱스를 변경하는 함수
  const toggleFloor = (floorIndex: number) => {
    setSelectedFloor(floorIndex);
  };

  return (
    <div>
      <Nav
        buildings={buildings} // building 목록을 Nav로 전달
        selectedBuilding={selectedBuilding} // 선택된 건물 전달
        setSelectedBuilding={setSelectedBuilding} // 선택된 건물을 변경할 수 있도록 전달
        setSelectedFloor={setSelectedFloor}
        isOpen={isOpen} // 드롭다운 상태 전달
        setIsOpen={setIsOpen} // 드롭다운 상태를 변경하는 함수 전달
      />

      {/* 좌측 건물 정보 -> 스크롤로 표시 */}
      <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex flex-col pt-20">
        <div className="overflow-y-auto h-3/5">
          {buildings.map((building, index) => (
            <div key={index} className="mx-2">
              <button
                className={`p-4 w-full text-gray-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-150 ${
                  selectedBuilding === index ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => toggleBuilding(index)}
              >
                {building.name}
              </button>

              {/* 건물 선택 후, 선택된 건물의 층 목록 표시 */}
              {selectedBuilding === index && (
                <div className="absolute inset-y-0 left-40 w-24 border-r-2 border-gray-400 flex flex-col pt-20">
                  {building.floors.map((floor, floorIndex) => (
                    <button
                      key={floorIndex}
                      className={`p-4 w-auto text-gray-500 hover:bg-blue-600 hover:text-white mx-2 rounded-lg transition-all duration-150 ${
                        selectedFloor === floorIndex
                          ? "bg-blue-600 text-white mx-2"
                          : ""
                      }`}
                      onClick={() => toggleFloor(floorIndex)}
                    >
                      {floor}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* 좌측 하단 메뉴 */}
          <div className="absolute bottom-4 w-full flex flex-col items-center text-gray-500">
            <button className="p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
              Search
            </button>
            <button className="p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
              Log
            </button>
            <button className="p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
              Logout
            </button>
          </div>
        </div>
        <div className="border-t-2 border-gray-400 pt-10 mx-6"></div>
      </div>

      {/* 사물함 위치(중앙) */}
      <div className="absolute inset-y-0 left-64 right-80 border-r-2 border-gray-400 pt-20 hidden sl:block flex-col">
        {/* 건물 선택 후, 층수 선택을 둘 다 해야 사물함 컴포넌트가 보임 */}
        {selectedBuilding !== null && selectedFloor !== null && <Cabinet />}

        {/* 사물함 상태 안내(하단) */}
        <CabinetInfo />
      </div>

      {/* 선택한 사물함 정보(우측) -> 추후 사물함 컴포넌트와 연결 */}
      <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center">
        <div>
          <div className="pb-5">icon</div>
          <div>
            사물함을
            <br />
            선택해주세요
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
