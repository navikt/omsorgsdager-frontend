import {FormState} from './FormState';
import {InformasjonTilLesemodus} from './informasjonTilLesemodus';

export interface KorrigerePerioderProps {
  behandlingsID: string;
  lesemodus: boolean;
  aksjonspunktLost: boolean;
  informasjonTilLesemodus?: InformasjonTilLesemodus;
  losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => void;
  formState: FormState;
}