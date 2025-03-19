// 전체선택 checkbox 컴포넌트
import { CabinetData, SelectedMultiCabinetsData } from "@/types/CabinetType";

interface AdminAllSelectButtonProps {
  selectedMultiCabinets: SelectedMultiCabinetsData[];

  multiButtonActive: boolean;
  handleSelectAllCabinets: () => void;
  cabinetData: CabinetData[];
}
const AdminAllSelectButton = ({
  selectedMultiCabinets,
  multiButtonActive,
  handleSelectAllCabinets,
  cabinetData,
}: AdminAllSelectButtonProps) => {
  return (
    <div className="flex items-end mt-2 mr-3 z-10">
      <input
        key={multiButtonActive ? "active" : "inactive"}
        onChange={() => {
          handleSelectAllCabinets();
        }}
        type="checkbox"
        disabled={!multiButtonActive}
        className={`flex-row mr-1 w-4 h-4 appearance-none border rounded-sm bg-no-repeat bg-center
            ${
              multiButtonActive
                ? `border-blue-600 checked:bg-blue-600 checked:border-0 ${
                    selectedMultiCabinets.length === cabinetData.length
                      ? "bg-[url('./icons/check.svg')] bg-blue-600"
                      : selectedMultiCabinets.length > 0 &&
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
          multiButtonActive ? "text-blue-600" : "text-gray-400"
        }`}
      >
        전체 선택
      </label>
    </div>
  );
};

export default AdminAllSelectButton;
