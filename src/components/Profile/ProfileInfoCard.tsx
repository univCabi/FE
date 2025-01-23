import { UserInfo } from "types/interface";
interface ProfileInfoCardProps extends UserInfo {
  toggleSwitch: () => void;
  userIsVisible: boolean;
}
const ProfileInfoCard = ({
  toggleSwitch,
  name,
  userIsVisible,
  affiliation,
  studentNumber,
  phoneNumber,
}: ProfileInfoCardProps) => {
  return (
    <div className="p-10 w-96 sl:w-full bg-neutral-100 rounded-2xl flex-col justify-start items-start gap-5 inline-flex shadow-md">
      <div className="justify-start items-start inline-flex text-black text-lg sl:text-xl font-bold">
        프로필
      </div>
      <div className="w-full flex justify-between items-center ">
        <div className="text-black text-base sl:text-lg font-bold">
          {userIsVisible ? name : "비공개"}
        </div>
      </div>
      <div className="text-[#7b7b7b] font-bold text-sm sl:text-base">
        {affiliation ?? "전공 정보를 불러올 수 없습니다."}
      </div>
      <div className="flex items-center ">
        <div className="text-blue-600 mr-36 text-sm sl:text-base">
          이름 공개 여부
        </div>
        <div
          className="relative w-14 h-7 cursor-pointer"
          onClick={toggleSwitch}
        >
          <div
            className={`absolute w-full h-full rounded-full transition-colors duration-300 ${
              userIsVisible ? "bg-blue-600" : "bg-gray-400"
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
      <div className="px-5 py-5 w-80 text-black  bg-white rounded-lg flex flex-col justify-start items-start gap-5 sl:gap-8 shadow">
        <div className="justify-between text-sm sl:text-base inline-flex w-full">
          <div>학번</div>
          <div className="font-bold">
            {studentNumber ?? "정보를 불러올 수 없습니다."}
          </div>
        </div>
        <div className=" justify-between text-sm sl:text-base inline-flex w-full">
          <div>전화번호</div>
          <div className="font-bold">
            {phoneNumber ?? "정보를 불러올 수 없습니다."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
