import React, { forwardRef, useEffect } from "react";

import useInputActions from "@eGroupAI/hooks/useInputActions";

import TextField, { TextFieldProps } from "../TextField";

export interface CopyTextFieldProps
  extends Omit<TextFieldProps, "onClick" | "inputRef"> {
  onCopy?: () => void;
  onClick?: (e: unknown) => void;
  copyOnMount?: boolean;
}

const CopyTextField = forwardRef<HTMLDivElement, CopyTextFieldProps>(
  (props, ref) => {
    const { onCopy, onClick, copyOnMount, ...other } = props;

    const { inputEl, select } = useInputActions();

    /* Copy the text inside the text field */
    const copyText = () => {
      if (!navigator.clipboard) {
        document.execCommand("copy");
        if (onCopy) {
          onCopy();
        }
      } else {
        navigator.clipboard
          .writeText((inputEl?.current as HTMLInputElement)?.value)
          .then(() => {
            if (onCopy) {
              onCopy();
            }
          });
      }
    };

    useEffect(() => {
      if (copyOnMount) {
        /* Select the text field */
        select();
        copyText();
      }
    }, []);

    const handleCopy = (e: unknown) => {
      select();
      copyText();

      if (onClick) {
        onClick(e);
      }
    };

    return (
      <TextField ref={ref} inputRef={inputEl} onClick={handleCopy} {...other} />
    );
  }
);

export default CopyTextField;
