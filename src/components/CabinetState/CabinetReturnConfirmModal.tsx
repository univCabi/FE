// // 반납 버튼 눌렀을 때, 반납 확인 모달

// import { returnApi } from "@/api/returnApi";

// interface CabinetReturnConfirmModalProps {
//   selectedCabinet: number;
//   closeReturnModal: () => void;
//   confirmReturn: () => void;
// }

// const CabinetReturnConfirmModal = ({
//   selectedCabinet,
//   closeReturnModal,
//   confirmReturn,
// }: CabinetReturnConfirmModalProps) => {
//   const returnCabinet = async () => {
//     try {
//       const response = await returnApi(selectedCabinet); // API 호출
//       if (response?.success) {
//         console.log("반납 성공:", response);
//         confirmReturn(); // 대여 성공 시 처리 (다음 화면 이동 등)
//         closeReturnModal(); // 모달 닫기
//       } else {
//         console.error("반납 실패:", response?.message);
//       }
//     } catch (error) {
//       console.error("API 호출 중 오류 발생:", error);
//     }
//   };
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-5">반납 확인</h2>
//         <p>이 사물함을 반납하시겠습니까?</p>

//         <div className="mt-5 flex justify-center">
//           <button
//             className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
//             onClick={returnCabinet} // 확인 버튼 클릭 시 반납 API 호출 + CabinetRental.tsx가 렌더링
//           >
//             확인
//           </button>
//           <button
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-100"
//             onClick={closeReturnModal} // 취소 버튼 클릭 시 모달 닫기
//           >
//             취소
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CabinetReturnConfirmModal;
