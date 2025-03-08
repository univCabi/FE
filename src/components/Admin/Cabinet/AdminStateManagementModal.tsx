//Modal을 관리하는 컴포넌트
interface HadleModalProps {
  onClick: () => void;
  // onClick: () => Promise<void>;
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  boldText?: string;
  text?: string;
  stateManagementDropdown?: React.ReactNode;
  stateManagementText?: string;
}

const AdminStateManagementModal = ({
  onClick,
  setModalCancelState,
  title,
  boldText,
  text,
  stateManagementDropdown,
  stateManagementText,
}: HadleModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-5">{title}</h2>
        <div className="text-lg w-full break-all">
          <b className="whitespace-pre-line">{boldText}</b>
          <p>{text}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col w-72">
            <p className="mt-5 mb-2 text-left">{stateManagementText}</p>
            <div className="">{stateManagementDropdown}</div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            onClick={onClick} // 확인 버튼을 누를 시에 동작하는 onclick 함수
          >
            저장
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

export default AdminStateManagementModal;
