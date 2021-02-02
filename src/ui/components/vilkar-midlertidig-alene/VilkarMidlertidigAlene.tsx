import AlertStripe, {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {Datepicker} from 'nav-datovelger';
import {Hovedknapp} from "nav-frontend-knapper";
import OpplysningerFraSoknad from "./opplysninger-fra-soknad/opplysningerFraSoknad";
import {Radio, RadioGruppe, Textarea} from "nav-frontend-skjema";
import React, {useState} from 'react';
import styles from './vilkarMidlertidigAlene.less'
import {VilkarMidlertidigAleneProps} from "../../../types/VilkarMidlertidigAleneProps";

const VilkarMidlertidigAlene: React.FunctionComponent<VilkarMidlertidigAleneProps> = props => {

  const [begrunnelse, endreBegrunnelse] = useState('');
  const [feilmedling, endreFeilmedling] = useState('');
  const [fraDato, endreFraDato] = useState('DD.MM.ÅÅÅÅ');
  const [tilDato, endreTilDato] = useState('DD.MM.ÅÅÅÅ');
  const [vilkarOppfylt, endreVilkarOppfylt] = useState(false);

  const sjekkHvisVurderingErKomplett = () => {
    if ((tilDato == 'DD.MM.ÅÅÅÅ' || fraDato == 'DD.MM.ÅÅÅÅ') && vilkarOppfylt) {
      endreFeilmedling('Mangler i hvilken periode vedtaket er gyldig.');
    } else if (begrunnelse.length === 0) {
      endreFeilmedling('Mangler begrunnelse.');
    } else {
      endreFeilmedling('');
      const dato = {
        til: vilkarOppfylt ? tilDato : '',
        fra: vilkarOppfylt ? fraDato : ''
      };
      props.onSubmit(vilkarOppfylt, dato, begrunnelse);
    }
  }

  return (
    <div className={styles.vilkarMidlerTidigAlene}>
      <AlertStripe type="advarsel">Vurder om vilkår om aleneomsorg er oppfylt.</AlertStripe>
      {feilmedling !== '' && <AlertStripe type="feil">{feilmedling}</AlertStripe>}

      <OpplysningerFraSoknad {...props.soknedsopplysninger}/>

      <RadioGruppe className={styles.radioButtons} legend="Er vilkårene om aleneomsorg oppfylt?">
        <Radio label={"Ja"} checked={vilkarOppfylt} onChange={() => endreVilkarOppfylt(true)} name="vilkarAleneomsorg"/>
        <Radio label={"Nei"} checked={!vilkarOppfylt} onChange={() => endreVilkarOppfylt(false)}
               name="vilkarAleneomsorg"/>
      </RadioGruppe>

      {vilkarOppfylt && <div className={styles.gyldigVedtaksPeriode}>
        <span className={styles.gyldigVedtaksPeriodeOverskrift}>I hvilken periode er vedtaket gyldig?</span>
        <div>
          <span className={styles.gyldigVedtaksPeriodeTilFra}>Fra</span>
          <Datepicker onChange={endreFraDato} value={fraDato}/>
        </div>
        <div>
          <span className={styles.gyldigVedtaksPeriodeTilFra}>Til</span>
          <Datepicker onChange={endreTilDato} value={tilDato}/>
        </div>
      </div>}

      <Textarea label="Begrunnelse"
                value={begrunnelse}
                onChange={e => endreBegrunnelse(e.target.value)}
      />

      <Hovedknapp className={styles.bekreftKnapp} onClick={sjekkHvisVurderingErKomplett}>
        Bekreft og fortsett
      </Hovedknapp>
    </div>
  )
}
export default VilkarMidlertidigAlene;