import * as React from "react";

export type RadioInputGroupContextProps = {
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

const RadioInputGroupContext = React.createContext<
  Partial<RadioInputGroupContextProps>
>({});

export default RadioInputGroupContext;
