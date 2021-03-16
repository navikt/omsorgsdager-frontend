import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {OmsorgProps} from '../../../types/OmsorgProps';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './omsorg.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';

interface Feilmeldinger {
  begrunnelse: boolean;
}

const Omsorg: React.FunctionComponent<OmsorgProps> = props => {

  const [harOmsorgen, endreHarOmsorgen] = useState<boolean>(props.aksjonspunktLost ? props.informasjonTilLesemodus.vilkarOppfylt : false);
  const [begrunnelse, endreBegrunnelse] = useState<string>(props.aksjonspunktLost ? props.informasjonTilLesemodus.begrunnelse : '');
  const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(props.aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);

  const barnetEllerBarna = props.barn.length === 1 ? 'barnet' : 'barna';
  const {vedtakFattetVilkarOppfylt, informasjonOmVilkar} = props;

  const onSubmit = props.losAksjonspunkt;

  const feilmeldinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0
  };

  const kanManGaVidere = !feilmeldinger.begrunnelse;

  const onGaVidere = () => kanManGaVidere
    ? onSubmit(harOmsorgen, begrunnelse)
    : endreVisFeilmeldinger(true);

  const tekst = {
    instruksjon: 'Barnet er ikke registrert på samme adresse som søker. Vurder om søkeren har omsorgen for barnet.',
    opplysningerFraSoknaden: 'Opplysninger fra søknaden:',
    sokersBarn: 'Søkers barn:',
    sporsmalHarOmsorgen: `Har søker omsorgen for ${barnetEllerBarna}?`,
    begrunnelse: `Begrunn om søker har omsorgen for ${barnetEllerBarna}`,
    beskrivelseTilVedtakVilkar: `Søker har omsorgen for ${barnetEllerBarna}`
  };

  const opplysningerFraSoknaden = <>
    <p>{tekst.opplysningerFraSoknaden}</p>
    <p className={styleLesemodus.label}>{tekst.sokersBarn}</p>
    {props.barn.map(fnr => <p className={styles.barnTekst} key={fnr}>{fnr}</p>)}
  </>;

  if (props.lesemodus && !vedtakFattetVilkarOppfylt && !åpenForRedigering) {
    return <div className={`${styleLesemodus.lesemodusboks} ${styles.omsorg}`}>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => endreÅpenForRedigering(true)}
      />

      {opplysningerFraSoknaden}
      <hr/>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{props.informasjonTilLesemodus.begrunnelse}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarOmsorgen}</p>
      <p className={styleLesemodus.text}>{props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
    </div>;
  }

  return (
    <div className={styles.omsorg}>

      {vedtakFattetVilkarOppfylt && <VilkarStatus
        vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
        aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
        vilkarReferanse={informasjonOmVilkar.vilkar}
        begrunnelse={informasjonOmVilkar.begrunnelse}
        erVilkaretForOmsorgenFor={true}
        beskrivelseForOmsorgenFor={tekst.beskrivelseTilVedtakVilkar}
      />}

      {(åpenForRedigering || !props.lesemodus && !vedtakFattetVilkarOppfylt) && <>
        <AlertStripeTrekantVarsel text={tekst.instruksjon}/>
        {opplysningerFraSoknaden}
        <hr/>
        <Textarea
          label={tekst.begrunnelse}
          value={begrunnelse}
          onChange={e => endreBegrunnelse(e.target.value)}
          maxLength={0}
          feil={visFeilmeldinger && feilmeldinger.begrunnelse && 'Begrunnelse må oppgis.'}
        />
        <RadioGruppe
          legend={tekst.sporsmalHarOmsorgen}
          className={styleRadioknapper.horisontalPlassering}
        >
          <Radio
            label="Ja"
            name="harOmsorgen"
            value="ja"
            className={styles.radioknapp}
            checked={harOmsorgen}
            onChange={() => endreHarOmsorgen(true)}
          />
          <Radio
            label="Nei"
            name="harOmsorgen"
            value="nei"
            className={styles.radioknapp}
            checked={!harOmsorgen}
            onChange={() => endreHarOmsorgen(false)}
          />
        </RadioGruppe>
        <Hovedknapp onClick={onGaVidere}>Bekreft og fortsett</Hovedknapp>
      </>}
    </div>);
};

export default Omsorg;