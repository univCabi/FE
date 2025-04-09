import { useEffect, useState } from "react";
import { getRemainingTime } from "@/utils/formatDate";

export const useAvailableLeftTime = () => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return remainingTime;
};
