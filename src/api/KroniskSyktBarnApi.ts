import OmsorgApi from '../api/OmsorgApi';
import HentKroniskSyktBarnResponse from '../types/HentKroniskSyktBarnResponse';
import {KroniskSyktBarnAksjonspunktRequest} from '../types/KroniskSyktBarnAksjonspunktRequest';
import Legeerklaeringsinfo from '../types/Legeerklaeringsinfo';
import {patch} from '../util/apiUtils';

export default class KroniskSyktBarnApi extends OmsorgApi<HentKroniskSyktBarnResponse> {

  constructor(
    stiTilEndepunkt: string,
    behandlingsid: string
  ) {
    super(`${stiTilEndepunkt}/kronisk-sykt-barn`, behandlingsid);
  }

  async hentInfoOmLegeerklaering(): Promise<Legeerklaeringsinfo> {
    return this.getVedtak().then(response => {
      if (response.vedtak.length && response.vedtak[0]) {
        const vedtak = response.vedtak[0];
        const legeerklaering = vedtak.løsteBehov.LEGEERKLÆRING || vedtak.uløsteBehov.LEGEERKLÆRING;
        if (legeerklaering) {
          return {
            harDokumentasjon: legeerklaering.barnetErKroniskSyktEllerHarEnFunksjonshemning,
            harSammenheng: legeerklaering.erSammenhengMedSøkersRisikoForFraværFraArbeid,
            begrunnelse: legeerklaering.vurdering
          };
        }
      }
      return {
        harDokumentasjon: false,
        harSammenheng: false,
        begrunnelse: ''
      };
    });
  }

  async losAksjonspunkt(
    harDokumentasjon: boolean,
    harSammenheng: boolean,
    begrunnelse: string
  ): Promise<Response> {
    const request: KroniskSyktBarnAksjonspunktRequest = {
      LEGEERKLÆRING: {
        vurdering: begrunnelse,
        barnetErKroniskSyktEllerHarEnFunksjonshemning: harDokumentasjon,
        erSammenhengMedSøkersRisikoForFraværFraArbeid: harSammenheng
      },
      OMSORGEN_FOR: {}
    };
    return patch(
      `${this.stiTilEndepunkt}/${this.behandlingsid}/aksjonspunkt`,
      request
    );
  }
}