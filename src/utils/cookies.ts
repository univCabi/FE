import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  option: CookieSetOptions = { path: "/", secure: true, sameSite: "strict" },
): void => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): string => {
  return cookies.get<string>(name);
};

export const removeCookie = (
  name: string,
  option: CookieSetOptions = { path: "/" },
): void => {
  return cookies.remove(name, { ...option });
};
