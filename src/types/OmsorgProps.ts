import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';
import {InformasjonTilLesemodus} from './informasjonTilLesemodus';

export interface OmsorgProps {
  behandlingsID: string;
  lesemodus: boolean;
  aksjonspunktLost: boolean;
  informasjonTilLesemodus?: InformasjonTilLesemodus;
  vedtakFattetVilkarOppfylt: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  barn: string[];
  losAksjonspunkt: (harOmsorgen, begrunnelse) => void;
}