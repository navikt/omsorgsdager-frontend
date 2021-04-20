import { useEffect } from 'react';

const safeJSONParse = str => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

let removedFromStore = false;

export const useFormPersist = (
  name: string,
  watch,
  setValue,
  { storage = window.sessionStorage } = {},
  lesemodus : boolean,
  åpenForRedigering: boolean
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
    if (!removedFromStore && (lesemodus && åpenForRedigering || !lesemodus)) storage.setItem(name, JSON.stringify(values));
  });

  return {
    clear: () => { storage.removeItem(name); removedFromStore = true; }
  };
};

export default useFormPersist;
