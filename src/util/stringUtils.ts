export const tekstTilBoolean = (string: string) => {
  if(string !== undefined && string !== null && string.length > 0){
    return string.toLowerCase() === 'true' ? true : false;
  }else{
    return false;
  }
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