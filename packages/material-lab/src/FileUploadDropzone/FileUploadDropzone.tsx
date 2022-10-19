import React, { ReactNode, FC, HTMLAttributes } from "react";

import { makeStyles } from "@mui/styles";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import clsx from "clsx";

const useStyles = makeStyles(
  (theme) => ({
    // https://jsfiddle.net/prafuitu/vmL0ys1u/
    root: {
      "--border-color": theme.palette.text.secondary,
      "--border-weight": "2px",
      "--dash-size": "8px",
      "--gap-size": "8px",

      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: 200,
      outline: "none",
      cursor: (props: FileUploadDropzoneProps) =>
        props.uploading ? "auto" : "pointer",

      "&::after": {
        content: '""',
        transition: "all .6s ease",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
      linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
      linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) top center repeat-x,
      linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
      
      linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
      linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center left repeat-y,
      linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
      
      linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
      linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) bottom center repeat-x,
      linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat,
      
      linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
      linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center right repeat-y,
      linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat;
      background-size: var(--dash-size) var(--border-weight), calc(var(--dash-size) + var(--gap-size)) var(--border-weight), var(--dash-size) var(--border-weight), var(--border-weight) var(--dash-size), var(--border-weight) calc(var(--dash-size) + var(--gap-size)), var(--border-weight) var(--dash-size)`,
      },
    },
    dragActive: {},
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    },
    icon: {
      fontSize: 40,
      marginBottom: theme.spacing(2),
    },
  }),
  {
    name: "MuiEgFileUploadDropzone",
  }
);

export interface FileUploadDropzoneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDrop"> {
  accept?: DropzoneOptions["accept"];
  minSize?: DropzoneOptions["minSize"];
  maxSize?: DropzoneOptions["maxSize"];
  maxFiles?: DropzoneOptions["maxFiles"];
  multiple?: DropzoneOptions["multiple"];
  preventDropOnDocument?: DropzoneOptions["preventDropOnDocument"];
  noClick?: DropzoneOptions["noClick"];
  noKeyboard?: DropzoneOptions["noKeyboard"];
  noDrag?: DropzoneOptions["noDrag"];
  noDragEventsBubbling?: DropzoneOptions["noDragEventsBubbling"];
  disabled?: DropzoneOptions["disabled"];
  onDrop?: DropzoneOptions["onDrop"];
  onDropAccepted?: DropzoneOptions["onDropAccepted"];
  onDropRejected?: DropzoneOptions["onDropRejected"];
  getFilesFromEvent?: DropzoneOptions["getFilesFromEvent"];
  onFileDialogCancel?: DropzoneOptions["onFileDialogCancel"];
  validator?: DropzoneOptions["validator"];
  uploading?: boolean;
  completed?: number;
  hint?: ReactNode;
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | React.MutableRefObject<HTMLInputElement | null>
    | null;
}

const FileUploadDropzone: FC<FileUploadDropzoneProps> = (props) => {
  const {
    className,
    accept,
    minSize,
    maxSize,
    maxFiles,
    multiple = false,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    disabled,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    validator,
    uploading,
    completed,
    hint,
    inputRef,
    ...other
  } = props;
  const classes = useStyles(props);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      minSize,
      maxSize,
      maxFiles,
      multiple,
      preventDropOnDocument,
      noClick,
      noKeyboard,
      noDrag,
      noDragEventsBubbling,
      disabled: disabled ?? uploading,
      onDrop,
      onDropAccepted,
      onDropRejected,
      onFileDialogCancel,
      validator,
    });

  const renderContent = () => {
    if (uploading) {
      const msg =
        acceptedFiles.length > 1
          ? `${acceptedFiles[0].name} 和其他 ${acceptedFiles.length - 1} 個檔案`
          : acceptedFiles[0].name;
      return (
        <div className={classes.center}>
          <CircularProgress
            variant="determinate"
            color="inherit"
            className={classes.icon}
            value={completed}
          />
          <Typography align="center" gutterBottom color="inherit">
            檔案上傳中... {completed}%
          </Typography>
          <Typography align="center" color="inherit">
            {msg}
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.center}>
        <CloudUploadIcon color="inherit" className={classes.icon} />
        <Typography color="inherit" align="center" gutterBottom>
          {isDragActive ? "放開檔案開始上傳" : "從這裡上傳檔案"}
        </Typography>
        <Typography color="inherit" align="center" gutterBottom>
          {isDragActive
            ? "拖移至這裡的檔案將開始上傳"
            : "拖移檔案至此，或點擊開始上傳"}
        </Typography>
        {hint && (
          <Typography color="inherit" align="center">
            {hint}
          </Typography>
        )}
      </div>
    );
  };

  const { ref, ...inputProps } = getInputProps() as any;

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.dragActive]: isDragActive,
      })}
      {...getRootProps()}
      {...other}
    >
      <input
        ref={(r) => {
          ref.current = r;
          if (typeof inputRef !== "function" && inputRef) {
            // eslint-disable-next-line no-param-reassign
            inputRef.current = r;
          } else if (typeof inputRef === "function") {
            inputRef(r);
          }
        }}
        {...inputProps}
      />
      {renderContent()}
    </div>
  );
};

export default FileUploadDropzone;
