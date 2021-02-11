import HentMidlertidigAleneResponse from "../types/HentMidlertidigAleneResponse";
import {MidlertidigAleneAksjonspunktRequest} from "../types/HentMidlertidigAleneResponse";
import Legeerklaeringsinfo from "../types/Legeerklaeringsinfo";
import {get, patch} from "../util/apiUtils";

export default class MidlertidigAleneApi {

  stiTilEndepunkt: string;
  behandlingsid: string;

  constructor(
    stiTilEndepunkt: string,
    behandlingsid: string
  ) {
    this.stiTilEndepunkt = stiTilEndepunkt;
    this.behandlingsid = behandlingsid;
  }

  async getVedtak(): Promise<HentMidlertidigAleneResponse> {
    return get<HentMidlertidigAleneResponse>(
      `${this.stiTilEndepunkt}/kronisk-sykt-barn`,
      {behandlingId: this.behandlingsid}
    );
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
        begrunnelse: ""
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
      `${this.stiTilEndepunkt}/kronisk-sykt-barn/${this.behandlingsid}/aksjonspunkt`,
      request
    );
  }
}