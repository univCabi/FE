interface ProfileCardProps {
  isNameOn: boolean;
  toggleSwitch: () => void;
}
const ProfileCard = ({ isNameOn, toggleSwitch }: ProfileCardProps) => {
  return (
    <div className=" p-10 bg-neutral-100 rounded-2xl flex-col justify-start items-start gap-5 inline-flex shadow-sm">
      <div className="justify-start items-start inline-flex text-black text-xl font-bold">
        프로필
      </div>
      <div className="w-full flex justify-between items-center mb-[2.1rem]">
        <div>
          <div className="text-black text-lg font-bold leading-8">이름</div>
          <div className="text-[#7b7b7b] font-bold text-base leading-8">
            전공
          </div>
        </div>
        <div
          className="relative w-14 h-7 cursor-pointer"
          onClick={toggleSwitch}
        >
          <div
            className={`absolute w-full h-full rounded-full transition-colors duration-300 ${
              isNameOn ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
          <div
            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
              isNameOn ? "transform translate-x-8" : "transform translate-x-0"
            }`}
          />
        </div>
      </div>
      <div className="px-5 py-5 w-72 text-black  bg-white rounded-lg flex flex-col justify-start items-start gap-5 shadow">
        <div className="justify-between  inline-flex w-full">
          <div>학번</div>
          <div className="font-bold">202213185</div>
        </div>
        <div className=" justify-between  inline-flex w-full">
          <div>소속단과대</div>
          <div className="font-bold">정보융합대학</div>
        </div>
        <div className=" justify-between inline-flex w-full">
          <div>전화번호</div>
          <div className="font-bold">010-4182-1601</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
