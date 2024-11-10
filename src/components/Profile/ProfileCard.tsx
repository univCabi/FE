interface ProfileCardProps {
  toggleSwitch: () => void;
  name: string | null;
  userIsVisible: boolean;
  affiliation: string | null;
  studentNumber: number | null;
  phoneNumber: string | null;
}
const ProfileCard = ({
  toggleSwitch,
  name,
  userIsVisible,
  affiliation,
  studentNumber,
  phoneNumber,
}: ProfileCardProps) => {
  return (
    <div className=" p-10 bg-neutral-100 rounded-2xl flex-col justify-start items-start gap-5 inline-flex shadow-sm">
      <div className="justify-start items-start inline-flex text-black text-xl font-bold">
        프로필
      </div>
      <div className="w-full flex justify-between items-center ">
        <div className="text-black text-lg font-bold">{name ?? "비공개"}</div>
        <div
          className="relative w-14 h-7 cursor-pointer"
          onClick={toggleSwitch}
        >
          <div
            className={`absolute w-full h-full rounded-full transition-colors duration-300 ${
              userIsVisible ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
          <div
            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
              userIsVisible
                ? "transform translate-x-8"
                : "transform translate-x-0"
            }`}
          />
        </div>
      </div>
      <div className="text-[#7b7b7b] font-bold text-base mb-12">
        {affiliation ?? "전공 정보를 불러올 수 없습니다."}
      </div>
      <div className="px-5 py-5 w-80 text-black  bg-white rounded-lg flex flex-col justify-start items-start gap-8 shadow">
        <div className="justify-between  inline-flex w-full">
          <div>학번</div>
          <div className="font-bold">
            {studentNumber ?? "정보를 불러올 수 없습니다."}
          </div>
        </div>
        <div className=" justify-between inline-flex w-full">
          <div>전화번호</div>
          <div className="font-bold">
            {phoneNumber ?? "정보를 불러올 수 없습니다."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
