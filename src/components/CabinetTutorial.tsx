import AvailableSVG from "@/icons/available.svg?react";
import LogoSVG from "@/icons/cabiLogo.svg?react";
import CabinetSVG from "@/icons/cabinet.svg?react";
import HistorySVG from "@/icons/log.svg?react";
import ProfileSVG from "@/icons/profile.svg?react";

const CabinetTutorial = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full mt-10">
      <LogoSVG width={60} height={60} className="mb-5" />
      <div className="font-semibold text-3xl pb-5 border-gray-400 border-b-2 w-[20rem] md:w-[26rem]">
        UnivCabi 이용 안내서
      </div>
      <div className="h-full z-10 overflow-y-auto max-h-[30rem] md:max-h-none md:overflow-y-hidden">
        <div className="grid grid-cols-1 gap-x-44 gap-y-20 mt-20 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-600 bg-opacity-10 flex items-center justify-center mb-4">
              <CabinetSVG height={21} width={21} />
            </div>
            <p className="text-xl font-semibold mb-7 text-center">
              사물함 대여 및 반납 (Rent & Return)
            </p>
            <p className="mb-3">
              <b>1인이 1개</b>의 사물함을 사용합니다
            </p>
            <p className="mb-3">
              사물함 반납 시,&nbsp;
              <b>익일 13시</b>에 해당 사물함의 대여가 가능합니다
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-600 bg-opacity-10 flex items-center justify-center mb-4">
              <AvailableSVG height={21} width={21} />
            </div>
            <p className="text-xl font-semibold mb-7 text-center">
              선착순 대여 (Available)
            </p>
            <p className="mb-3">
              <b>매일 13시</b>&nbsp;본인이 사용 가능한 사물함이 오픈됩니다
            </p>
            <p className="mb-3">타이머 기능이 있어 빠른 대여가 가능합니다</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-600 bg-opacity-10 flex items-center justify-center mb-4">
              <HistorySVG height={24} width={24} />
            </div>
            <p className="text-xl font-semibold mb-7 text-center">
              히스토리 (History)
            </p>
            <p className="mb-3">
              본인이 대여한 사물함 기록을 확인할 수 있습니다
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-600 bg-opacity-10 flex items-center justify-center mb-4">
              <ProfileSVG
                height={26}
                width={26}
                stroke="#7b7b7b"
                stroke-width="2.5"
              />
            </div>
            <p className="text-xl font-semibold mb-7 text-center">
              프로필 (Profile)
            </p>
            <p className="mb-3">
              현재 사용중인 사물함 정보를 확인할 수 있습니다
            </p>
            <p>이름 공개 여부를 설정할 수 있습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CabinetTutorial;
