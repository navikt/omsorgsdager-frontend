export interface Behovsliste {
  LEGEERKLÆRING?: Legeerklaering;
  OMSORGEN_FOR?: OmsorgenFor;
  VURDER_MIDLERTIDIG_ALENE?: MidlertidigAlene;
}

interface MidlertidigAlene {
  vurdering: string;
  erSøkerenMidlertidigAleneOmOmsorgen: boolean;
  gyldigFraOgMed: string;
  gyldigTilOgMed: string;
}

interface Legeerklaering {
  vurdering: string;
  barnetErKroniskSyktEllerHarEnFunksjonshemning: boolean;
  erSammenhengMedSøkersRisikoForFraværFraArbeid: boolean;
}

export interface OmsorgenFor {
  harOmsorgen?: boolean; // TODO: Avklare formatet på dette aksjonspunktet
}