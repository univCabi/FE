import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useAvailableLeftTime } from "@/hooks/useAvailableLeftTime";
import ReloadSVG from "@/icons/reload.svg?react";

const AvailableCountdown = () => {
  const remainingTime = useAvailableLeftTime();
  const reloadAvailableCabinet = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="mt-14 flex flex-col items-center ">
        <div className="text-black text-2xl font-bold md:text-4xl sm:text-3xl flex">
          사용 가능 사물함
        </div>
        <div className="text-black md:text-xl sm:text-lg text-md mt-4 flex items-center justify-center">
          <p>
            <b>매일 오후 1시</b> 사용 가능한 사물함이 업데이트 예정입니다
          </p>
        </div>
        <SubmitAndNavigateButton
          onClick={reloadAvailableCabinet}
          className={`button-cabinet-action w-52 h-10 sm:w-60 mt-4 flex items-center justify-center`}
          text={remainingTime}
          svgComponent={<ReloadSVG className="w-5 mr-2" />}
        />
      </div>
    </>
  );
};
export default AvailableCountdown;
