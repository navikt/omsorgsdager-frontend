import Omsorgsinfo from '../types/Omsorgsinfo';
import {get} from '../util/apiUtils';

export default class OmsorgApi<T extends {vedtak: any[]}> {

  stiTilEndepunkt: string;
  behandlingsid: string;

  constructor(
    stiTilEndepunkt: string,
    behandlingsid: string
  ) {
    this.stiTilEndepunkt = stiTilEndepunkt;
    this.behandlingsid = behandlingsid;
  }

  async getVedtak(): Promise<T> {
    return get<T>(
      this.stiTilEndepunkt,
      {behandlingId: this.behandlingsid}
    );
  }

  async hentInfoOmOmsorg(): Promise<Omsorgsinfo> {
    return this.getVedtak().then(response => {
      if (response.vedtak.length && response.vedtak[0]) {
        const vedtak = response.vedtak[0];
        const omsorgen = vedtak.løsteBehov.OMSORGEN_FOR || vedtak.uløsteBehov.OMSORGEN_FOR;
        if (omsorgen) {
          return {harOmsorgen: omsorgen?.harOmsorgen};
        }
      }
      return {harOmsorgen: false};
    });
  }
}