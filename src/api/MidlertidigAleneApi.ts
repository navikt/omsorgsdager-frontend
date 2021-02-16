import OmsorgApi from '../api/OmsorgApi';
import HentMidlertidigAleneResponse from '../types/HentMidlertidigAleneResponse';
import {MidlertidigAleneAksjonspunktRequest} from '../types/MidlertidigAleneAksjonspunktRequest';
import MidlertidigAleneVurderingInfo, {VilkarMidlertidigAleneDato} from '../types/MidlertidigAleneVurderingInfo';
import {patch} from '../util/apiUtils';

export default class MidlertidigAleneApi extends OmsorgApi<HentMidlertidigAleneResponse> {

  constructor(
    stiTilEndepunkt: string,
    behandlingsid: string
  ) {
    super(`${stiTilEndepunkt}/midlertidig-alene`, behandlingsid);
  }

  async hentInfoOmMidlertidigAleneVurdering(): Promise<MidlertidigAleneVurderingInfo> {
    return this.getVedtak().then(response => {
      if (response.vedtak.length && response.vedtak[0]) {
        const vedtak = response.vedtak[0];
        const midlertidigAleneBehov = vedtak.løsteBehov.VURDER_MIDLERTIDIG_ALENE || vedtak.uløsteBehov.VURDER_MIDLERTIDIG_ALENE;
        const losning = midlertidigAleneBehov?.løsning;
        if (losning) {
          const {soknadsopplysninger} = vedtak;
          return {
            begrunnelse: losning.vurdering,
            erSokerenMidlertidigAleneOmOmsorgen: losning.erSøkerenMidlertidigAleneOmOmsorgen,
            dato: {
              fra: losning.gyldigFraOgMed,
              til: losning.gyldigTilOgMed
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
      VURDERE_OMSORGEN_FOR: {}
    };
    return patch(
      `${this.stiTilEndepunkt}/${this.behandlingsid}/aksjonspunkt`,
      request
    );
  }
}