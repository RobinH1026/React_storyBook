import en from "./en";
import zhTw from "./zh-TW";

export type Localization = {
  dialogTitle: string;
  account: string;
  password: string;
  forgetPassword: string;
  login: string;
  orLoginWith: string;
};

export type Langs = {
  en: Localization;
  "zh-TW": Localization;
};

const langs: Langs = {
  en,
  "zh-TW": zhTw,
};

export default langs;
