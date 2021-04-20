export const tekstTilBoolean = (string: string) => {
  return string.toLowerCase() === 'true' ? true : false;
};

export const booleanTilTekst = (bool: boolean) => {
  return bool ? 'true' : 'false';
};
