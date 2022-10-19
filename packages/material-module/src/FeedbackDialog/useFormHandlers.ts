import { useState } from "react";

import isMobilePhone from "validator/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";
import { defaultValues } from "./utils";
import { Values } from "./typings";

export default function useFormHandlers() {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
  });

  const handleChange = (name: keyof Values) => (value: string) => {
    setValues((val) => ({
      ...val,
      [name]: value,
    }));
  };

  const handleValidation = (name: keyof Values, value: string) => {
    setErrors((errors) => ({
      ...errors,
      [name]: false,
    }));
    switch (name) {
      case "email":
        if (!isEmail(value)) {
          setErrors((errors) => ({
            ...errors,
            email: true,
          }));
        }
        break;
      case "phone":
        if (!isMobilePhone(value)) {
          setErrors((errors) => ({
            ...errors,
            phone: true,
          }));
        }
        break;
      default:
        break;
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleValidation,
  };
}
