import {FormState} from './FormState';
import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';

export interface VilkarKroniskSyktBarnProps {
  behandlingsID: string;
  vedtakFattetVilkarOppfylt: boolean;
  aksjonspunktLost: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  lesemodus: boolean;
  informasjonTilLesemodus?: InformasjonTilLesemodusKroniskSyk;
  losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse, avslagsKode) => void;
  formState: FormState;
}

export interface InformasjonTilLesemodusKroniskSyk{
  begrunnelse: string;
  vilkarOppfylt: boolean;
  avslagsArsakErIkkeRiskioFraFravaer: boolean;
}