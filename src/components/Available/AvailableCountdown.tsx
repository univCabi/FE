import { useEffect } from "react";
import { AvailableFloorInfo } from "@/types/CabinetType";
import { getRemainingTime } from "@/utils/formatDate";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useAvailableCabinet } from "@/hooks/useAvailableCabinet";
import ReloadSVG from "@/icons/reload.svg?react";

interface AvailableCountdownProps extends AvailableFloorInfo {}

const AvailableCountdown = ({
  setSelectedBuilding,
  userData,
}: AvailableCountdownProps) => {
  const { setLeftTime } = useAvailableCabinet({
    setSelectedBuilding,
    userData,
  });
  const reloadAvailableCabinet = () => {
    window.location.reload();
  };

  // 실시간 시간 바뀜
  useEffect(() => {
    setLeftTime(getRemainingTime()); // 초기값 설정
    const timer = setInterval(() => {
      setLeftTime(getRemainingTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="mt-14 flex flex-col items-center ">
        <div className="text-black text-2xl font-bold md:text-4xl sm:text-3xl flex">
          사용 가능 사물함
        </div>
        <div className="text-black md:text-xl sm:text-lg text-md mt-4 flex flex-row items-center justify-center">
          <b>매일 오후 1시&nbsp;</b>
          <p>사용 가능한 사물함이 업데이트 예정입니다.</p>
        </div>
        <SubmitAndNavigateButton
          onClick={reloadAvailableCabinet}
          className={`button-cabinet-action w-52 h-10 sm:w-60 mt-4 flex items-center justify-center`}
          text={`${getRemainingTime()}`}
          svgComponent={<ReloadSVG className="w-5 mr-2" />}
        />
      </div>
    </>
  );
};
export default AvailableCountdown;
