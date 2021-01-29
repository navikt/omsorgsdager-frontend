import AlertStripe from "nav-frontend-alertstriper";
import {Datepicker} from 'nav-datovelger';
import {Radio, RadioGruppe, Textarea} from "nav-frontend-skjema";
import React, {useState} from 'react';
import styles from './vilkarMidlertidigAlene.less'
import OpplysningerFraSoknad from "./opplysninger-fra-soknad/opplysningerFraSoknad";
import {Hovedknapp} from "nav-frontend-knapper";

const VilkarMidlertidigAlene = () => {
  const [fraDato, setFraDato] = useState('DD.MM.ÅÅÅÅ');
  const [tilDato, setTilDato] = useState('DD.MM.ÅÅÅÅ');
  const soknedsopplysninger = {
    årsak: "Avtjener verneplikt",
    beskrivelse: "",
    periode: "01.01.2021-01.08.2021"
  }

  return (
    <div className={styles.vilkarMidlerTidigAleneContainer}>
      <AlertStripe type="advarsel">Vurder om vilkår om aleneomsorg er oppfylt.</AlertStripe>
      <OpplysningerFraSoknad {...soknedsopplysninger}/>
      <RadioGruppe className={styles.vilkarAleneOmsorgRadioButtons} legend="Er vilkårene om aleneomsorg oppfylt?">
        <Radio label={"Ja"} name="vilkarAleneomsorg"/>
        <Radio label={"Nei"} name="vilkarAleneomsorg"/>
      </RadioGruppe>

      <div className={styles.gyldigVedtaksPeriodeContainer}>
        <p className={styles.tests}>I hvilken periode er vedtaket gyldig?</p>
        <div>
          <label className={styles.gyldigVedtaksPeriodeTilFra}>Fra</label>
          <Datepicker onChange={setFraDato} value={fraDato}/>
        </div>
        <div>
          <label className={styles.gyldigVedtaksPeriodeTilFra}>Til</label>
          <Datepicker onChange={setTilDato} value={tilDato}/>
        </div>
      </div>

      <>
        <Textarea label="Begrunnelse" value={"Hi"} onChange={() => {
          console.log('hi')
        }}/>
      </>

      <Hovedknapp className={styles.bekreftKnapp}>Bekreft og fortsett</Hovedknapp>
    </div>
  )
}
export default VilkarMidlertidigAlene;