import {AlertStripeAdvarsel, AlertStripeFeil} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useEffect, useState} from 'react';
import KroniskSyktBarnApi from '../../../api/KroniskSyktBarnApi';
import MidlertidigAleneApi from '../../../api/MidlertidigAleneApi';
import {OmsorgProps, Prosesstype} from '../../../types/OmsorgProps';
import {Visningsstatus} from '../../../types/Visningsstatus';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import Spinner from '../spinner/Spinner';
import styles from './omsorg.less';

const Omsorg: React.FunctionComponent<OmsorgProps> = props => {

  const [visningsstatus, endreVisningsstatus] = useState<Visningsstatus>(Visningsstatus.SPINNER);
  const [harOmsorgen, endreHarOmsorgen] = useState<boolean>(false);
  const [begrunnelse, endreBegrunnelse] = useState<string>('');

  const omsorgApi =
    new (props.prosesstype === Prosesstype.KRONISK_SYKT_BARN ? KroniskSyktBarnApi : MidlertidigAleneApi)(
      props.stiTilEndepunkt,
      props.behandlingsid
    );

  useEffect(() => {
    omsorgApi
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