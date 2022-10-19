import React, { FC, HTMLAttributes, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import FroalaEditorComponent from "react-froala-wysiwyg";
import {
  EditorRef,
  OnModelChange,
  FroalaOptions,
  OnManualControllerReady,
} from "./typing";
import {
  fontFamily,
  pluginsEnabled,
  toolbarButtons,
  toolbarButtonsSM,
  toolbarButtonsXS,
} from "./defaultOptions";

const useStyles = makeStyles(
  () => ({
    root: {
      border: (props: FroalaEditorProps) =>
        props.disableBorder ? "none" : "1px solid #b3b3b3",
      borderRadius: 5,
    },
  }),
  {
    name: "MuiEgFroalaEditor",
  }
);

export interface FroalaEditorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * License Key.
   */
  licenseKey: string;
  /**
   * You can pass editor options as component attribute (optional).
   * You can pass any existing Froala option.
   * Consult the Froala documentation to view the list of all the available options:
   * https://froala.com/wysiwyg-editor/docs/options/
   */
  config?: FroalaOptions;
  /**
   * tag attr is used to tell on which tag the editor is initialized.
   * There are special tags: a, button, img, input. Do not use them in FroalaEditor component.
   * To initialize the editor on a special tag, use FroalaEditorA, FroalaEditorButton, FroalaEditorImg and FroalaEditorInput components.
   */
  tag?: string;
  /**
   * The WYSIWYG HTML editor content model.
   */
  model?: string | null;
  /**
   * Two way binding model.
   * To achieve one way binding and pass only the initial editor content, simply do not pass onModelChange attribute.
   */
  onModelChange?: OnModelChange;
  /**
   * Gets the functionality to operate on the editor: create, destroy and get editor instance.
   * Use it if you want to manually initialize the editor.
   */
  onManualControllerReady?: OnManualControllerReady;
  /**
   * Hide border
   */
  disableBorder?: boolean;
  /**
   * Image BeforeUpload
   */
  imageBeforeUpload?: (files: File[], editor: any) => void;
  /**
   * File BeforeUpload
   */
  fileBeforeUpload?: (files: File[], editor: any) => void;
}

const FroalaEditor: FC<FroalaEditorProps> = (props) => {
  const classes = useStyles(props);
  const {
    className,
    licenseKey,
    config: configProp,
    tag,
    model,
    onModelChange,
    onManualControllerReady,
    disableBorder,
    imageBeforeUpload,
    fileBeforeUpload,
    ...other
  } = props;
  const { key, events, ...config } = configProp || {};
  const editorRef = useRef<EditorRef>({
    controller: null,
  });
  return (
    <div className={clsx(className, classes.root)} {...other}>
      <FroalaEditorComponent
        ref={(ref) => {
          editorRef.current.controller = ref;
        }}
        config={{
          key: licenseKey,
          toolbarSticky: false,
          attribution: false,
          language: "zh_tw",
          pluginsEnabled,
          toolbarButtons,
          toolbarButtonsSM,
          toolbarButtonsXS,
          htmlIgnoreCSSProperties: ["position"],
          fontFamily,
          fontFamilySelection: true,
          events: {
            "image.beforeUpload": (images: FileList) => {
              if (editorRef.current.controller && imageBeforeUpload) {
                const editor = editorRef.current.controller.getEditor();
                imageBeforeUpload(Array.from(images), editor);
              }
              return false;
            },
            "file.beforeUpload": (files: FileList) => {
              if (editorRef.current.controller && fileBeforeUpload) {
                const editor = editorRef.current.controller.getEditor();
                fileBeforeUpload(Array.from(files), editor);
              }
              return false;
            },
            ...events,
          },
          ...config,
        }}
        tag={tag}
        model={model}
        onModelChange={onModelChange}
        onManualControllerReady={onManualControllerReady}
      />
    </div>
  );
};

export default FroalaEditor;
