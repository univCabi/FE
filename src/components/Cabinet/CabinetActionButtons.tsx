import { useLocation } from "react-router-dom";

interface CabinetActionButtonsProps {
  onRentalClick?: () => void;
  onReturnClick?: () => void;
  onStateManagementClick?: () => void;
  onCancelClick: () => void;
  text?: string;
  stateManagementText?: string;
}

const CabinetActionButtons = ({
  onRentalClick,
  onReturnClick,
  onCancelClick,
  onStateManagementClick,
  text,
  stateManagementText,
}: CabinetActionButtonsProps) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin"); // Admin일 경우, 상태관리/취소 버튼 -> 다른 CSS 적용
  const hasReturnButton = !!onReturnClick; // return 활성화 되어있을 경우, 상태관리/취소 버튼 -> 다른 CSS 적용

  return (
    <div className="p-10">
      {onRentalClick && (
        <button
          onClick={onRentalClick}
          className="p-4 w-60 button-cabinet-action"
        >
          {text}
        </button>
      )}
      {onReturnClick && (
        <button
          onClick={onReturnClick}
          className="mt-4 p-4 w-60 button-cabinet-action"
        >
          {text}
        </button>
      )}
      {onStateManagementClick && (
        <button
          onClick={onStateManagementClick}
          className={`mt-4 p-4 w-60 button-cabinet-action ${
            isAdminPage
              ? hasReturnButton
                ? "bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600"
                : ""
              : ""
          }`}
        >
          {stateManagementText}
        </button>
      )}
      <button
        onClick={onCancelClick}
        className={`mt-4 p-4 w-60 border rounded-lg transition-all duration-150 ${
          isAdminPage
            ? hasReturnButton
              ? "bg-white text-gray-500 border-gray-500 hover:bg-gray-200"
              : "button-cabinet-cancel"
            : "button-cabinet-cancel"
        }`}
      >
        취소
      </button>
    </div>
  );
};

export default CabinetActionButtons;
