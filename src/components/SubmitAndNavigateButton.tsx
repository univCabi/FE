import React from "react";

interface SubmitButtonProps {
  className: string;
  disabled?: boolean;
  text?: string;
  onClick: (e?: React.FormEvent) => void;
  svgComponent?: React.ReactNode;
}

const SubmitAndNavigateButton = React.memo(
  ({
    className,
    disabled = false,
    text,
    onClick,
    svgComponent,
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
        {svgComponent && <div>{svgComponent}</div>}
        {text}
      </button>
    );
  },
);

export default SubmitAndNavigateButton;
