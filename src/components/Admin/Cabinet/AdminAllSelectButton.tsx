// 전체선택 checkbox 컴포넌트
import React from "react";
import { CabinetData } from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";

interface AdminAllSelectButtonProps extends SelectedMultiCabinetsData {
  handleSelectAllCabinets: () => void;
  cabinetData: CabinetData[];
}
const AdminAllSelectButton = React.memo(
  ({
    selectedMultiCabinets,
    isMultiButtonActive,
    handleSelectAllCabinets,
    cabinetData,
  }: AdminAllSelectButtonProps) => {
    return (
      <div className="flex items-end mt-2 mr-3 z-10">
        <input
          key={isMultiButtonActive ? "active" : "inactive"}
          onChange={() => {
            handleSelectAllCabinets();
          }}
          type="checkbox"
          disabled={!isMultiButtonActive}
          className={`flex-row mr-1 w-4 h-4 appearance-none border rounded-sm bg-no-repeat bg-center
            ${
              isMultiButtonActive
                ? `border-blue-600 ${
                    selectedMultiCabinets?.length === cabinetData.length
                      ? "bg-[url('./icons/check.svg')] bg-blue-600"
                      : selectedMultiCabinets?.length &&
                          selectedMultiCabinets.length < cabinetData.length
                        ? "bg-[url('/src/icons/eachCheck.svg')] bg-blue-600"
                        : ""
                  }`
                : "border-gray-400 checked:bg-transparent checked:border-gray-400"
            }
          `}
        />
        <label
          className={`flex-row ${
            isMultiButtonActive ? "text-blue-600" : "text-gray-400"
          }`}
        >
          전체 선택
        </label>
      </div>
    );
  },
);

export default AdminAllSelectButton;
