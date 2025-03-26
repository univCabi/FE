import BrokenCabinetList from "../BrokenCabinetList";
import OverdueCabinetList from "../OverdueCabinetList";
import CabinetBarChart from "./CabinetBarChart";

const AdminInfoChart = () => {
  return (
    <div className="flex-col w-full h-full mr-24">
      <div className="h-[52%] pt-7 flex flex-col">
        <div className="font-bold text-2xl mb-4">건물별 사물함 사용 현황</div>
        <div className="h-[85%] w-[100%] flex items-center justify-center self-center">
          <CabinetBarChart></CabinetBarChart>
        </div>
      </div>

      <div className="flex justify-center gap-32 w-full">
        {/* 연체 사물함 */}
        <div className="w-2/5 p-4">
          <p className="font-bold text-2xl">연체 사물함</p>
          <div className=" border-collapse bg-gray-100 mt-3 border rounded-xl overflow-y-auto hidden-scrollbar shadow-lg">
            <OverdueCabinetList></OverdueCabinetList>
          </div>
        </div>
        {/* 고장 사물함 */}
        <div className="w-2/5 p-4">
          <p className="font-bold text-2xl">고장 사물함</p>
          <div className=" border-collapse bg-gray-100 mt-3 border rounded-xl overflow-y-auto hidden-scrollbar shadow-lg">
            <BrokenCabinetList></BrokenCabinetList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoChart;
