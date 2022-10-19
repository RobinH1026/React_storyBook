import { useContext } from "react";
import { IntlControlContext } from "./IntlControlProvider";

const useIntlControl = () => {
  const intlControl = useContext(IntlControlContext);
  return intlControl;
};

export default useIntlControl;
