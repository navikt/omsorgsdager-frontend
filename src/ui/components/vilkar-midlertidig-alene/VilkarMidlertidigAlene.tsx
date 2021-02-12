import AlertStripe, {AlertStripeFeil} from "nav-frontend-alertstriper";
import classNames from 'classnames';
import {Datepicker} from 'nav-datovelger';
import {Hovedknapp} from "nav-frontend-knapper";
import OpplysningerFraVedtak from "./opplysninger-fra-vedtak/OpplysningerFraVedtak";
import OpplysningerFraSoknad from "./opplysninger-fra-soknad/OpplysningerFraSoknad";
import {Radio, RadioGruppe, SkjemaGruppe, Textarea} from "nav-frontend-skjema";
import React, {useEffect, useState} from 'react';
import styles from './vilkarMidlertidigAlene.less';
import styleLesemodus from "../lesemodus/lesemodusboks.less";
import {VilkarMidlertidigAleneProps} from "../../../types/VilkarMidlertidigAleneProps";
import MidlertidigAleneApi from "../../../api/MidlertidigAleneApi";
import {VilkarMidlertidigAleneSoknedsopplysninger} from "../../../types/MidlertidigAleneVurderingInfo";
import Spinner from "../spinner/Spinner";
import {Visningsstatus} from "../../../types/Visningsstatus";

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
  const [fraDato, endreFraDato] = useState('DD.MM.ÅÅÅÅ');
  const [tilDato, endreTilDato] = useState('DD.MM.ÅÅÅÅ');
  const [visFeilmedlinger, endreVisFeilmedlinger] = useState<boolean>(false);
  const [vilkarOppfylt, endreVilkarOppfylt] = useState<boolean>(true);
  const [visningsstatus, endreVisningsstatus] = useState<Visningsstatus>(Visningsstatus.SPINNER);
  const [soknedsopplysninger, endreSoknedsopplysninger] = useState<VilkarMidlertidigAleneSoknedsopplysninger>(null);
  const [responsFraEndepunkt, endreResponsFraEndepunkt] = useState<Response | null>(null);

  const midlertidigAleneApi = new MidlertidigAleneApi(stiTilEndepunkt, behandlingsid);
  useEffect(() => {
    midlertidigAleneApi
      .hentInfoOmMidlertidigAleneVurdering()
      .then(midlertidigAleneInfo => {
        endreFraDato(midlertidigAleneInfo.dato.fra);
        endreTilDato(midlertidigAleneInfo.dato.til);
        endreVilkarOppfylt(midlertidigAleneInfo.vilkarOppfylt);
        endreBegrunnelse(midlertidigAleneInfo.begrunnelse);
        endreSoknedsopplysninger(midlertidigAleneInfo.soknedsopplysninger);
        endreVisningsstatus(Visningsstatus.UTEN_FEIL);
      })
      .catch(() => endreVisningsstatus(Visningsstatus.FEIL));
  }, []);

  const opplysningerFraVedtak = {
    vilkarOppfylt: vilkarOppfylt,
    dato: {
      fra: fraDato,
      til: tilDato
    },
    begrunnelse: begrunnelse
  };

  const feilmedlinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0,
    dato: {
      til: tilDato == 'DD.MM.ÅÅÅÅ' && vilkarOppfylt,
      fra: fraDato == 'DD.MM.ÅÅÅÅ' && vilkarOppfylt
    }
  };

  switch (visningsstatus) {
    case Visningsstatus.SPINNER:
      return <Spinner/>;
    case Visningsstatus.FEIL:
      return <AlertStripeFeil>Kunne ikke hente vedtak.</AlertStripeFeil>;
  }

  const vurderingKomplett = !feilmedlinger.begrunnelse && !feilmedlinger.dato.til && !feilmedlinger.dato.fra;
  const visFeilmedlingForDato = visFeilmedlinger && feilmedlinger.dato.fra && feilmedlinger.dato.til && 'Mangler dato.'
    || visFeilmedlinger && feilmedlinger.dato.til && !feilmedlinger.dato.fra && 'Manger til dato.'
    || visFeilmedlinger && feilmedlinger.dato.fra && !feilmedlinger.dato.til && 'Mangler fra dato.';

  const sjekkHvisVurderingErKomplett = () => vurderingKomplett ?
    console.log(vilkarOppfylt, {til: vilkarOppfylt ? tilDato : '', fra: vilkarOppfylt ? fraDato : ''}, begrunnelse) :
    endreVisFeilmedlinger(true);

  const tekst = {
    aksjonspunkt: 'Vurder om vilkår om midlertidig alene om omsorgen er oppfylt.',
    sporsmålVilkarOppfylt: 'Er vilkårene om aleneomsorg oppfylt?',
    sporsmalPeriodeVedtakGyldig: 'I hvilken periode er vedtaket gyldig?',
    begrunnelse: 'Begrunnelse',
    feilmedlingBegrunnelse: 'Begrunnelse må oppgis.',
    bekreftFortsettKnapp: 'Bekreft og fortsett'
  };

  return (
    <div className={classNames(styles.vilkarMidlerTidigAlene, lesemodus && styleLesemodus.lesemodusboks)}>
      {lesemodus
        ? <p><b>Behandlet aksjonspunkt:</b>{tekst.aksjonspunkt}</p>
        : <AlertStripe type="advarsel">{tekst.aksjonspunkt}</AlertStripe>}

      <OpplysningerFraSoknad {...soknedsopplysninger}/>
      {lesemodus && <OpplysningerFraVedtak {...opplysningerFraVedtak}/>}

      {!lesemodus &&
      <RadioGruppe className={styles.radioButtons} legend={tekst.sporsmålVilkarOppfylt}>
        <Radio label={"Ja"}
               checked={vilkarOppfylt}
               onChange={() => endreVilkarOppfylt(true)}
               name="vilkarAleneomsorg"/>
        <Radio label={"Nei"}
               checked={!vilkarOppfylt}
               onChange={() => endreVilkarOppfylt(false)}
               name="vilkarAleneomsorg"/>
      </RadioGruppe>}

      {!lesemodus && vilkarOppfylt &&
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
        <Textarea label={tekst.begrunnelse}
                  value={begrunnelse}
                  onChange={e => endreBegrunnelse(e.target.value)}
                  feil={visFeilmedlinger && feilmedlinger.begrunnelse && tekst.feilmedlingBegrunnelse}
        />
        <Hovedknapp className={styles.bekreftKnapp} onClick={sjekkHvisVurderingErKomplett}>
          {tekst.bekreftFortsettKnapp}
        </Hovedknapp>
      </>}
    </div>
  );
};

export default VilkarMidlertidigAlene;
