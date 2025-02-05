import { RentCabinetInfo } from "@/types/UserType";

interface RentalInfoCardProp {
  rentCabinetInfo: RentCabinetInfo;
}
const RentalInfoCard = ({ rentCabinetInfo }: RentalInfoCardProp) => {
  return (
    <div className="p-10 w-96 sl:w-full bg-neutral-150 rounded-2xl flex-col justify-start items-start gap-5 inline-flex shadow-md">
      <div className="justify-start items-start inline-flex text-black text-xl font-bold">
        대여정보
      </div>
      <div className=" flex-col justify-start items-start gap-16 flex">
        <div className="justify-start items-start gap-8 inline-flex">
          <div className="w-[3.75rem] h-[0.3125rem] relative">
            <div
              className={`w-[3.75rem] h-[3.75rem] ${
                rentCabinetInfo.cabinetNumber ? "text-2xl" : "text-xl"
              }
               text-gray-50 absolute bg-blue-500 rounded-[0.625rem] flex justify-center items-center`}
            >
              {rentCabinetInfo.cabinetNumber ?? "___"}
            </div>
          </div>
          <div className="w-[6rem] h-[4rem] relative">
            <div className=" w-full top-3 absolute  text-[#7b7b7b] text-sm font-normal ">
              {`${rentCabinetInfo?.building || "**"} - ${
                rentCabinetInfo?.floor || "*"
              }층`}
            </div>
          </div>
        </div>
        <div className="px-5 py-5 w-80 mt-3 h-32 text-black   bg-white rounded-lg flex flex-col justify-start items-start gap-5 shadow">
          <div className="justify-between items-start inline-flex w-full">
            <div>시작일</div>
            <div className="font-bold">{`${
              rentCabinetInfo.startDate
                ? new Date(rentCabinetInfo.startDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\.$/, "")
                : "대여 정보가 없습니다."
            }`}</div>
          </div>
          <div className="justify-between items-start inline-flex w-full">
            <div>남은 기간</div>
            <div className="font-bold">
              {rentCabinetInfo.endDate
                ? (() => {
                    const endDate = new Date(rentCabinetInfo.endDate);
                    const today = new Date();
                    const leftDate: number = Math.ceil(
                      (endDate.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24),
                    );
                    return leftDate > 0
                      ? `${leftDate}일`
                      : "대여 기간이 종료되었습니다.";
                  })()
                : "대여 정보가 없습니다."}
            </div>
          </div>
          <div className="justify-between items-start inline-flex w-full">
            <div>종료 일자</div>
            <div className="font-bold ">{`${
              rentCabinetInfo.endDate
                ? new Date(rentCabinetInfo.endDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\.$/, "")
                : "대여 정보가 없습니다."
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalInfoCard;
