export default interface MidlertidigAleneVurderingInfo {
  erSokerenMidlertidigAleneOmOmsorgen: boolean;
  begrunnelse: string;
  dato: VilkarMidlertidigAleneDato;
  soknadsopplysninger: VilkarMidlertidigAleneSoknadsopplysninger;
}

export interface VilkarMidlertidigAleneSoknadsopplysninger {
  årsak: string;
  beskrivelse?: string;
  periode: string;
}

export interface VilkarMidlertidigAleneDato {
  til: string;
  fra: string;
}
