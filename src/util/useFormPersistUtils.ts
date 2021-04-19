import { useEffect } from 'react';

const safeJSONParse = str => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

export const useFormPersist = (
  name: string,
  watch,
  setValue,
  { storage = window.sessionStorage } = {}
) => {
  const values = watch();

  useEffect(() => {
    const data = storage.getItem(name);
    if (data) {
      const parsedValues = safeJSONParse(data);
      if (!parsedValues) return;

      Object.keys(parsedValues).forEach((key) => {
        setValue(key, parsedValues[key]);
      });
    }
  }, [name]);

  useEffect(() => {
    storage.setItem(name, JSON.stringify(values));
  });

  return {
    clear: () => storage.removeItem(name)
  };
};

export default useFormPersist;
