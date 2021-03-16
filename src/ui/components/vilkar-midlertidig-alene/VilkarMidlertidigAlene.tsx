import classNames from 'classnames';
import {Datepicker} from 'nav-datovelger';
import {Hovedknapp} from 'nav-frontend-knapper';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import {Radio, RadioGruppe, SkjemaGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import styles from './vilkarMidlertidigAlene.less';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import {tekst} from './vilkar-midlertidig-alene-tekst';
import {VilkarMidlertidigAleneProps} from '../../../types/VilkarMidlertidigAleneProps';
import VilkarMidlertidigAleneLesemodus from '../vilkar-midlertidig-alene-lesemodus/VilkarMidlertidigAleneLesemodus';
import VilkarStatus from '../vilkar-status/VilkarStatus';

interface Feilmeldinger {
  begrunnelse: boolean;
  dato: {
    til: boolean;
    fra: boolean;
  };
}

const VilkarMidlertidigAlene: React.FunctionComponent<VilkarMidlertidigAleneProps> = ({
  aksjonspunktLost,
  lesemodus,
  soknadsopplysninger,
  informasjonTilLesemodus,
  vedtakFattetVilkarOppfylt,
  informasjonOmVilkar,
  losAksjonspunkt
}) => {
  const [visFeilmedlinger, endreVisFeilmedlinger] = useState<boolean>(false);
  const [erSokerenMidlertidigAleneOmOmsorgen, endreErSokerenMidlertidigAleneOmOmsorgen] = useState<boolean>(aksjonspunktLost ? informasjonTilLesemodus.vilkarOppfylt : true);
  const [begrunnelse, endreBegrunnelse] = useState(aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '');
  const [fraDato, endreFraDato] = useState(aksjonspunktLost ? informasjonTilLesemodus.dato.fra : 'dd.mm.åååå');
  const [tilDato, endreTilDato] = useState(aksjonspunktLost ? informasjonTilLesemodus.dato.til : 'dd.mm.åååå');
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);

  const feilmedlinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0,
    dato: {
      fra: (fraDato.toLowerCase() === 'dd.mm.åååå' || fraDato === '') && erSokerenMidlertidigAleneOmOmsorgen,
      til: (tilDato.toLowerCase() === 'dd.mm.åååå' || tilDato === '') && erSokerenMidlertidigAleneOmOmsorgen
    }
  };

  const vurderingKomplett = !feilmedlinger.begrunnelse && !feilmedlinger.dato.til && !feilmedlinger.dato.fra;
  const visFeilmedlingForDato = visFeilmedlinger && feilmedlinger.dato.fra && feilmedlinger.dato.til && tekst.feilmedlingManglerDato
    || visFeilmedlinger && feilmedlinger.dato.til && !feilmedlinger.dato.fra && tekst.feilmeldingManglerTilDato
    || visFeilmedlinger && feilmedlinger.dato.fra && !feilmedlinger.dato.til && tekst.feilmedlingManglerFraDato;

  const bekreftAksjonspunkt = () => {
    losAksjonspunkt({
      begrunnelse,
      erSokerenMidlertidigAleneOmOmsorgen,
      fra: erSokerenMidlertidigAleneOmOmsorgen ? fraDato.replaceAll('.', '-') : '',
      til: erSokerenMidlertidigAleneOmOmsorgen ? tilDato.replaceAll('.', '-') : ''
    });
  };

  const sjekkHvisVurderingErKomplett = () => vurderingKomplett
    ? bekreftAksjonspunkt()
    : endreVisFeilmedlinger(true);

  return (
    <div className={classNames(styles.vilkarMidlerTidigAlene, lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && styleLesemodus.lesemodusboks)}>
      {vedtakFattetVilkarOppfylt && <VilkarStatus
        vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
        aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
        vilkarReferanse={informasjonOmVilkar.vilkar}
        begrunnelse={informasjonOmVilkar.begrunnelse}
        erVilkaretForOmsorgenFor={false}
      />}

      {lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt &&
      <VilkarMidlertidigAleneLesemodus
        soknadsopplysninger={soknadsopplysninger}
        informasjonTilLesemodus={informasjonTilLesemodus}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => endreÅpenForRedigering(true)}
      />}

      {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
        <AlertStripeTrekantVarsel text={tekst.aksjonspunkt}/>

        <OpplysningerFraSoknad {...soknadsopplysninger}/>

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

        {erSokerenMidlertidigAleneOmOmsorgen &&
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
        </SkjemaGruppe>
        }

        <Hovedknapp className={styles.bekreftKnapp} onClick={sjekkHvisVurderingErKomplett}>
          {tekst.bekreftFortsettKnapp}
        </Hovedknapp>

      </>}
    </div>
  );
};
export default VilkarMidlertidigAlene;
