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
        const legeerklaering = vedtak.løsteBehov.VURDERE_KRONISK_SYKT_BARN || vedtak.uløsteBehov.VURDERE_KRONISK_SYKT_BARN;
        const losning = legeerklaering?.løsning;
        if (losning) {
          return {
            harDokumentasjon: losning.barnetErKroniskSyktEllerHarEnFunksjonshemning,
            harSammenheng: losning.erSammenhengMedSøkersRisikoForFraværFraArbeid,
            begrunnelse: losning.vurdering
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
      VURDERE_KRONISK_SYKT_BARN: {
        vurdering: begrunnelse,
        barnetErKroniskSyktEllerHarEnFunksjonshemning: harDokumentasjon,
        erSammenhengMedSøkersRisikoForFraværFraArbeid: harSammenheng
      },
      VURDERE_OMSORGEN_FOR: {}
    };
    return patch(
      `${this.stiTilEndepunkt}/${this.behandlingsid}/aksjonspunkt`,
      request
    );
  }
}