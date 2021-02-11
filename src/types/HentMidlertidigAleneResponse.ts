import {Behovsliste} from "./Behov";
import Vedtaksstatus from "./Vedtaksstatus";

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
    soknedsopplysninger: {
      årsak: string;
      beskrivelse?: string;
      periode: string;
    };
    uløsteBehov: Behovsliste;
    løsteBehov: Behovsliste;
    lovhenvisninger: {[henvisning: string]: string};
  }[];
}