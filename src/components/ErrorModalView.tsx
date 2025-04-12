import { Modal } from "@/types/ModalType";
import ErrorSVG from "@/icons/error.svg?react";

interface ErrorModalProps extends Modal {}

const ErrorModalView = ({
  setModalCancelState,
  title,
  text,
}: ErrorModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-center pb-3">
          <ErrorSVG />
        </div>
        <h2 className="text-2xl font-bold mb-5">{title}</h2>
        <div className="text-lg w-full break-all">
          <p>{text}</p>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            onClick={() => setModalCancelState(false)} // 취소 버튼 클릭 시 모달 닫는 setter
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModalView;
