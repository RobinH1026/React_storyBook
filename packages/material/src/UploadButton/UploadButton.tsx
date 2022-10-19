import React, {
  FC,
  LegacyRef,
  HTMLAttributes,
  InputHTMLAttributes,
  useState,
} from "react";

import { Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import Button, { ButtonProps } from "../Button";

export interface UploadButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Button className.
   */
  btnClassName?: string;
  /**
   * The content of the error message.
   */
  errorMsg?: string;
  /**
   * input Props
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * input onChange
   */
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  /**
   * Input ref
   */
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
  /**
   * The variant to use.
   */
  variant?: ButtonProps["variant"];
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: ButtonProps["color"];
  /**
   * The button's error status
   */
  error?: boolean;
  /**
   * The button's disabled status
   */
  disabled?: boolean;
  /**
   * Element placed before the children.
   */
  startIcon?: ButtonProps["startIcon"];
  /**
   * Element placed after the children.
   */
  endIcon?: ButtonProps["endIcon"];
  /**
   * If true, the button will take up the full width of its container.
   */
  fullWidth?: ButtonProps["fullWidth"];
  /**
   * The size of the button. small is equivalent to the dense button styling.
   */
  size?: ButtonProps["size"];
  /**
   * If true, change button to rounded.
   */
  rounded?: ButtonProps["rounded"];
  /**
   * If true, change button to loading status
   */
  loading?: ButtonProps["loading"];
  /**
   * If true, enable upload multiple files.
   */
  multiple?: boolean;
  /**
   * If true, hide files name when upload.
   */
  hideFilesName?: boolean;
  /**
   * Input HTML Attributes
   */
  accept?: string;
}

const UploadButton: FC<UploadButtonProps> = ({
  children,
  btnClassName,
  errorMsg,
  variant,
  color,
  error,
  inputProps,
  inputRef,
  onChange,
  disabled,
  startIcon,
  endIcon,
  fullWidth,
  size,
  rounded,
  loading,
  multiple,
  accept,
  hideFilesName,
  ...other
}) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div {...other}>
      <Button
        className={btnClassName}
        variant={variant}
        color={error ? "error" : color}
        component="label"
        startIcon={startIcon || <PublishIcon />}
        endIcon={endIcon}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        rounded={rounded}
        loading={loading}
      >
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            const input = event.target as HTMLInputElement;
            if (input && input.files?.length) {
              setFiles(Array.from(input.files));
            }
            if (onChange) {
              onChange(event);
            }
          }}
          ref={inputRef}
          {...inputProps}
        />
        {children}
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {errorMsg}
        </Typography>
      )}
      {!hideFilesName &&
        files.map((el) => (
          <Typography
            key={el.name}
            style={{ lineHeight: 2.6 }}
            color="textSecondary"
            variant="body2"
            noWrap
          >
            {el.name}
          </Typography>
        ))}
    </div>
  );
};

export default UploadButton;
