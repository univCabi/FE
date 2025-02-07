type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";
const LOG_LEVEL: LogLevel = "WARN"; // 현재 로그 레벨을 정의 (레벨에 따라 보여지는 로그가 정해짐)
const levels: LogLevel[] = ["DEBUG", "INFO", "WARN", "ERROR"];

/**
 * 로그를 출력하는 함수
 * @param level 로그 레벨
 * @param message 로그 메시지
 **/

export const log = (level: LogLevel, message: string): void => {
  if (levels.indexOf(level) >= levels.indexOf(LOG_LEVEL)) {
    switch (level) {
      case "DEBUG":
        console.debug(`[DEBUG] - ${message}`);
        break;
      case "INFO":
        console.info(`[INFO] - ${message}`);
        break;
      case "WARN":
        console.warn(`[WARN] - ${message}`);
        break;
      case "ERROR":
        console.error(`[${level}] - ${message}`);
        break;
      default:
        console.log(`[${level}] - ${message}`);
        break;
    }
  }
};

log.debug = (message: string) => log("DEBUG", message);
log.info = (message: string) => log("INFO", message);
log.warn = (message: string) => log("WARN", message);
log.error = (message: string) => log("ERROR", message);
