import {Hovedknapp} from 'nav-frontend-knapper';
import {RadioGruppe} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {OmsorgProps} from '../../../types/OmsorgProps';
import {booleanTilTekst} from '../../../util/stringUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import RadioButtonWithBooleanValue from '../react-hook-form-wrappers/RadioButton';
import TextArea from '../react-hook-form-wrappers/TextArea';
import styles from './omsorg.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import { FormProvider, useForm} from 'react-hook-form';

type FormData = {
  harOmsorgen: string;
  begrunnelse: string;
  åpenForRedigering: boolean;
};

enum FagYtelseType {
  KRONISK_SYK = 'OMP_KS',
  MIDLERTIDIG_ALENE = 'OMP_MA'
}
const Omsorg: React.FunctionComponent<OmsorgProps> = ({
  behandlingsID,
  fagytelseType,
  aksjonspunktLost,
  barn,
  vedtakFattetVilkarOppfylt,
  informasjonOmVilkar,
  losAksjonspunkt,
  informasjonTilLesemodus,
  lesemodus
}) => {
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(aksjonspunktLost);
  const barnetEllerBarna = barn.length === 1 ? 'barnet' : 'barna';

  const tekstMidlertidigAlene = {
    instruksjon: 'Vurder om søkeren og den andre forelderen har minst ett felles barn.',
    sporsmalHarOmsorgen: 'Har søkeren og den andre forelderen minst ett felles barn?',
    begrunnelse: 'Vurder om søkeren og den andre forelderen har minst ett felles barn',

  };
  const tekstKroniskSyk = {
    instruksjon: `Vurder om søkeren har omsorgen for ${barnetEllerBarna}.`,
    sporsmalHarOmsorgen: `Har søker omsorgen for ${barnetEllerBarna}?`,
    begrunnelse: `Vurder om søker har omsorgen for ${barnetEllerBarna}`,
  };

  const tekst = {
    opplysningerFraSoknaden: 'Opplysninger fra søknaden:',
    sokersBarn: 'Søkers barn:',
    beskrivelseTilVedtakVilkar: `Søker har omsorgen for ${barnetEllerBarna}`,
    feilIngenVurdering: 'Resultat må oppgis.',
    instruksjon: fagytelseType === FagYtelseType.KRONISK_SYK ? tekstKroniskSyk.instruksjon : tekstMidlertidigAlene.instruksjon,
    sporsmalHarOmsorgen: fagytelseType === FagYtelseType.KRONISK_SYK ? tekstKroniskSyk.sporsmalHarOmsorgen : tekstMidlertidigAlene.sporsmalHarOmsorgen,
    begrunnelse: fagytelseType === FagYtelseType.KRONISK_SYK ? tekstKroniskSyk.begrunnelse : tekstMidlertidigAlene.begrunnelse,
    begrunnelseLesemodus: 'Vurdering'
  };


  const methods = useForm<FormData>({
    defaultValues: {
      begrunnelse: aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '',
      harOmsorgen: aksjonspunktLost ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : '',
      åpenForRedigering: false
    }
  });

  const { handleSubmit, formState: {errors}, watch, setValue} = methods;
  const åpenForRedigering = watch('åpenForRedigering');

  const bekreftAksjonspunkt = data => {
    if (!errors.begrunnelse && !errors.harOmsorgen) {
      losAksjonspunkt(data.harOmsorgen, data.begrunnelse);
    }
  };

  const opplysningerFraSoknaden = <>
    <p>{tekst.opplysningerFraSoknaden}</p>
    <p className={styleLesemodus.label}>{tekst.sokersBarn}</p>
    {barn.map(fnr => <p className={styles.barnTekst} key={fnr}>{fnr}</p>)}
  </>;

  if (lesemodus && !vedtakFattetVilkarOppfylt && !åpenForRedigering) {
    return <div className={`${styleLesemodus.lesemodusboks} ${styles.omsorg}`}>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => setValue('åpenForRedigering',true)}
        />

      {opplysningerFraSoknaden}
        <hr/>
        <p className={styleLesemodus.label}>{tekst.begrunnelseLesemodus}</p>
        <p className={styleLesemodus.fritekst}>{informasjonTilLesemodus.begrunnelse}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarOmsorgen}</p>
      <p className={styleLesemodus.text}>{informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
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

      {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) &&
      <>
        <AlertStripeTrekantVarsel text={tekst.instruksjon}/>
        {opplysningerFraSoknaden}

        <hr/>

        <FormProvider {...methods} >
        <form className={styles.form} onSubmit={handleSubmit(bekreftAksjonspunkt)}>
          <TextArea label={tekst.begrunnelse} name={'begrunnelse'} />

          <div>
            <RadioGruppe
              legend={tekst.sporsmalHarOmsorgen}
              className={styleRadioknapper.horisontalPlassering}
            >
              <RadioButtonWithBooleanValue label={'Ja'} value={'true'} name={'harOmsorgen'}/>
              <RadioButtonWithBooleanValue label={'Nei'} value={'false'} name={'harOmsorgen'}/>
            </RadioGruppe>
            {errors.harOmsorgen &&
            <p className="typo-feilmelding">{tekst.feilIngenVurdering}</p>}
          </div>

          <Hovedknapp htmlType="submit">Bekreft og fortsett</Hovedknapp>
        </form>
        </FormProvider>
      </>}
    </div>);
};

export default Omsorg;