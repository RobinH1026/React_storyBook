import { DialogProps } from "@eGroupAI/material/Dialog";
import { MenuItemProps } from "@eGroupAI/material/MenuItem";
import { UploadButtonProps } from "@eGroupAI/material/UploadButton";
import { TextFieldProps } from "@eGroupAI/material/TextField";
import { ButtonProps } from "@eGroupAI/material/Button";

export type Values = {
  title: string;
  content: string;
  email: string;
  name: string;
  type: string;
  country: string;
  company: string;
  phone: string;
};

export type TypeOption = {
  value: MenuItemProps["value"];
  label: string;
};
export interface FeedbackDialogProps
  extends Omit<DialogProps, "onSubmit" | "open" | "title"> {
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
   * If true, change the upload button to loading status.
   */
  isUploading?: boolean;
  /**
   * If true, hide country field.
   */
  hideCountry?: boolean;
  /**
   * If true, hide company field.
   */
  hideCompany?: boolean;
  /**
   * If true, hide image upload field.
   */
  hideImageUpload?: boolean;
  /**
   * If provided, show the feedback type select field.
   */
  typeOptions?: TypeOption[];
  /**
   * Upload file change event.
   */
  onUploadChange?: UploadButtonProps["onChange"];
  /**
   * Locale
   */
  locale?: "en-US" | "zh-TW";
  /**
   * Props For All TextField
   */
  TextFieldProps?: TextFieldProps;
  /**
   * UploadButton Props.
   */
  UploadButtonProps?: UploadButtonProps;
  /**
   * SubmitButton Props.
   */
  SubmitButtonProps?: ButtonProps;
}
