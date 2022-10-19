import React, { FC, useCallback, useState } from "react";
import { Meta } from "@storybook/react";

import FileUploadDropzone from "@eGroupAI/material-lab/FileUploadDropzone";
import useInputRefActions from "@eGroupAI/hooks/useInputRefActions";

export default {
  title: "Lab/FileUploadDropzone",
  component: FileUploadDropzone,
} as Meta;

export const Default: FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const { inputEl, clearValue } = useInputRefActions();

  const handleUploadFiles = useCallback(
    (acceptedFiles: File[]) => {
      setIsUploading(true);
      console.log(acceptedFiles);
      let progress = 0;
      const upload = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setCompleted(progress);
        } else {
          clearInterval(upload);
          clearValue();
          setCompleted(0);
          setIsUploading(false);
        }
      }, 500);
    },
    [clearValue]
  );

  return (
    <FileUploadDropzone
      multiple
      onDrop={handleUploadFiles}
      uploading={isUploading}
      completed={completed}
      inputRef={inputEl}
      hint="(建議尺寸 16:9)"
    />
  );
};
