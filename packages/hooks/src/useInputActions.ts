import { useCallback, useRef } from 'react';

export default function useInputActions(defaultValue: HTMLInputElement | HTMLInputElement[] | null = null) {
  const inputEl = useRef<HTMLInputElement | HTMLInputElement[]>(defaultValue);

  const select = useCallback(() => {
    if (!inputEl.current) return
    if (Array.isArray(inputEl.current)) {
      for (let i = 0; i < inputEl.current.length; i++) {
        inputEl.current[i].select();
        inputEl.current[i].setSelectionRange(0, 99999); /* For mobile devices */
      }
    } else {
      inputEl.current.select();
      inputEl.current.setSelectionRange(0, 99999); /* For mobile devices */
    }
  }, []);

  const focus = useCallback(() => {
    if (!inputEl.current) return
    if (Array.isArray(inputEl.current)) {
      for (let i = 0; i < inputEl.current.length; i++) {
        inputEl.current[i].focus();
      }
    } else {
      inputEl.current.focus();
    }
  }, []);

  const clearFiles = useCallback(() => {
    if (!inputEl.current) return
    if (Array.isArray(inputEl.current)) {
      for (let i = 0; i < inputEl.current.length; i++) {
        inputEl.current[i].value = '';
      }
    } else {
      inputEl.current.value = '';
    }
  }, []);

  return {
    inputEl,
    select,
    focus,
    clearFiles
  };
}
