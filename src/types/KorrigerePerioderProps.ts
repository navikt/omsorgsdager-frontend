import {InformasjonTilLesemodus} from './informasjonTilLesemodus';

export interface KorrigerePerioderProps {
  lesemodus: boolean;
  aksjonspunktLost: boolean;
  årsakFraSoknad: string;
  informasjonTilLesemodus?: InformasjonTilLesemodus;
  losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => void;
}