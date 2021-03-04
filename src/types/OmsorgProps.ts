import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';
import {InformasjonTilLesemodus} from './informasjonTilLesemodus';

export interface OmsorgProps {
  lesemodus?: boolean;
  informasjonTilLesemodus?: InformasjonTilLesemodus;
  vedtakFattetVilkarOppfylt: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  barn: string[];
  losAksjonspunkt: (harOmsorgen, begrunnelse) => void;
}