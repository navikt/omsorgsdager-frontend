import {LosteBehovsliste, UlosteBehovsliste} from './Behov';
import Vedtaksstatus from './Vedtaksstatus';

export default interface HentMidlertidigAleneResponse {
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
    soknadsopplysninger: {
      årsak: string;
      beskrivelse?: string;
      periode: string;
    };
    uløsteBehov: UlosteBehovsliste;
    løsteBehov: LosteBehovsliste;
    lovhenvisninger: {[henvisning: string]: string};
  }[];
}