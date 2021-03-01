export interface KorrigerePerioderProps {
  lesemodus?: boolean;
  årsakFraSoknad: string;
  losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => void;
}