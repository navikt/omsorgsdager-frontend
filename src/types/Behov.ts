export interface Behovsliste {
  LEGEERKLÆRING?: Legeerklaering;
  OMSORGEN_FOR?: OmsorgenFor;
}

interface Legeerklaering {
  vurdering: string;
  barnetErKroniskSyktEllerHarEnFunksjonshemning: boolean;
  erSammenhengMedSøkersRisikoForFraværFraArbeid: boolean;
}

export interface OmsorgenFor {
  harOmsorgen?: boolean; // TODO: Avklare formatet på dette aksjonspunktet
}