import { useState } from "react";

export default function useFroalaEditor(defaultValue = "") {
  const [model, setModel] = useState(defaultValue);

  const handleModelChange = (model: string) => {
    setModel(model);
  };

  return {
    model,
    setModel,
    handleModelChange,
  };
}
