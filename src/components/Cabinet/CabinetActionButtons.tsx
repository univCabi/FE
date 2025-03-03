// 대여, 반납 버튼에 대한 컴포넌트

interface CabinetActionButtonsProps {
  onRentalClick?: () => void;
  onReturnClick?: () => void;
  onCancelClick: () => void;
  text: string;
}

const CabinetActionButtons = ({
  onRentalClick,
  onReturnClick,
  onCancelClick,
  text,
}: CabinetActionButtonsProps) => (
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
    <button
      onClick={onCancelClick}
      className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150"
    >
      취소
    </button>
  </div>
);

export default CabinetActionButtons;
