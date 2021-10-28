import {FormState} from './FormState';
import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';

export interface VilkarKroniskSyktBarnProps {
  behandlingsID: string;
  vedtakFattetVilkarOppfylt: boolean;
  soknadsdato: string;
  aksjonspunktLost: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  lesemodus: boolean;
  informasjonTilLesemodus?: InformasjonTilLesemodusKroniskSyk;
  losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse, avslagsKode, fraDato ) => void;
  formState: FormState;
}

export interface InformasjonTilLesemodusKroniskSyk{
  begrunnelse: string;
  vilkarOppfylt: boolean;
  avslagsArsakErIkkeRiskioFraFravaer: boolean;
  fraDato: string;
}