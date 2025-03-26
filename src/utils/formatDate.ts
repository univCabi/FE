// 날짜 포맷팅 함수
export const formatDate = (date: string | null): string => {
  if (!date) return "날짜 정보 없음";
  const formDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return formDate.toLocaleDateString("ko-KR", options).replace(/\.$/, "");
};
