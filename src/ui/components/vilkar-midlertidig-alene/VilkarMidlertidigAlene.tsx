import AlertStripe, {AlertStripeFeil} from 'nav-frontend-alertstriper';
import ApiResponseMessage from '../api-response-message/ApiResponseMessage';
import classNames from 'classnames';
import {Datepicker} from 'nav-datovelger';
import {Hovedknapp} from 'nav-frontend-knapper';
import MidlertidigAleneApi from '../../../api/MidlertidigAleneApi';
import OpplysningerFraVedtak from './opplysninger-fra-vedtak/OpplysningerFraVedtak';
import OpplysningerFraSoknad from './opplysninger-fra-soknad/OpplysningerFraSoknad';
import {Radio, RadioGruppe, SkjemaGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useEffect, useState} from 'react';
import Spinner from '../spinner/Spinner';
import styles from './vilkarMidlertidigAlene.less';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import {tekst} from './vilkar-midlertidig-alene-tekst';
import {VilkarMidlertidigAleneProps} from '../../../types/VilkarMidlertidigAleneProps';
import {VilkarMidlertidigAleneSoknadsopplysninger} from '../../../types/MidlertidigAleneVurderingInfo';
import {Visningsstatus} from '../../../types/Visningsstatus';

interface Feilmeldinger {
  begrunnelse: boolean;
  dato: {
    til: boolean;
    fra: boolean;
  };
}

