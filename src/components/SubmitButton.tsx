interface SubmitButtonProps {
  className: string;
  disabled?: boolean;
  text: string;
  onClick: (e?: React.FormEvent) => void;
}

const SubmitButton = ({
  className,
  disabled = false,
  text,
  onClick,
}: SubmitButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") onClick();
  };
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      onKeyDown={handleKeyDown}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
