import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {OmsorgProps} from '../../../types/OmsorgProps';
import useFormPersist from '../../../util/useFormPersistUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './omsorg.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import {Controller, useForm} from 'react-hook-form';

type FormData = {
  harOmsorgen: boolean;
  begrunnelse: string;
};


const Omsorg: React.FunctionComponent<OmsorgProps> = props => {

  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(props.aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);

  const {
    register,
    watch,
    formState: {errors},
    handleSubmit,
    setValue,
    control,
    getValues
  } = useForm<FormData>({
    defaultValues: {
      begrunnelse: props.aksjonspunktLost ? props.informasjonTilLesemodus.begrunnelse : '',
      harOmsorgen: props.aksjonspunktLost ? props.informasjonTilLesemodus.vilkarOppfylt : false,
    }
  });

  const barnetEllerBarna = props.barn.length === 1 ? 'barnet' : 'barna';

  const tekst = {
    instruksjon: `Vurder om søkeren har omsorgen for ${barnetEllerBarna}.`,
    opplysningerFraSoknaden: 'Opplysninger fra søknaden:',
    sokersBarn: 'Søkers barn:',
    sporsmalHarOmsorgen: `Har søker omsorgen for ${barnetEllerBarna}?`,
    begrunnelse: `Vurder om søker har omsorgen for ${barnetEllerBarna}`,
    beskrivelseTilVedtakVilkar: `Søker har omsorgen for ${barnetEllerBarna}`
  };

  const {vedtakFattetVilkarOppfylt, informasjonOmVilkar} = props;

  const behandlingId = '123';

  const persistedFormData = useFormPersist(
    `step-1-${behandlingId}`,
    watch,
    setValue,
    {
      storage: window.sessionStorage
    }
  );

  const onGaVidere = data => {
    if (!errors.begrunnelse) {
      props.losAksjonspunkt(data.harOmsorgen, data.begrunnelse,);
      persistedFormData.clear();
    }
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
      {console.log("render")}

      {vedtakFattetVilkarOppfylt && <VilkarStatus
        vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
        aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
        vilkarReferanse={informasjonOmVilkar.vilkar}
        begrunnelse={informasjonOmVilkar.begrunnelse}
        erVilkaretForOmsorgenFor={true}
        beskrivelseForOmsorgenFor={tekst.beskrivelseTilVedtakVilkar}
      />}

      {(åpenForRedigering || !props.lesemodus && !vedtakFattetVilkarOppfylt) &&
      <>
        <AlertStripeTrekantVarsel text={tekst.instruksjon}/>
        {opplysningerFraSoknaden}
        <hr/>
        <form className={styles.form} onSubmit={handleSubmit(onGaVidere)}>
          <Controller
            control={control}
            name="begrunnelse"
            rules={{required: {value: true, message: 'Begrunnelse må oppgis.'}}}
            render={({
                       field: {onChange, value},
                       fieldState: {error}
                     }) => (
              <Textarea
                label={tekst.begrunnelse}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={0}
                feil={error && error.message}
              />
            )}
          />

          <RadioGruppe
            legend={tekst.sporsmalHarOmsorgen}
            className={styleRadioknapper.horisontalPlassering}
          >
            <Radio
              label="Ja"
              {...register('harOmsorgen')}
              checked={getValues().harOmsorgen}
              onChange={() => setValue('harOmsorgen', true)}
              className={styles.radioknapp}
            />
            <Radio
              label="Nei"
              className={styles.radioknapp}
              checked={!getValues().harOmsorgen}
              {...register('harOmsorgen')}
              onChange={() => setValue('harOmsorgen', false)}
            />
          </RadioGruppe>
          <Hovedknapp htmlType="submit">Bekreft og fortsett</Hovedknapp>
        </form>
      </>}
    </div>);
};

export default Omsorg;