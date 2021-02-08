import AlertStripe from "nav-frontend-alertstriper";
import {Datepicker} from 'nav-datovelger';
import {Hovedknapp} from "nav-frontend-knapper";
import OpplysningerFraSoknad from "./opplysninger-fra-soknad/opplysningerFraSoknad";
import {Radio, RadioGruppe, SkjemaGruppe, Textarea} from "nav-frontend-skjema";
import React, {useState} from 'react';
import styles from './vilkarMidlertidigAlene.less';
import {VilkarMidlertidigAleneProps} from "../../../types/VilkarMidlertidigAleneProps";

interface Feilmeldinger {
  begrunnelse: boolean;
  dato: {
    til: boolean;
    fra: boolean;
  };
}

const VilkarMidlertidigAlene: React.FunctionComponent<VilkarMidlertidigAleneProps> = props => {

  const [begrunnelse, endreBegrunnelse] = useState('');
  const [fraDato, endreFraDato] = useState('DD.MM.ÅÅÅÅ');
  const [tilDato, endreTilDato] = useState('DD.MM.ÅÅÅÅ');
  const [visFeilmedlinger, endreVisFeilmedlinger] = useState<boolean>(false);
  const [vilkarOppfylt, endreVilkarOppfylt] = useState(true);

  const feilmedlinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0,
    dato: {
      til: tilDato == 'DD.MM.ÅÅÅÅ' && vilkarOppfylt,
      fra: fraDato == 'DD.MM.ÅÅÅÅ' && vilkarOppfylt
    }
  };

  const vurderingKomplett = !feilmedlinger.begrunnelse && !feilmedlinger.dato.til && !feilmedlinger.dato.fra;
  const visFeilmedlingForDato = visFeilmedlinger && feilmedlinger.dato.fra && feilmedlinger.dato.til && 'Mangler dato.'
    || visFeilmedlinger && feilmedlinger.dato.til && !feilmedlinger.dato.fra && 'Manger til dato.'
    || visFeilmedlinger && feilmedlinger.dato.fra && !feilmedlinger.dato.til && 'Mangler fra dato.';

  const sjekkHvisVurderingErKomplett = () => vurderingKomplett ?
    props.onSubmit(vilkarOppfylt, {til: vilkarOppfylt ? tilDato : '', fra: vilkarOppfylt ? fraDato : ''}, begrunnelse) :
    endreVisFeilmedlinger(true);

  return (
    <div className={styles.vilkarMidlerTidigAlene}>
      <AlertStripe type="advarsel">Vurder om vilkår om aleneomsorg er oppfylt.</AlertStripe>

      <OpplysningerFraSoknad {...props.soknedsopplysninger}/>

      <RadioGruppe className={styles.radioButtons} legend="Er vilkårene om aleneomsorg oppfylt?">
        <Radio label={"Ja"}
               checked={vilkarOppfylt}
               onChange={() => endreVilkarOppfylt(true)}
               name="vilkarAleneomsorg"/>
        <Radio label={"Nei"}
               checked={!vilkarOppfylt}
               onChange={() => endreVilkarOppfylt(false)}
               name="vilkarAleneomsorg"/>
      </RadioGruppe>

      {vilkarOppfylt &&
      <SkjemaGruppe className={styles.gyldigVedtaksPeriode}
                    legend={'I hvilken periode er vedtaket gyldig?'}
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

      <Textarea label="Begrunnelse"
                value={begrunnelse}
                onChange={e => endreBegrunnelse(e.target.value)}
                feil={visFeilmedlinger && feilmedlinger.begrunnelse && 'Begrunnelse må oppgis.'}
      />

      <Hovedknapp className={styles.bekreftKnapp} onClick={sjekkHvisVurderingErKomplett}>
        Bekreft og fortsett
      </Hovedknapp>
    </div>
  );
};

export default VilkarMidlertidigAlene;