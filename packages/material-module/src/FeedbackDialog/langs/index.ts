import enUs from "./en-US";
import zhTw from "./zh-TW";

export type Localization = {
  dialogTitle: string;
  support: string;
  country: string;
  company: string;
  name: string;
  email: string;
  emailError: string;
  telephone: string;
  telephoneError: string;
  responseType: string;
  title: string;
  content: string;
  uploadImage: string;
  submit: string;
};

export type Langs = {
  "en-US": Localization;
  "zh-TW": Localization;
};

const langs: Langs = {
  "en-US": enUs,
  "zh-TW": zhTw,
};

export default langs;
