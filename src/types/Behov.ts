export interface Behovsliste {
  LEGEERKLÆRING?: Legeerklaering;
  OMSORGEN_FOR?: OmsorgenFor;
}

interface Legeerklaering {
  vurdering: string;
  barnetErKroniskSyktEllerHarEnFunksjonshemning: boolean;
  erSammenhengMedSøkersRisikoForFraværFraArbeid: boolean;
}

export interface OmsorgenFor {} // eslint-disable-line @typescript-eslint/no-empty-interface