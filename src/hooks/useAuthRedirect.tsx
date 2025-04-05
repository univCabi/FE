import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "@/utils/cookies";
import { log } from "@/utils/logger";
import { userDataApi } from "@/api/userDataApi";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getCookie("accessToken");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 같은 layout의 컴포넌트 끼리는 useEffect 가 실행되지않음
  useEffect(() => {
    const isAdmin = location.pathname.startsWith("/admin");
    const loginPath = isAdmin ? "/admin/login" : "/login";
    // 토큰의 유무를 판단
    if (!token) {
      navigate(loginPath);
      setIsLoading(false);
    } else {
      // 위증된 토큰인지 확인하기위한 API 요청
      (async () => {
        try {
          await userDataApi(); // 확인 용도라서 response값은 받지않음
        } catch (error) {
          log.error(`잘못된 토큰 정보로 URL Redirect ${error}`);
          navigate(loginPath);
        } finally {
          setIsLoading(false);
        }
      })(); // 즉시 실행 함수 표현식 IIFE (() => {...})()
    }
  }, []);

  return { isLoading };
};
