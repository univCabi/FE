import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

export const getCookie = (name: string): string => {
  return cookies.get<string>(name);
};

export const removeCookie = (name: string, option: CookieSetOptions): void => {
  return cookies.remove(name, { ...option });
};
