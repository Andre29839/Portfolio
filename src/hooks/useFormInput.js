import { useState } from "react";

export function useFormInpit(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = e => {
    setValue(e.target.value);
    setIsDirty(true);

    if (error && e.target.checkValidity()) {
      setError(null);
    }
  };

  const handleInvalid = e => {
    e.preventDefault();
    setError(e.target.validationMessage);
  };

  const handleBlur = e => {
    if (isDirty) {
      e.target.checkValidity();
    }
  };

  return {
    value,
    error,
    onchange: handleChange,
    onBlur: handleBlur,
    onInvalid: handleInvalid,
  };
}
