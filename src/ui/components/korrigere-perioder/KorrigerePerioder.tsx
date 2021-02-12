import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {KorrigerePerioderProps} from '../../../types/KorrigerePerioderProps';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './korrigerePerioder.less';

const KorrigerePerioder: React.FunctionComponent<KorrigerePerioderProps> = props => {

  const [innvilgedePerioder, endreInnvilgedePerioder] = useState<'alle' | 'ingen'>('ingen');
  const [begrunnelse, endreBegrunnelse] = useState<string>('');

  const tekst = {
    instruksjon: 'Se på dokumentasjonen og vurder om den dekker alle fraværsperioder.',
    sporsmalErInnvilget: 'Er periodene innvilget pga. særlige smittevernshensyn eller stengt barnehage/skole/sfo?',
    begrunnelse: 'Begrunnelse'
  };

  if (props.lesemodus) {
    return <div className={styleLesemodus.lesemodusboks}>
      <p><b>Behandlet aksjonspunkt:</b> {tekst.instruksjon}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalErInnvilget}</p>
      <p>{innvilgedePerioder === 'alle' ? 'Ja' : 'Nei'}</p>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{begrunnelse}</p>
    </div>;
  }

  return <div className={styles.korrigerePerioder}>
    <AlertStripeAdvarsel className={styles.varselstripe}>
      {tekst.instruksjon}
    </AlertStripeAdvarsel>
    <RadioGruppe legend={tekst.sporsmalErInnvilget}>
      <Radio
        label="Ja"
        name="alle"
        checked={innvilgedePerioder === 'alle'}
        onChange={e => e.target.value && endreInnvilgedePerioder('alle')}
      />
      <Radio
        label="Nei"
        name="ingen"
        checked={innvilgedePerioder === 'ingen'}
        onChange={e => e.target.value && endreInnvilgedePerioder('ingen')}
      />
    </RadioGruppe>
    <Textarea
      label={tekst.begrunnelse}
      onChange={e => endreBegrunnelse(e.target.value)}
      value={begrunnelse}
      maxLength={0}
    />
    <Hovedknapp>Bekreft</Hovedknapp>
  </div>;
};
export default KorrigerePerioder;
