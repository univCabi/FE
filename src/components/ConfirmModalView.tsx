//Modal을 관리하는 컴포넌트
interface HadleModalProps {
  onClick: () => Promise<void>;
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  boldText?: string;
  text?: string;
}

const ConfirmModalView = ({
  onClick,
  setModalCancelState,
  title,
  boldText,
  text,
}: HadleModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-5">{title}</h2>

        <div className="text-lg">
          <b>{boldText}</b>
          <p>{text}</p>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            onClick={onClick} // 확인 버튼을 누를 시에 동작하는 onclick 함수
          >
            확인
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={() => setModalCancelState(false)} // 취소 버튼 클릭 시 모달 닫는 setter
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalView;
