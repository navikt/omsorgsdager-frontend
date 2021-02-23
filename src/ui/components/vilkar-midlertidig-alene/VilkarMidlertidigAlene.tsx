import AlertStripe from 'nav-frontend-alertstriper';
import classNames from 'classnames';
import {Datepicker} from 'nav-datovelger';
import {Hovedknapp} from 'nav-frontend-knapper';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import {Radio, RadioGruppe, SkjemaGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import styles from './vilkarMidlertidigAlene.less';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import {tekst} from './vilkar-midlertidig-alene-tekst';
import {VilkarMidlertidigAleneProps} from '../../../types/VilkarMidlertidigAleneProps';
import VilkarMidlertidigAleneLesemodus from '../vilkar-midlertidig-alene-lesemodus/VilkarMidlertidigAleneLesemodus';

interface Feilmeldinger {
  begrunnelse: boolean;
  dato: {
    til: boolean;
    fra: boolean;
  };
}

const VilkarMidlertidigAlene: React.FunctionComponent<VilkarMidlertidigAleneProps> = ({
  lesemodus,
  soknadsopplysninger,
  informasjonTilLesemodus,
  onSubmit
}) => {
    const [visFeilmedlinger, endreVisFeilmedlinger] = useState<boolean>(false);
    const [erSokerenMidlertidigAleneOmOmsorgen, endreErSokerenMidlertidigAleneOmOmsorgen] = useState<boolean>(true);
    const [begrunnelse, endreBegrunnelse] = useState('');
    const [fraDato, endreFraDato] = useState('dd.mm.åååå');
    const [tilDato, endreTilDato] = useState('dd.mm.ååå');

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
      onSubmit({
        begrunnelse,
        erSokerenMidlertidigAleneOmOmsorgen,
        dato: {
          fra: erSokerenMidlertidigAleneOmOmsorgen ? fraDato.replaceAll('.', '-') : '',
          til: erSokerenMidlertidigAleneOmOmsorgen ? tilDato.replaceAll('.', '-') : ''
        }
      });
    };

    const sjekkHvisVurderingErKomplett = () => vurderingKomplett
      ? bekreftAksjonspunkt()
      : endreVisFeilmedlinger(true);

    return (
      <div className={classNames(styles.vilkarMidlerTidigAlene, lesemodus && styleLesemodus.lesemodusboks)}>
        {lesemodus && <VilkarMidlertidigAleneLesemodus soknadsopplysninger={soknadsopplysninger}
                                                       informasjonTilLesemodus={informasjonTilLesemodus}/>}
        {!lesemodus && <>
          <AlertStripe type="advarsel">{tekst.aksjonspunkt}</AlertStripe>

          <OpplysningerFraSoknad {...soknadsopplysninger}/>

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
  }
;

export default VilkarMidlertidigAlene;
