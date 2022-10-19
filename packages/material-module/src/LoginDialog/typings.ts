import { DialogProps } from "@eGroupAI/material/Dialog";
import { LinkProps } from "@eGroupAI/material/Link";
import { ButtonProps } from "@eGroupAI/material/Button";
import { TextFieldProps } from "@eGroupAI/material/TextField";
import { FacebookButtonProps } from "./FacebookButton";
import { GoogleButtonProps } from "./GoogleButton";

export type Values = {
  account: string;
  password: string;
};

export interface LoginDialogProps
  extends Omit<DialogProps, "onSubmit" | "open"> {
  /**
   * Dialog close event.
   */
  onClose?: () => void;
  /**
   * If true, open the dialog.
   */
  isOpen?: boolean;
  /**
   * Form submit event.
   */
  onSubmit?: (values: Values) => void;
  /**
   * If true, change the submit button to loading status.
   */
  loading?: boolean;
  /**
   * If true, change the submit button to disable status.
   */
  disabledSubmit?: boolean;
  /**
   * Facebook button click event.
   */
  onFbClick?: FacebookButtonProps["onClick"];
  /**
   * Google button click event.
   */
  onGoogleClick?: GoogleButtonProps["onClick"];
  /**
   * ForgetPassword Link Props
   */
  ForgetPasswordLinkProps?: LinkProps;
  /**
   * Props For All TextField
   */
  TextFieldProps?: TextFieldProps;
  /**
   * Account TextField Props
   */
  AccountTextFieldProps?: TextFieldProps;
  /**
   * Password TextField Props
   */
  PasswordTextFieldProps?: TextFieldProps;
  /**
   * LoginButton Props
   */
  LoginButtonProps?: ButtonProps;
  /**
   * FacebookButton Props
   */
  FacebookButtonProps?: FacebookButtonProps;
  /**
   * GoogleButton Props
   */
  GoogleButtonProps?: GoogleButtonProps;
  /**
   * Locale
   */
  locale?: "en" | "zh-TW";
}
