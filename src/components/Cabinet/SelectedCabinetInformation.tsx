import CabinetSVG from "@/icons/cabinet.svg?react";
import { useCabinetRentalModal } from "@/hooks/useCabinetRentalModal";
import CabinetRentalConfirmModal from "@/components/CabinetState/CabinetRentalConfirmModal";
import CabinetReturnConfirmModal from "@/components/CabinetState/CabinetReturnConfirmModal";
import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useEffect } from "react";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (
    cabinet: {
      cabinetId: number;
      cabinetNumber: number;
    } | null
  ) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  expiredAt: string | null;
  setExpiredAt: (expiredAt: string | null) => void;
  isMine: boolean | null;
  setIsMine: (isMine: boolean | null) => void;
}

// 날짜 포맷팅 함수
const formatDate = (isoString: string | null): string => {
  if (!isoString) return "날짜 정보 없음";

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("ko-KR", options);
};

const SelectedCabinetInformation = ({
  selectedCabinet,
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
  selectedStatus,
  setSelectedStatus,
  expiredAt,
  setExpiredAt,
  isMine,
  setIsMine,
}: SelectedCabinetInformationProps) => {
  const { openRentalModal, setOpenRentalModal } = useCabinetRentalModal();
  const { openReturnModal, setOpenReturnModal } = useCabinetReturnModal();

  // 사물함 상태 조회
  const fetchCabinetStatus = async (cabinetId: number) => {
    // 얘때문에 저런거같은디
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      setIsMine(response.isMine); // 사용 여부 설정
      setSelectedStatus(response.status); // 상태 설정
      setExpiredAt(response.expiredAt); // 만료일 설정
      console.log(" 조회 성공", response.isMine);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // selectedCabinet이 변경될 때 상태 자동 조회
  useEffect(() => {
    if (selectedCabinet?.cabinetId) {
      fetchCabinetStatus(selectedCabinet.cabinetId);
    }
  }, [selectedCabinet, selectedStatus, isMine]);

  // 대여 버튼 클릭
  const clickedRentalButton = () => {
    setOpenRentalModal(true);
  };

  // 대여 모달 -> '취소'버튼 누르면 모달 닫기
  const closeRentalModal = () => {
    setOpenRentalModal(false);
  };
  // 반납 버튼 클릭 -> 반납 모달창 생성
  const clickedReturnButton = () => {
    setOpenReturnModal(true);
  };

  // 반납 모달 -> '취소'버튼 누르면 모달 닫기
  const closeReturnModal = () => {
    setOpenReturnModal(false);
  };

  // 취소 버튼 -> 사물함 선택 해제
  const cancelButton = () => {
    setSelectedCabinet(null);
  };

  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400 ">
      {selectedCabinet !== null ? (
        selectedStatus === "AVAILABLE" ? (
          // 상태가 AVAILABLE일 경우
          <>
            <div>
              <div className="pb-5 flex justify-center">
                <CabinetSVG />
              </div>
              <div className="font-bold text-xl">
                {selectedBuilding} {selectedFloor}F{" "}
                {selectedCabinet.cabinetNumber}번
              </div>
              <button
                onClick={clickedRentalButton}
                className="mt-10 p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
              >
                대여
              </button>
              <button
                onClick={cancelButton}
                className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150"
              >
                취소
              </button>
            </div>

            {openRentalModal && (
              <CabinetRentalConfirmModal
                closeRentalModal={closeRentalModal}
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                selectedCabinet={selectedCabinet}
                setSelectedStatus={setSelectedStatus}
                expiredAt={expiredAt}
                setExpiredAt={setExpiredAt}
              />
            )}
          </>
        ) : selectedStatus === "USING" && isMine === true ? (
          // 상태가 USING이고 본인의 사물함일 경우
          <>
            <div>
              <div className="pb-5 flex justify-center">
                <CabinetSVG />
              </div>
              <h2 className="font-bold text-xl">
                {selectedBuilding} {selectedFloor}F{" "}
                {selectedCabinet.cabinetNumber}번
              </h2>
              <div className="p-10">
                <button
                  onClick={clickedReturnButton}
                  className="p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
                >
                  반납
                </button>
                <button
                  onClick={cancelButton}
                  className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150"
                >
                  취소
                </button>
              </div>
              <div className="text-lg">
                <p>
                  반납 기한: <br />
                  <strong>{formatDate(expiredAt)}</strong>
                </p>
              </div>

              {openReturnModal && (
                <CabinetReturnConfirmModal
                  closeReturnModal={closeReturnModal}
                  selectedCabinet={selectedCabinet}
                  setSelectedStatus={setSelectedStatus}
                  setExpiredAt={setExpiredAt}
                />
              )}
            </div>
          </>
        ) : selectedStatus === "USING" && isMine == false ? (
          // 상태가 USING이고 타인의 사물함일 경우
          <div className="text-center">
            <div className="pb-5 flex justify-center">
              <CabinetSVG />
            </div>
            <h2 className="font-bold text-xl">
              {selectedBuilding} {selectedFloor}F{" "}
              {selectedCabinet.cabinetNumber}번
            </h2>
            <p className="mt-10 text-red-600 font-bold">
              이미 대여중인 사물함입니다.
            </p>
          </div>
        ) : (
          <div>사물함 정보를 표시할 수 없습니다.</div>
        )
      ) : (
        <div>
          <div className="flex justify-center pb-5">
            <CabinetSVG />
          </div>
          <div>
            사물함을
            <br />
            선택해주세요
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectedCabinetInformation;
