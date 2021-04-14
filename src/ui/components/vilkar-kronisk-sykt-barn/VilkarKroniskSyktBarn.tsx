import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './vilkarKronisSyktBarn.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import {Controller, useForm} from 'react-hook-form';


interface Feilmeldinger {
  begrunnelse: boolean;
}

type FormData = {
  harDokumentasjonOgFravaerRisiko: boolean;
  arsakErIkkeRiskioFraFravaer: boolean;
  begrunnelse: string;
};


const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

  const {
    lesemodus,
    losAksjonspunkt,
    informasjonTilLesemodus,
    aksjonspunktLost,
    vedtakFattetVilkarOppfylt,
    informasjonOmVilkar
  } = props;

  const {
    register,
    watch,
    formState: {errors},
    setError,
    handleSubmit,
    setValue,
    control,
    clearErrors
  } = useForm<FormData>({
    defaultValues: {
      begrunnelse: aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '',
      harDokumentasjonOgFravaerRisiko: aksjonspunktLost ? informasjonTilLesemodus.vilkarOppfylt : false,
      arsakErIkkeRiskioFraFravaer: aksjonspunktLost ? informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer : false
    }
  });

  const begrunnelse = watch('begrunnelse', aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '');
  const harDokumentasjonOgFravaerRisiko = watch('harDokumentasjonOgFravaerRisiko');
  const arsakErIkkeRiskioFraFravaer = watch('arsakErIkkeRiskioFraFravaer');

  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);
  const onSubmit = losAksjonspunkt;

  const kanManGaVidere = !errors.begrunnelse;

  const feilmedlingerBegrunnelse = tekst => {
    if (tekst.length <= 0) {
      setError('begrunnelse', {
        type: 'manual',
        message: 'Begrunnelse må oppgis.'
      });
    }else{
      clearErrors('begrunnelse');
    }
  };

  const endreVisFeilmeldinger = () => {
    feilmedlingerBegrunnelse(begrunnelse);
  };

  const onGaVidere = () => {
    kanManGaVidere
      ? onSubmit(harDokumentasjonOgFravaerRisiko, begrunnelse, arsakErIkkeRiskioFraFravaer)
      : endreVisFeilmeldinger();
  };

  const tekst = {
    instruksjon: 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemming, og om det er økt risiko for fravær.',
    sporsmalHarDokumentasjonOgFravaerRisiko: 'Er det dokumentert at barnet har en kronisk sykdom eller funksjonshemming som gir rett?',
    arsak: 'Årsak',
    begrunnelse: 'Vurdering',
    velgArsak: 'Velg årsak',
    arsakIkkeSyk: 'Barnet har ikke en kronisk sykdom eller funksjonshemming',
    arsakIkkeRisikoFraFravaer: 'Det er ikke økt risiko for fravær fra arbeid'
  };

  return <div
    className={classNames(styles.vilkarKroniskSyktBarn, lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && styleLesemodus.lesemodusboks)}>
    {vedtakFattetVilkarOppfylt && <VilkarStatus
      vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
      aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
      vilkarReferanse={informasjonOmVilkar.vilkar}
      begrunnelse={informasjonOmVilkar.begrunnelse}
      erVilkaretForOmsorgenFor={false}
    />}

    {lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && <>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => endreÅpenForRedigering(true)}
      />

      <p className={styleLesemodus.label}>{tekst.sporsmalHarDokumentasjonOgFravaerRisiko}</p>
      <p className={styleLesemodus.text}>{informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
      {!informasjonTilLesemodus.vilkarOppfylt && <>
        <p className={styleLesemodus.label}>{tekst.arsak}</p>
        <p className={styleLesemodus.text}>{
          informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer ? tekst.arsakIkkeRisikoFraFravaer : tekst.arsakIkkeSyk
        }</p></>
      }
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{informasjonTilLesemodus.begrunnelse}</p>
    </>}

    {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
      <AlertStripeTrekantVarsel text={tekst.instruksjon}/>
      <form className={styles.form} onSubmit={handleSubmit(onGaVidere)}>
        <Textarea
          {...register('begrunnelse',
            {required: true})}
          label={tekst.begrunnelse}
          value={begrunnelse}
          onChange={e => {
            feilmedlingerBegrunnelse(e.target.value);
            setValue('begrunnelse', (e.target.value));
          }}
          maxLength={0}
          feil={errors.begrunnelse && 'Begrunnelse må oppgis.'}
        />

        <Controller
          control={control}
          name="harDokumentasjonOgFravaerRisiko"
          render={({field: {onChange, value}}) => (
            <RadioGruppe
              className={styleRadioknapper.horisontalPlassering}
              legend={tekst.sporsmalHarDokumentasjonOgFravaerRisiko}
            >
              <Radio label="Ja"
                     name="harDokumentasjonOgFravaerRisiko"
                     checked={value}
                     onChange={() => onChange(true)}/>
              <Radio label="Nei"
                     name="harIkkeDokumentasjonOgFravaerRisiko"
                     checked={!value}
                     onChange={() => onChange(false)}/>
            </RadioGruppe>
          )}
        />

        {!harDokumentasjonOgFravaerRisiko && <Controller
          control={control}
          name="arsakErIkkeRiskioFraFravaer"
          render={({field: {onChange, value}}) => (
            <RadioGruppe
              className={styleRadioknapper.horisontalPlassering}
              legend={tekst.velgArsak}
            >
              <Radio label={tekst.arsakIkkeSyk}
                     name="harIkkeDokumentasjonForSykEllerFunksjonshemmet"
                     checked={!value}
                     onChange={() => onChange(false)}
              />
              <Radio label={tekst.arsakIkkeRisikoFraFravaer}
                     name="harIkkeFravaerRisiko"
                     checked={value}
                     onChange={() => onChange(true)}/>
            </RadioGruppe>
          )}
        />}

        <Hovedknapp htmlType="submit">Bekreft og fortsett</Hovedknapp>

      </form>
    </>}
  </div>;
};
export default VilkarKroniskSyktBarn;
