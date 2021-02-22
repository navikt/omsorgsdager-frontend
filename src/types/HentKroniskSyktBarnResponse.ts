import {LosteBehovsliste, UlosteBehovsliste} from './Behov';
import Vedtaksstatus from './Vedtaksstatus';

export default interface HentKroniskSyktBarnResponse {
  vedtak: {
    behandlingId: string;
    gyldigFraOgMed: string;
    gyldigTilOgMed: string;
    status: Vedtaksstatus;
    grunnlag: {
      saksnummer: string;
      behandlingId: string;
      tidspunkt: string;
      søknadMottatt: string;
      søker: {
        identitetsnummer: string;
      };
      barn: {
        identitetsnummer: string;
        fødselsdato: string;
        harSammeBosted: boolean;
      };
    };
    uløsteBehov: UlosteBehovsliste;
    løsteBehov: LosteBehovsliste;
    lovhenvisninger: {[henvisning: string]: string};
  }[];
}