const VilkarMidlertidigAlene: React.FunctionComponent<VilkarMidlertidigAleneProps> = ({
  behandlingsid,
  lesemodus,
  stiTilEndepunkt
}) => {
  const [begrunnelse, endreBegrunnelse] = useState('');
  const [fraDato, endreFraDato] = useState('dd.mm.åååå');
  const [tilDato, endreTilDato] = useState('dd.mm.åååå');
  const [visFeilmedlinger, endreVisFeilmedlinger] = useState<boolean>(false);
  const [erSokerenMidlertidigAleneOmOmsorgen, endreErSokerenMidlertidigAleneOmOmsorgen] = useState<boolean>(true);
  const [visningsstatus, endreVisningsstatus] = useState<Visningsstatus>(Visningsstatus.SPINNER);
  const [soknadsopplysninger, endreSoknadsopplysninger] = useState<VilkarMidlertidigAleneSoknadsopplysninger>(null);
  const [responsFraEndepunkt, endreResponsFraEndepunkt] = useState<Response | null>(null);

  const midlertidigAleneApi = new MidlertidigAleneApi(stiTilEndepunkt, behandlingsid);

  useEffect(() => {
    midlertidigAleneApi
      .hentInfoOmMidlertidigAleneVurdering()
      .then(midlertidigAleneInfo => {
        if (lesemodus) {
          endreFraDato(midlertidigAleneInfo.dato.fra.replaceAll('-', '.'));
          endreTilDato(midlertidigAleneInfo.dato.til.replaceAll('-', '.'));
          endreErSokerenMidlertidigAleneOmOmsorgen(midlertidigAleneInfo.erSokerenMidlertidigAleneOmOmsorgen);
          endreBegrunnelse(midlertidigAleneInfo.begrunnelse);
          endreSoknadsopplysninger(midlertidigAleneInfo.soknadsopplysninger);
        } else {
          endreSoknadsopplysninger(midlertidigAleneInfo.soknadsopplysninger);
        }
        endreVisningsstatus(Visningsstatus.UTEN_FEIL);
      })
      .catch(() => endreVisningsstatus(Visningsstatus.FEIL));
  }, []);

  const feilmedlinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0,
    dato: {
      fra: (fraDato.toLowerCase() === 'dd.mm.åååå' || fraDato === '') && erSokerenMidlertidigAleneOmOmsorgen,
      til: (tilDato.toLowerCase() === 'dd.mm.åååå' || tilDato === '') && erSokerenMidlertidigAleneOmOmsorgen
    }
  };

  switch (visningsstatus) {
    case Visningsstatus.SPINNER:
      return <Spinner/>;
    case Visningsstatus.FEIL:
      return <AlertStripeFeil>Kunne ikke hente vedtak.</AlertStripeFeil>;
  }

  const vurderingKomplett = !feilmedlinger.begrunnelse && !feilmedlinger.dato.til && !feilmedlinger.dato.fra;
  const visFeilmedlingForDato = visFeilmedlinger && feilmedlinger.dato.fra && feilmedlinger.dato.til && tekst.feilmedlingManglerDato
    || visFeilmedlinger && feilmedlinger.dato.til && !feilmedlinger.dato.fra && tekst.feilmeldingManglerTilDato
    || visFeilmedlinger && feilmedlinger.dato.fra && !feilmedlinger.dato.til && tekst.feilmedlingManglerFraDato;

  const onSubmit = () => {
    midlertidigAleneApi
      .losAksjonspunktMidlertidigAlene(begrunnelse,
        {
          fra: erSokerenMidlertidigAleneOmOmsorgen ? fraDato.replaceAll('.', '-') : '',
          til: erSokerenMidlertidigAleneOmOmsorgen ? tilDato.replaceAll('.', '-') : ''
        },
        erSokerenMidlertidigAleneOmOmsorgen)
      .then(endreResponsFraEndepunkt);
  };

  const sjekkHvisVurderingErKomplett = () => vurderingKomplett
    ? onSubmit()
    : endreVisFeilmedlinger(true);

  return (
    <div className={classNames(styles.vilkarMidlerTidigAlene, lesemodus && styleLesemodus.lesemodusboks)}>
      {lesemodus
        ? <p><b>Behandlet aksjonspunkt: </b>{tekst.aksjonspunkt}</p>
        : <AlertStripe type="advarsel">{tekst.aksjonspunkt}</AlertStripe>}

      <OpplysningerFraSoknad {...soknadsopplysninger}/>
      {lesemodus && <OpplysningerFraVedtak
        erSokerenMidlertidigAleneOmOmsorgen={erSokerenMidlertidigAleneOmOmsorgen}
        dato={{fra: fraDato, til: tilDato}}
        begrunnelse={begrunnelse}
      />}

      {!lesemodus && <>
        <Textarea label={tekst.begrunnelse}
                  value={begrunnelse}
                  onChange={e => endreBegrunnelse(e.target.value)}
                  feil={visFeilmedlinger && feilmedlinger.begrunnelse && tekst.feilmedlingBegrunnelse}
        />

        <RadioGruppe className={styles.radioButtons} legend={tekst.sporsmålVilkarOppfylt}>
          <Radio label={'Ja'}
                 checked={erSokerenMidlertidigAleneOmOmsorgen}
                 onChange={() => endreErSokerenMidlertidigAleneOmOmsorgen(true)}
                 name="vilkarAleneomsorg"/>
          <Radio label={'Nei'}
                 checked={!erSokerenMidlertidigAleneOmOmsorgen}
                 onChange={() => endreErSokerenMidlertidigAleneOmOmsorgen(false)}
                 name="vilkarAleneomsorg"/>
        </RadioGruppe>

      </>
      }

      {!lesemodus && erSokerenMidlertidigAleneOmOmsorgen &&
      <SkjemaGruppe className={styles.gyldigVedtaksPeriode}
                    legend={tekst.sporsmalPeriodeVedtakGyldig}
                    feil={visFeilmedlingForDato}>
        <div>
          <span className={styles.gyldigVedtaksPeriodeTilFra}>Fra</span>
          <Datepicker onChange={endreFraDato} value={fraDato}/>
        </div>
        <div>
          <span className={styles.gyldigVedtaksPeriodeTilFra}>Til</span>
          <Datepicker onChange={endreTilDato} value={tilDato}/>
        </div>
      </SkjemaGruppe>}

      {!lesemodus &&
      <>
        <ApiResponseMessage response={responsFraEndepunkt}/>
        <Hovedknapp className={styles.bekreftKnapp} onClick={sjekkHvisVurderingErKomplett}>
          {tekst.bekreftFortsettKnapp}
        </Hovedknapp>
      </>}
    </div>
  );
};

export default VilkarMidlertidigAlene;
