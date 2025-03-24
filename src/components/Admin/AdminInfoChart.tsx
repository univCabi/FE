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
        <div className="w-1/2 p-4">
          <p className="font-bold text-2xl">연체 사물함</p>
          <div className=" border-collapse bg-gray-100 mt-3 border rounded-xl overflow-y-auto hidden-scrollbar shadow-lg">
            <table className="w-full">
              <thead className="bg-blue-500 text-white text-md rounded-t-lg sticky top-0">
                <tr>
                  <th className="w-80 table-cell text-center p-4">위치</th>
                  <th className="w-1/3 table-cell text-center p-4">
                    사용자 학번
                  </th>
                  <th className="w-1/3 table-cell text-center p-4">연체일</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-white">
                  <td className="w-80 table-cell text-center p-3">
                    가온관-A-5-2F
                  </td>
                  <td className="w-1/3 table-cell text-center p-3">
                    202112798
                  </td>
                  <td className="w-1/3 table-cell text-center p-3">14일</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 고장 사물함 */}
        <div className="w-1/2 p-4">
          <p className="font-bold text-2xl">고장 사물함</p>
          <div className=" border-collapse bg-gray-100 mt-3 border rounded-xl overflow-y-auto hidden-scrollbar shadow-lg">
            <table className="w-full">
              <thead className="bg-blue-500 text-white text-md rounded-t-lg sticky top-0">
                <tr>
                  <th className="w-80 table-cell text-center p-4">위치</th>
                  <th className="w-1/3 table-cell text-center p-4">고장일</th>
                  <th className="w-1/3 table-cell text-center p-4">
                    고장 원인
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-white">
                  <td className="w-80 table-cell text-center p-3">
                    가온관-A-5-2F
                  </td>
                  <td className="w-1/3 table-cell text-center p-3">
                    2025. 02. 28
                  </td>
                  <td className="w-1/3 table-cell text-center p-3">파손</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoChart;
