import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import useFormPersist from '../../../util/useFormPersistUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './vilkarKronisSyktBarn.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import {Controller, useForm} from 'react-hook-form';

type FormData = {
  harDokumentasjonOgFravaerRisiko: boolean;
  arsakErIkkeRiskioFraFravaer: boolean;
  begrunnelse: string;
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

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

  //Todo, dra ut der oppe..
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
    handleSubmit,
    setValue,
    control
  } = useForm<FormData>({
    defaultValues: {
      begrunnelse: aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '',
      harDokumentasjonOgFravaerRisiko: aksjonspunktLost ? informasjonTilLesemodus.vilkarOppfylt : false,
      arsakErIkkeRiskioFraFravaer: aksjonspunktLost ? informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer : false
    }
  });

  const harDokumentasjonOgFravaerRisiko = watch('harDokumentasjonOgFravaerRisiko');
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);

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
    if(!errors.begrunnelse) {
      losAksjonspunkt(data.harDokumentasjonOgFravaerRisiko, data.begrunnelse, data.arsakErIkkeRiskioFraFravaer);
      persistedFormData.clear();
    }
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

    {console.log("render")}


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
        <Controller
          control={control}
          name="begrunnelse"
          rules={{required: {value: true, message: 'Begrunnelse må oppgis.'}}}
          render={({ field: { onChange, value},
                   fieldState:{ error}}) => (
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
          className={styleRadioknapper.horisontalPlassering}
          legend={tekst.sporsmalHarDokumentasjonOgFravaerRisiko}
        >
          <Radio label="Ja"
                 name="harDokumentasjonOgFravaerRisiko"
                 checked={harDokumentasjonOgFravaerRisiko}
                 {...register('harDokumentasjonOgFravaerRisiko')}
                 onChange={() => setValue('harDokumentasjonOgFravaerRisiko', true)}/>
          <Radio label="Nei"
                 name="harIkkeDokumentasjonOgFravaerRisiko"
                 checked={!harDokumentasjonOgFravaerRisiko}
                 {...register('harDokumentasjonOgFravaerRisiko')}
                 onChange={() => setValue('harDokumentasjonOgFravaerRisiko', false)}/>
        </RadioGruppe>

        {!harDokumentasjonOgFravaerRisiko && <RadioGruppe
          className={styleRadioknapper.horisontalPlassering}
          legend={tekst.velgArsak}
        >
          <Radio label={tekst.arsakIkkeSyk}
                 name="harIkkeDokumentasjonForSykEllerFunksjonshemmet"
                 {...register('arsakErIkkeRiskioFraFravaer')}
                 onChange={() => setValue('arsakErIkkeRiskioFraFravaer', false)}/>
          <Radio label={tekst.arsakIkkeRisikoFraFravaer}
                 name="harIkkeFravaerRisiko"
                 {...register('arsakErIkkeRiskioFraFravaer')}
                 onChange={() => setValue('arsakErIkkeRiskioFraFravaer', true)}/>
        </RadioGruppe>
        }

        <Hovedknapp htmlType="submit">Bekreft og fortsett</Hovedknapp>
      </form>
    </>}
  </div>;
};
export default VilkarKroniskSyktBarn;
