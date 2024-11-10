interface RentalinfoCardProp {
  userRentalData: {
    building: string | null;
    floor: number | null;
    cabinetNumber: number | null;
    status: string | null;
    startDate: string | null;
    endDate: string | null;
    leftDate: number | null;
  };
}
const RentalinfoCard = ({ userRentalData }: RentalinfoCardProp) => {
  return (
    <div className="p-10 bg-neutral-100 rounded-2xl flex-col justify-start items-start gap-5 inline-flex shadow-sm">
      <div className="justify-start items-start inline-flex text-black text-xl font-bold">
        대여정보
      </div>
      <div className=" flex-col justify-start items-start gap-16 flex">
        <div className="justify-start items-start gap-8 inline-flex">
          <div className="w-[3.75rem] h-[0.3125rem] relative">
            <div className="w-[3.75rem] h-[3.75rem] l absolute bg-blue-500 rounded-[0.625rem]" />
          </div>
          <div className="w-[6rem] h-[4rem] relative">
            <div className=" w-full top-3 absolute text-center text-[#7b7b7b] text-sm font-normal">
              {`${userRentalData?.building || "**"} - ${
                userRentalData?.floor || "*"
              }층`}
            </div>
          </div>
        </div>
        <div className="px-5 py-5 w-80 text-black  bg-white rounded-lg flex flex-col justify-start items-start gap-5 shadow">
          <div className="justify-between items-start inline-flex w-full">
            <div>시작일</div>
            <div className="font-bold">{`${userRentalData.startDate ?? ""}${
              userRentalData.startDate ? "일" : "정보를 불러올 수 없습니다"
            }`}</div>
          </div>
          <div className="justify-between items-start inline-flex w-full">
            <div>남은 기간</div>
            <div className="font-bold">{`${userRentalData.leftDate ?? ""}${
              userRentalData.leftDate ? "일" : "정보를 불러올 수 없습니다"
            }`}</div>
          </div>
          <div className="justify-between items-start inline-flex w-full">
            <div>종료 일자</div>
            <div className="font-bold ">{`${userRentalData.endDate ?? ""}${
              userRentalData.endDate ? "일" : "정보를 불러올 수 없습니다"
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalinfoCard;
