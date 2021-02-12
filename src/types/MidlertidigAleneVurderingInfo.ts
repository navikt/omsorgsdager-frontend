export default interface MidlertidigAleneVurderingInfo {
  erSokerenMidlertidigAleneOmOmsorgen: boolean;
  begrunnelse: string;
  dato: VilkarMidlertidigAleneDato;
  soknedsopplysninger: VilkarMidlertidigAleneSoknedsopplysninger;
}

export interface VilkarMidlertidigAleneSoknedsopplysninger {
  årsak: string;
  beskrivelse?: string;
  periode: string;
}

export interface VilkarMidlertidigAleneDato {
  til: string;
  fra: string;
}
