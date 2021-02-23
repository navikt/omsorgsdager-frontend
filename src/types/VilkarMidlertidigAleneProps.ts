export interface VilkarMidlertidigAleneProps {
  lesemodus: boolean;
  soknadsopplysninger: VilkarMidlertidigSoknadsopplysninger;
  informasjonTilLesemodus?: VilkarMidlertidigInformasjonTilLesemodus;
  onSubmit: (VilkarMidlertidigGrunnlagForBeslutt) => void;
}

export interface VilkarMidlertidigAleneDato {
  til: string;
  fra: string;
}

export interface VilkarMidlertidigSoknadsopplysninger {
  årsak: string;
  beskrivelse?: string;
  periode: string;
}

export interface VilkarMidlertidigInformasjonTilLesemodus {
  begrunnelse: string;
  vilkarOppfylt: boolean;
  dato: VilkarMidlertidigAleneDato;
}

