import CabinetSVG from "@/icons/cabinet.svg?react";
import { useCabinetRentalModal } from "@/hooks/useCabinetRentalModal";
import CabinetRentalConfirmModal from "../CabinetState/CabinetRentalConfirmModal";
import CabinetReturnConfirmModal from "../CabinetState/CabinetReturnConfirmModal";
import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useEffect, useState } from "react";
import { useCabinetData } from "@/hooks/useCabinetData";
// import { useCabinetStatus } from "@/hooks/useCabinetState";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number | null;
  selectedStatus: string | null; // 추가
  setSelectedStatus: (status: string | null) => void; // 상태 업데이트 함수 추가
  expiredAt: string | null; // 추가: 대여 만료일
  setExpiredAt: (expiredAt: string | null) => void; // 추가
}

const SelectedCabinetInformation = ({
  selectedCabinet,
  selectedBuilding,
  selectedFloor,
  selectedStatus,
  setSelectedStatus,
  expiredAt,
  setExpiredAt,
}: SelectedCabinetInformationProps) => {
  const { openRentalModal, setOpenRentalModal } = useCabinetRentalModal();
  const { openReturnModal, setOpenReturnModal } = useCabinetReturnModal();
  // const { selectedStatus, expiredAt } = useCabinetStatus({
  //   cabinetId: selectedCabinet,
  // });
  // 사물함 상태 조회
  const fetchCabinetStatus = async (cabinetId: number) => {
    // 얘때문에 저런거같은디
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      // setSelectedStatus(response.status); // 상태 업데이트
      setExpiredAt(response.expiredAt);
    } catch (error) {
      console.error(error);
    }
  };

  // selectedCabinet이 변경될 때 상태 자동 조회
  useEffect(() => {
    if (selectedCabinet) {
      fetchCabinetStatus(selectedCabinet);
    }
  }, [selectedCabinet]);

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

  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400 ">
      {/* 건물, 층, 사물함 모두 선택했을 때만 사물함 정보 표시 */}

      {selectedCabinet !== null ? (
        selectedStatus === "AVAILABLE" ? ( // status가 AVAILABLE일 경우
          <>
            <div>
              <div className="pb-5 flex justify-center">
                <CabinetSVG />
              </div>
              <div className="font-bold text-xl">
                {selectedBuilding} {selectedFloor}F {selectedCabinet}번
              </div>
              <button
                onClick={clickedRentalButton}
                className="mt-10 p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
              >
                대여
              </button>
              <button className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150">
                취소
              </button>
            </div>

            {openRentalModal && (
              <CabinetRentalConfirmModal
                closeRentalModal={closeRentalModal}
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                selectedCabinet={selectedCabinet}
                setSelectedStatus={setSelectedStatus} // 추가
                setExpiredAt={setExpiredAt}
              />
            )}
          </>
        ) : selectedStatus === "USING" ? ( // status가 USING일 경우
          <>
            <div>
              <div className="pb-5 flex justify-center">
                <CabinetSVG />
              </div>
              <h2 className="font-bold text-xl">
                {selectedBuilding} {selectedFloor}F {selectedCabinet}번
              </h2>
              <div className="p-10">
                <button
                  onClick={clickedReturnButton}
                  className="p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
                >
                  반납
                </button>
                <button className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150">
                  취소
                </button>
              </div>
              <div className="text-lg">
                <p>
                  반납 기한: <strong>{expiredAt}</strong>
                </p>
              </div>

              {openReturnModal && (
                <CabinetReturnConfirmModal
                  closeReturnModal={closeReturnModal}
                  selectedCabinet={selectedCabinet}
                  setSelectedStatus={setSelectedStatus} // 추가
                />
              )}
            </div>
          </>
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

// // 사물함 상태 조회
// const fetchCabinetStatus = async (cabinetId: number) => {
//   // 얘때문에 저런거같은디
//   try {
//     const response = await cabinetDetailInfoApi(cabinetId);
//     setSelectedStatus(response.status); // 상태 업데이트
//     setExpiredAt(response.expiredAt);
//     // console.log("사물함 상태 조회 성공:", response);
//   } catch (error) {
//     console.error("사물함 상태 조회 실패:", error);
//   }
// };

// // selectedCabinet이 변경될 때 상태 자동 조회
// useEffect(() => {
//   if (selectedCabinet) {
//     fetchCabinetStatus(selectedCabinet);
//   }
// }, [selectedCabinet]);

// interface SelectedCabinetInformationProps {
//   selectedCabinet: {
//     id: number;
//     number: number;
//     status: string;
//     expiredAt: string | null;
//   } | null;
// }

// const SelectedCabinetInformation = ({
//   selectedCabinet,
// }: SelectedCabinetInformationProps) => {
//   if (!selectedCabinet) {
//     return (
//       <div>
//         <p>사물함을 선택해주세요.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400 ">
//       <h2 className="font-bold text-xl">
//         사물함 {selectedCabinet.number}번 (ID: {selectedCabinet.id})
//       </h2>
//       <p>상태: {selectedCabinet.status}</p>
//       <p>만료일: {selectedCabinet.expiredAt || "없음"}</p>
//     </div>
//   );
// };

// export default SelectedCabinetInformation;
