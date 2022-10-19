import React from "react";
import TextField, { TextFieldProps } from "@eGroupAI/material/TextField";

const StyledTextField = (props: TextFieldProps) => (
  <TextField
    sx={{
      borderRadius: "1000px",
      borderColor: "#9E9E9E",
      color: "#9E9E9E",
      backgroundColor: "#EEEEEE",
      "& .MuiInputBase-root": {
        borderRadius: "1000px",
      },
    }}
    {...props}
  />
);

export default StyledTextField;
