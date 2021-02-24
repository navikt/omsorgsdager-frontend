import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {OmsorgProps} from '../../../types/OmsorgProps';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './omsorg.less';

const Omsorg: React.FunctionComponent<OmsorgProps> = props => {

  const [harOmsorgen, endreHarOmsorgen] = useState<boolean>(props.harOmsorgen);
  const [begrunnelse, endreBegrunnelse] = useState<string>('');

  const barnetEllerBarna = props.barn.length === 1 ? 'barnet' : 'barna';

  const tekst = {
    instruksjon: 'Barnet er ikke registrert på samme adresse som søker. Vurder om søkeren har omsorgen for barnet.',
    opplysningerFraSoknaden: 'Opplysninger fra søknaden:',
    sokersBarn: 'Søkers barn:',
    sporsmalHarOmsorgen: `Har søker omsorgen for ${barnetEllerBarna}?`,
    begrunnelse: `Begrunn om søker har omsorgen for ${barnetEllerBarna}`
  };

  const opplysningerFraSoknaden = <>
    <p>{tekst.opplysningerFraSoknaden}</p>
    <p className={styleLesemodus.label}>{tekst.sokersBarn}</p>
    {props.barn.map(fnr => <p key={fnr}>{fnr}</p>)}
  </>;

  if (props.lesemodus) {
    return <div className={`${styleLesemodus.lesemodusboks} ${styles.omsorg}`}>
      <p><b>Behandlet aksjonspunkt:</b> {tekst.instruksjon}</p>
      {opplysningerFraSoknaden}
      <hr/>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{begrunnelse}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarOmsorgen}</p>
      <p>{harOmsorgen ? 'Ja' : 'Nei'}</p>
    </div>;
  }

  const byttHarOmsorgen = () => endreHarOmsorgen(!harOmsorgen);

  return <div className={styles.omsorg}>
    <AlertStripeAdvarsel className={styles.varselstripe}>{tekst.instruksjon}</AlertStripeAdvarsel>
    {opplysningerFraSoknaden}
    <hr/>
    <Textarea
      label={tekst.begrunnelse}
      value={begrunnelse}
      onChange={e => endreBegrunnelse(e.target.value)}
      maxLength={0}
    />
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
    <Hovedknapp>Bekreft og fortsett</Hovedknapp>
  </div>;
};

export default Omsorg;