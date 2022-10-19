import { format } from "@eGroupAI/utils/dateUtils";
import { Time } from "../TimePicker";

export const combimeDateTime = (date: Date | null, time?: Time) => {
  if (time) {
    return date ? `${format(date, "yyyy-MM-dd")} ${time.join(":")}` : null;
  }
  return date ? format(date, "yyyy-MM-dd") : null;
};
