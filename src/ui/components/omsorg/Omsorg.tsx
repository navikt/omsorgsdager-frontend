import {AlertStripeAdvarsel, AlertStripeFeil} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useEffect, useState} from 'react';
import KroniskSyktBarnApi from '../../../api/KroniskSyktBarnApi';
import {OmsorgProps} from '../../../types/OmsorgProps';
import Spinner from '../spinner/Spinner';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './omsorg.less';

enum Visningsstatus {SPINNER, FEIL, UTEN_FEIL}

const Omsorg: React.FunctionComponent<OmsorgProps> = props => {

  const [visningsstatus, endreVisningsstatus] = useState<Visningsstatus>(Visningsstatus.SPINNER);
  const [harOmsorgen, endreHarOmsorgen] = useState<boolean>(false);
  const [begrunnelse, endreBegrunnelse] = useState<string>('');

  const kroniskSyktBarnApi = new KroniskSyktBarnApi(props.stiTilEndepunkt, props.behandlingsid);

  useEffect(() => {
    kroniskSyktBarnApi
      .hentInfoOmOmsorg()
      .then(omsorgsinfo => {
        endreHarOmsorgen(omsorgsinfo.harOmsorgen);
        endreVisningsstatus(Visningsstatus.UTEN_FEIL);
      })
      .catch(() => endreVisningsstatus(Visningsstatus.FEIL));
  }, []);

  switch (visningsstatus) {
    case Visningsstatus.SPINNER: return <Spinner/>;
    case Visningsstatus.FEIL: return <AlertStripeFeil>Kunne ikke hente vedtak.</AlertStripeFeil>;
  }

  const tekst = {
    instruksjon: 'Barnet er ikke registrert på samme adresse som søker. Vurder om søkeren har omsorgen for barnet.',
    sporsmalHarOmsorgen: 'Har søker omsorgen for barnet?',
    begrunnelse: 'Begrunnelse'
  };

  if (props.lesemodus) {
    return <div className={styleLesemodus.lesemodusboks}>
      <p><b>Behandlet aksjonspunkt:</b> {tekst.instruksjon}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarOmsorgen}</p>
      <p>{harOmsorgen ? 'Ja' : 'Nei'}</p>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{begrunnelse}</p>
    </div>;
  }

  const byttHarOmsorgen = () => endreHarOmsorgen(!harOmsorgen);

  return <div className={styles.omsorg}>
    <AlertStripeAdvarsel className={styles.varselstripe}>{tekst.instruksjon}</AlertStripeAdvarsel>
    <RadioGruppe legend={tekst.sporsmalHarOmsorgen} className={styles.harOmsorgen}>
      <Radio
        label="Ja"
        name="harOmsorgen"
        value="ja"
        className={styles.radioknapp}
        checked={harOmsorgen}
        onChange={byttHarOmsorgen}
      />
      <Radio
        label="Nei"
        name="harOmsorgen"
        value="nei"
        className={styles.radioknapp}
        checked={!harOmsorgen}
        onChange={byttHarOmsorgen}
      />
    </RadioGruppe>
    <Textarea
      label={tekst.begrunnelse}
      value={begrunnelse}
      onChange={e => endreBegrunnelse(e.target.value)}
      maxLength={0}
    />
    <Hovedknapp>Bekreft og fortsett</Hovedknapp>
  </div>;
};

export default Omsorg;