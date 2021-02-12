import {Behovsliste} from './Behov';
import Vedtaksstatus from './Vedtaksstatus';

export default interface HentKroniskSyktBarnResponse {
  vedtak: {
    barn: {
      identitetsnummer: string;
      fødselsdato: string;
      harSammeBosted: boolean;
    };
    behandlingId: string;
    gyldigFraOgMed: string;
    gyldigTilOgMed: string;
    status: Vedtaksstatus;
    uløsteBehov: Behovsliste;
    løsteBehov: Behovsliste;
    lovhenvisninger: {[henvisning: string]: string};
  }[];
}