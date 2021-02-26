import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';

export interface OmsorgProps {
  barn: string[];
  harOmsorgen?: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  lesemodus?: boolean;
  losAksjonspunkt: (harOmsorgen, begrunnelse) => void;
  vedtakFattetVilkarOppfylt: boolean;
}