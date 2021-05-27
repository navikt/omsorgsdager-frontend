import {FormState} from './FormState';
import {InformasjonOmVurdertVilkar} from './InformasjonOmVurdertVilkar';

export interface AleneOmOmsorgenProps {
  behandlingsID: string;
  lesemodus: boolean;
  aksjonspunktLost: boolean;
  soknadsopplysninger: AleneOmOmsorgenSoknadsopplysninger;
  informasjonTilLesemodus?: AleneOmOmsorgenAksjonspunktObjekt;
  vedtakFattetVilkarOppfylt: boolean;
  informasjonOmVilkar?: InformasjonOmVurdertVilkar;
  losAksjonspunkt: (AleneOmOmsorgenAksjonspunktObjekt) => void;
  formState: FormState;
}

export interface AleneOmOmsorgenAksjonspunktObjekt {
  begrunnelse: string;
  vilkarOppfylt: boolean;
  fraDato: string;
  avslagsArsakErPeriodeErIkkeOverSeksMån: boolean;
}

export interface AleneOmOmsorgenSoknadsopplysninger {
  årsak: string;
  beskrivelse?: string;
  fraDato: string;
  soknadsdato: string;
}
