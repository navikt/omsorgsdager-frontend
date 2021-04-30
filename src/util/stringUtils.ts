export const tekstTilBoolean = (string: string) => {
  return string.toLowerCase() === 'true' ? true : false;
};

export const booleanTilTekst = (bool: boolean) => {
  return bool ? 'true' : 'false';
};

export const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};