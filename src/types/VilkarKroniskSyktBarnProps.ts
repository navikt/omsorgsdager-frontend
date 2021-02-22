import Legeerklaeringsinfo from './Legeerklaeringsinfo';

export interface VilkarKroniskSyktBarnProps {
  lesemodus?: boolean;
  legeerklaeringsinfo: Legeerklaeringsinfo;
  losAksjonspunkt: (harDokumentasjon, harSammenheng, begrunnelse) => void;
}