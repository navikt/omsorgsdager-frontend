import {useCallback, useEffect} from 'react';
import throttle from 'lodash.throttle';
import {safeJSONParse} from './stringUtils';

// Brukes for midlertidig mellomlagring av input fra saksbehandlare som ett global objekt i k9-sak-web.
export const useFormSessionStorage = (
  formStateKey: string,
  formState,
  watch,
  setValue,
  lesemodus: boolean,
  åpenForRedigering: boolean,
  getValues
) => {
  let stateSlettet = false;
  watch();
  const setState = () => {
      formState.setState(formStateKey, getValues());
  };

  const sendDataTilFormState = useCallback(throttle(setState, 2000), []);

  useEffect(() => {
    const data = formState.getState(formStateKey);
    if (data) {
      const parsedValues = safeJSONParse(data);
      if (!parsedValues) return;

      setValue('åpenForRedigering', parsedValues.åpenForRedigering);
      console.log('BEFORE', getValues());
      console.log(lesemodus && getValues().åpenForRedigering || !lesemodus);
      if (lesemodus && getValues().åpenForRedigering || !lesemodus) {
        console.log('HEREEEEEE');
        Object.keys(parsedValues).forEach((key) => {
          setValue(key, parsedValues[key]);
        });
        console.log('VALUES ARE SATT', getValues());
      }
    }
  }, []);

  useEffect(() => {
    if (!stateSlettet && (lesemodus && getValues().åpenForRedigering || !lesemodus)) {
      sendDataTilFormState();
    }
  });

  return {
    clear: () => {stateSlettet = true; return formState.deleteState(formStateKey);}
  };
};

export default useFormSessionStorage;
