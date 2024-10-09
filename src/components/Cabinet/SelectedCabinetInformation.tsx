// 선택된 사물함 정보

const SelectedCabinetInformation = () => {
  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center">
      <div>
        <div className="pb-5">icon</div>
        <div>
          사물함을
          <br />
          선택해주세요
        </div>
      </div>
    </div>
  );
};
export default SelectedCabinetInformation;
