import React from "react";
import { Meta, Story } from "@storybook/react";

import FroalaEditor, {
  FroalaEditorProps,
} from "@eGroupAI/material-module/FroalaEditor";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import useFroalaEditor from "@eGroupAI/hooks/useFroalaEditor";
import { Button } from "@mui/material";

export default {
  title: "Modules/FroalaEditor",
  component: FroalaEditor,
} as Meta;

export const Default: Story<FroalaEditorProps> = () => {
  const { model, setModel, handleModelChange } = useFroalaEditor();

  return (
    <>
      <FroalaEditorView model={model} />
      <br />
      <FroalaEditor
        licenseKey=""
        model={model}
        onModelChange={handleModelChange}
        config={{
          toolbarSticky: true,
          heightMin: 300,
          placeholderText: "Edit here...",
        }}
      />
      <Button
        onClick={() => {
          setModel("");
        }}
      >
        Rest
      </Button>
    </>
  );
};
