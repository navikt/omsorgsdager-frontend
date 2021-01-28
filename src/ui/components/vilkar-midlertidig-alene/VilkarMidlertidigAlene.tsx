import AlertStripe from "nav-frontend-alertstriper";
import {Datepicker} from 'nav-datovelger';
import {Radio, RadioGruppe} from "nav-frontend-skjema";
import React, {useState} from 'react';
import styles from './vilkarMidlertidigAlene.less'

const VilkarMidlertidigAlene = () => {
  const [fraDato, setFraDato] = useState('');
  const [tilDato, setTilDato] = useState('');

  return (
    <div className={styles.vilkarMidlerTidigAleneContainer}>
      <AlertStripe type="advarsel">Vurder om vilkår om aleneomsorg er oppfylt.</AlertStripe>
      <p>Opplysninger</p>
      <RadioGruppe className={styles.vilkarAleneOmsorgRadioButtons} legend="Er vilkårene om aleneomsorg oppfylt?">
        <Radio label={"Ja"} name="vilkarAleneomsorg"/>
        <Radio label={"Nei"} name="vilkarAleneomsorg"/>
      </RadioGruppe>
      <span>I hvilken periode er vedtaket gyldig?</span>
      <div className={styles.gyldigVedtaksPeriodeContainer}>
        <div className={styles.datoVelger}>
          Fra
          <Datepicker onChange={setFraDato} value={fraDato}/>
        </div>
        <div className={styles.datoVelger}>
          Til
          <Datepicker onChange={setTilDato} value={tilDato}/>
        </div>
      </div>
    </div>
  )
}
export default VilkarMidlertidigAlene;