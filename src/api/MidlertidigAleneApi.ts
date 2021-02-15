import HentMidlertidigAleneResponse from '../types/HentMidlertidigAleneResponse';
import {MidlertidigAleneAksjonspunktRequest} from '../types/MidlertidigAleneAksjonspunktRequest';
import MidlertidigAleneVurderingInfo, {VilkarMidlertidigAleneDato} from '../types/MidlertidigAleneVurderingInfo';
import {get, patch} from '../util/apiUtils';

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
      `${this.stiTilEndepunkt}/midlertidig-alene`,
      {behandlingId: this.behandlingsid}
    );
  }

  async hentInfoOmMidlertidigAleneVurdering(): Promise<MidlertidigAleneVurderingInfo> {
    return this.getVedtak().then(response => {
      if (response.vedtak.length && response.vedtak[0]) {
        const vedtak = response.vedtak[0];
        const midlertidigAleneBehov = vedtak.løsteBehov.VURDER_MIDLERTIDIG_ALENE || vedtak.uløsteBehov.VURDER_MIDLERTIDIG_ALENE;
        if (midlertidigAleneBehov) {
          const soknadsopplysninger = vedtak.soknadsopplysninger;
          return {
            begrunnelse: midlertidigAleneBehov.vurdering,
            erSokerenMidlertidigAleneOmOmsorgen: midlertidigAleneBehov.erSøkerenMidlertidigAleneOmOmsorgen,
            dato: {
              fra: midlertidigAleneBehov.gyldigFraOgMed,
              til: midlertidigAleneBehov.gyldigTilOgMed
            },
            soknadsopplysninger,
          };
        }
      }
      return {
        begrunnelse: '',
        erSokerenMidlertidigAleneOmOmsorgen: false,
        dato: {
          fra: '',
          til: ''
        },
        soknadsopplysninger: {
          årsak: '',
          beskrivelse: '',
          periode: '',
        },
      };
    });
  }

  async losAksjonspunktMidlertidigAlene(
    begrunnelse: string,
    dato: VilkarMidlertidigAleneDato,
    erSokerenMidlertidigAleneOmOmsorgen: boolean
  ): Promise<Response> {
    const request: MidlertidigAleneAksjonspunktRequest = {
      VURDER_MIDLERTIDIG_ALENE: {
        vurdering: begrunnelse,
        erSøkerenMidlertidigAleneOmOmsorgen: erSokerenMidlertidigAleneOmOmsorgen,
        gyldigFraOgMed: dato.fra,
        gyldigTilOgMed: dato.til
      },
      OMSORGEN_FOR: {}
    };
    return patch(
      `${this.stiTilEndepunkt}/midlertidig-alene/${this.behandlingsid}/aksjonspunkt`,
      request
    );
  }
}