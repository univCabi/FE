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

// 사용 가능한 사물함 오픈 시간
export const getRemainingTime = () => {
  const currentTime = new Date();
  const todayTargetTime = new Date(currentTime);
  todayTargetTime.setHours(13, 0, 0, 0); // 오늘 13:00 설정

  let targetTime;

  if (currentTime < todayTargetTime) {
    // 현재 시간이 오늘 13:00 이전이면 오늘 13:00까지 남은 시간 계산
    targetTime = todayTargetTime;
  } else {
    // 현재 시간이 오늘 13:00 이후이면 내일 13:00까지 남은 시간 계산
    targetTime = new Date(currentTime);
    targetTime.setDate(currentTime.getDate() + 1);
    targetTime.setHours(13, 0, 0, 0);
  }

  const diffMs = targetTime.getTime() - currentTime.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  // 항상 두 자리 숫자로 표시
  const formatHours = String(diffHours).padStart(2, "0");
  const formatMinutes = String(diffMinutes).padStart(2, "0");
  const formatSeconds = String(diffSeconds).padStart(2, "0");

  return `${formatHours}:${formatMinutes}:${formatSeconds} 남았습니다`;
};
