import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {RadioGruppe, SkjemaGruppe} from 'nav-frontend-skjema';
import React from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import {booleanTilTekst, formatereDato, tekstTilBoolean} from '../../../util/stringUtils';
import useFormSessionStorage from '../../../util/useFormSessionStorageUtils';
import {valideringsFunksjonerMidlertidigAlene} from '../../../util/validationReactHookFormUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import DatePicker from '../react-hook-form-wrappers/DatePicker';
import RadioButtonWithBooleanValue from '../react-hook-form-wrappers/RadioButton';
import TextArea from '../react-hook-form-wrappers/TextArea';
import styles from './vilkarKronisSyktBarn.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import {FormProvider, useForm} from 'react-hook-form';

type FormData = {
  harDokumentasjonOgFravaerRisiko: string;
  arsakErIkkeRiskioFraFravaer: string;
  begrunnelse: string;
  åpenForRedigering: boolean;
  fraDato: string;
};

const tekst = {
  instruksjon: 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemming, og om det er økt risiko for fravær.',
  sporsmalHarDokumentasjonOgFravaerRisiko: 'Er det dokumentert at barnet har en kronisk sykdom eller funksjonshemming som gir rett?',
  arsak: 'Årsak',
  begrunnelse: 'Vurdering',
  velgArsak: 'Velg årsak',
  arsakIkkeSyk: 'Barnet har ikke en kronisk sykdom eller funksjonshemming',
  arsakIkkeRisikoFraFravaer: 'Det er ikke økt risiko for fravær fra arbeid',
  feilOppgiÅrsak: 'Årsak må oppgis.',
  feilOppgiHvisDokumentasjonGirRett: 'Resultat må oppgis.',
  sporsmalPeriodeVedtakGyldig: 'Fra hvilken dato er vedtaket gyldig?',
  feilmedlingManglerDato: 'Mangler dato.',
  feilmedlingManglerFraDato: 'Mangler fra-dato.',
  feilmedlingUgyldigDato: 'Ugyldig dato.',
  soknadsdato: 'Søknadsdato'
};

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = ({
  behandlingsID,
  lesemodus,
  losAksjonspunkt,
  informasjonTilLesemodus,
  aksjonspunktLost,
  vedtakFattetVilkarOppfylt,
  informasjonOmVilkar,
  formState,
  soknadsdato,
  tomDato
}) => {
  const harAksjonspunktOgVilkarLostTidligere = informasjonTilLesemodus.begrunnelse.length > 0;
  const methods = useForm<FormData>({
    defaultValues: {
      begrunnelse: harAksjonspunktOgVilkarLostTidligere ? informasjonTilLesemodus.begrunnelse : '',
      harDokumentasjonOgFravaerRisiko: harAksjonspunktOgVilkarLostTidligere ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : '',
      arsakErIkkeRiskioFraFravaer: harAksjonspunktOgVilkarLostTidligere ? booleanTilTekst(informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer) : '',
      fraDato: harAksjonspunktOgVilkarLostTidligere ? formatereDato(informasjonTilLesemodus.fraDato) : formatereDato(soknadsdato),
    }
  });

  const {handleSubmit, watch, formState: {errors}, setValue, getValues} = methods;
  const harDokumentasjonOgFravaerRisiko = watch('harDokumentasjonOgFravaerRisiko');
  const åpenForRedigering = watch('åpenForRedigering');
  const formStateKey = `${behandlingsID}-utvidetrett-ks`;
  const {
    erDatoFyltUt,
    erDatoGyldig,
  } = valideringsFunksjonerMidlertidigAlene(getValues, 'harDokumentasjonOgFravaerRisiko');

  const erArsakErIkkeRiskioFraFravaer = val => {
    if(tekstTilBoolean(getValues().harDokumentasjonOgFravaerRisiko)) return true;
    return val !== null && val.length > 0;
  };

  const mellomlagringFormState = useFormSessionStorage(
    formStateKey,
    formState,
    methods.watch,
    methods.setValue,
    lesemodus,
    åpenForRedigering,
    getValues
  );

  const bekreftAksjonspunkt = data => {
    if (!errors.begrunnelse && !errors.arsakErIkkeRiskioFraFravaer && !errors.fraDato && !errors.harDokumentasjonOgFravaerRisiko) {
      losAksjonspunkt(data.harDokumentasjonOgFravaerRisiko, data.begrunnelse, data.arsakErIkkeRiskioFraFravaer, data.fraDato);
      setValue('åpenForRedigering', false);
      mellomlagringFormState.fjerneState();
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

    {lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && <>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={aksjonspunktLost}
        åpneForRedigereInformasjon={() => setValue('åpenForRedigering',true)}
      />

      {informasjonTilLesemodus.vilkarOppfylt && <>
        <p className={styleLesemodus.label}>{tekst.soknadsdato}</p>
        <p className={styleLesemodus.text}>{formatereDato(soknadsdato)}</p>
      </>
      }

      <p className={styleLesemodus.label}>{tekst.sporsmalHarDokumentasjonOgFravaerRisiko}</p>
      <p className={styleLesemodus.text}>{informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>

      {!informasjonTilLesemodus.vilkarOppfylt && <>
        <p className={styleLesemodus.label}>{tekst.arsak}</p>
        <p className={styleLesemodus.text}>{
          informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer ? tekst.arsakIkkeRisikoFraFravaer : tekst.arsakIkkeSyk
        }</p></>
      }

      {informasjonTilLesemodus.vilkarOppfylt && <>
        <p className={styleLesemodus.label}>{tekst.sporsmalPeriodeVedtakGyldig}</p>
        <p className={styleLesemodus.text}>{formatereDato(informasjonTilLesemodus.fraDato)}</p></>
      }

      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{informasjonTilLesemodus.begrunnelse}</p>
    </>}

    {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
      <AlertStripeTrekantVarsel text={tekst.instruksjon}/>
      <FormProvider {...methods} >

        {/* <p className={styleLesemodus.label}>{tekst.soknadsdato}</p>
        <p className={styleLesemodus.text}>{formatereDato(fraDatoFraSoknad)}</p> */}

        <form className={styles.form} onSubmit={handleSubmit(bekreftAksjonspunkt)}>

          <TextArea label={tekst.begrunnelse} name={'begrunnelse'}/>

          <div>
            <RadioGruppe className={styleRadioknapper.horisontalPlassering}
                         legend={tekst.sporsmalHarDokumentasjonOgFravaerRisiko}>
              <RadioButtonWithBooleanValue label={'Ja'} value={'true'} name={'harDokumentasjonOgFravaerRisiko'}/>
              <RadioButtonWithBooleanValue label={'Nei'} value={'false'} name={'harDokumentasjonOgFravaerRisiko'}/>
            </RadioGruppe>
            {errors.harDokumentasjonOgFravaerRisiko &&
            <p className="typo-feilmelding">{tekst.feilOppgiHvisDokumentasjonGirRett}</p>}
          </div>

          {harDokumentasjonOgFravaerRisiko.length > 0 && !tekstTilBoolean(harDokumentasjonOgFravaerRisiko) && <div>
            <RadioGruppe className={styleRadioknapper.horisontalPlassering} legend={tekst.velgArsak}>
              <RadioButtonWithBooleanValue label={tekst.arsakIkkeSyk}
                                           value={'false'}
                                           name={'arsakErIkkeRiskioFraFravaer'}
                                           valideringsFunksjoner={erArsakErIkkeRiskioFraFravaer}/>
              <RadioButtonWithBooleanValue label={tekst.arsakIkkeRisikoFraFravaer}
                                           value={'true'}
                                           name={'arsakErIkkeRiskioFraFravaer'}
                                           valideringsFunksjoner={erArsakErIkkeRiskioFraFravaer}/>
            </RadioGruppe>
            {errors.arsakErIkkeRiskioFraFravaer && <p className="typo-feilmelding">{tekst.feilOppgiÅrsak}</p>}
          </div>}

          {harDokumentasjonOgFravaerRisiko.length > 0 && tekstTilBoolean(harDokumentasjonOgFravaerRisiko) && <div>
            <SkjemaGruppe className={styles.fraDato}
                          legend={tekst.sporsmalPeriodeVedtakGyldig}
                          feil={errors.fraDato && errors.fraDato.type === 'erDatoFyltUt' && tekst.feilmedlingManglerFraDato
                          || errors.fraDato && errors.fraDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato}
            >

              <DatePicker titel={''}
                          navn={'fraDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig}}
                          begrensningerIKalender={{maxDate: tomDato.substring(0, 10)}}
              />

            </SkjemaGruppe>
          </div>}

          <Hovedknapp htmlType="submit">Bekreft og fortsett</Hovedknapp>
        </form>
      </FormProvider>
    </>}
  </div>;
};
export default VilkarKroniskSyktBarn;
