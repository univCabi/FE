import { useState } from "react";

export const useProfilePageState = () => {
  const [isNameOn, setIsNameOn] = useState<boolean>(false);

  return {
    isNameOn,
    setIsNameOn,
  };
};
