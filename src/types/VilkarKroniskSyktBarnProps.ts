import Legeerklaeringsinfo from './Legeerklaeringsinfo';
import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';

export interface VilkarKroniskSyktBarnProps {
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  lesemodus?: boolean;
  legeerklaeringsinfo: Legeerklaeringsinfo;
  losAksjonspunkt: (harDokumentasjon, harSammenheng, begrunnelse) => void;
  vedtakFattetVilkarOppfylt: boolean;
}