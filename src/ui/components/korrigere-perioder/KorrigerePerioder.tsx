import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {KorrigerePerioderProps} from '../../../types/KorrigerePerioderProps';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import styles from './korrigerePerioder.less';

interface Feilmeldinger {
  begrunnelse: boolean;
}

const KorrigerePerioder: React.FunctionComponent<KorrigerePerioderProps> = props => {

  const [fravaerGrunnetSmittevernhensynEllerStengt, endrefravaerGrunnetSmittevernhensynEllerStengt] = useState<boolean>(props.aksjonspunktLost ? props.informasjonTilLesemodus.vilkarOppfylt : false);
  const [begrunnelse, endreBegrunnelse] = useState<string>(props.aksjonspunktLost ? props.informasjonTilLesemodus.begrunnelse : '');
  const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(props.aksjonspunktLost);
  const [åpneForRedigering, endreÅpneForRedigering] = useState<boolean>(false);

  const onSubmit = props.losAksjonspunkt;

  const feilmeldinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0
  };
  const kanManGaVidere = !feilmeldinger.begrunnelse;

  const onGaVidere = () => kanManGaVidere
    ? onSubmit(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse)
    : endreVisFeilmeldinger(true);

  const tekst = {
    instruksjon: 'Se på nødvendig dokumentasjon og tidligere utbetalte perioder, og vurder om søker har rett på å få utbetalt flere dager.',
    sporsmalErInnvilget: 'Skyldes fraværet særlig smittevernhensyn eller stengte barnehager/skole/SFO?',
    begrunnelse: 'Har søker rett på å få utbetalt flere dager?'
  };

  if (props.lesemodus && !åpneForRedigering) {
    return <div className={styleLesemodus.lesemodusboks}>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => endreÅpneForRedigering(true)}
      />
      <p className={styleLesemodus.label}>{tekst.sporsmalErInnvilget}</p>
      <p className={styleLesemodus.text}>{props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{props.informasjonTilLesemodus.begrunnelse}</p>
    </div>;
  }

  return <div className={styles.korrigerePerioder}>
    <AlertStripeTrekantVarsel text={tekst.instruksjon}/>

    <div className={styles.opplysningerFraSoknad}>
      <div>Opplysninger fra sist innsendte søknad:</div>
      <h4>Oppgitt årsak</h4>
      <p>{props.årsakFraSoknad}</p>
    </div>

    <Textarea
      label={tekst.begrunnelse}
      onChange={e => endreBegrunnelse(e.target.value)}
      value={begrunnelse}
      maxLength={0}
      feil={visFeilmeldinger && feilmeldinger.begrunnelse && 'Begrunnelse må oppgis.'}
    />

    <RadioGruppe
      className={styleRadioknapper.horisontalPlassering}
      legend={tekst.sporsmalErInnvilget}>
      <Radio
        label="Ja"
        name="fravaerGrunnetSmittevernhensynEllerStengt"
        checked={fravaerGrunnetSmittevernhensynEllerStengt}
        onChange={() => endrefravaerGrunnetSmittevernhensynEllerStengt(true)}
      />
      <Radio
        label="Nei"
        name="ikkeFravaerGrunnetSmittevernhensynEllerStengt"
        checked={!fravaerGrunnetSmittevernhensynEllerStengt}
        onChange={() => endrefravaerGrunnetSmittevernhensynEllerStengt(false)}
      />
    </RadioGruppe>

    <Hovedknapp onClick={onGaVidere}>Bekreft og fortsett</Hovedknapp>
  </div>;
};
export default KorrigerePerioder;
