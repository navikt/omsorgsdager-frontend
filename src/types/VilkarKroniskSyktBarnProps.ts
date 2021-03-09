import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';

export interface VilkarKroniskSyktBarnProps {
  vedtakFattetVilkarOppfylt: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  lesemodus: boolean;
  informasjonTilLesemodus?: InformasjonTilLesemodusKroniskSyk;
  losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse, avslagsKode) => void;
}

export interface InformasjonTilLesemodusKroniskSyk{
  begrunnelse: string;
  vilkarOppfylt: boolean;
  avslagsArsakErIkkeRiskioFraFravaer: boolean;
}