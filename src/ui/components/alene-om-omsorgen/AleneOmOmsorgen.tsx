import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {AleneOmOmsorgenProps} from '../../../types/AleneOmOmsorgenProps';
import {booleanTilTekst, formatereDato, tekstTilBoolean} from '../../../util/stringUtils';
import useFormSessionStorage from '../../../util/useFormSessionStorageUtils';
import {valideringsFunksjonerMidlertidigAlene} from '../../../util/validationReactHookFormUtils';
import AleneOmOmsorgenLesemodus from '../alene-om-omsorgen-lesemodus/AleneOmOmsorgenLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import {RadioGruppe, SkjemaGruppe} from 'nav-frontend-skjema';
import React from 'react';
import DatePicker from '../react-hook-form-wrappers/DatePicker';
import RadioButtonWithBooleanValue from '../react-hook-form-wrappers/RadioButton';
import TextArea from '../react-hook-form-wrappers/TextArea';
import styles from '../vilkar-midlertidig-alene/vilkarMidlertidigAlene.less';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import {tekst} from './alene-om-omsorgen-tekst';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import {FormProvider, useForm} from 'react-hook-form';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';

type FormData = {
  begrunnelse: string;
  fraDato: string;
  tilDato: string;
  erSokerenAleneOmOmsorgen: string;
  avslagsArsakErPeriodeErIkkeOverSeksMån: string;
  åpenForRedigering: boolean;
};

const AleneOmOmsorgen: React.FunctionComponent<AleneOmOmsorgenProps> = ({
  behandlingsID,
  aksjonspunktLost,
  lesemodus,
  fraDatoFraSoknad,
  tomDato,
  informasjonTilLesemodus,
  vedtakFattetVilkarOppfylt,
  informasjonOmVilkar,
  losAksjonspunkt,
  formState
}) => {
  const formStateKey = `${behandlingsID}-utvidetrett-alene-om-omsorgen`;
  const harAksjonspunktOgVilkarLostTidligere = informasjonTilLesemodus.fraDato.length > 0 && informasjonTilLesemodus.begrunnelse.length > 0;

  const methods = useForm<FormData>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      begrunnelse: harAksjonspunktOgVilkarLostTidligere ? informasjonTilLesemodus.begrunnelse : '',
      fraDato: harAksjonspunktOgVilkarLostTidligere ? formatereDato(informasjonTilLesemodus.fraDato) : formatereDato(fraDatoFraSoknad),
      tilDato: harAksjonspunktOgVilkarLostTidligere ? formatereDato(informasjonTilLesemodus.tilDato) : formatereDato(tomDato),
      erSokerenAleneOmOmsorgen: harAksjonspunktOgVilkarLostTidligere ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : '',
      // avslagsArsakErPeriodeErIkkeOverSeksMån: aksjonspunktLost ? booleanTilTekst(informasjonTilLesemodus.avslagsArsakErPeriodeErIkkeOverSeksMån) : '',
      åpenForRedigering: false
    }
  });

  const {formState: {errors}, getValues, handleSubmit, watch, setValue} = methods;
  const erSokerAleneOmOmsorgen = watch('erSokerenAleneOmOmsorgen');
  const åpenForRedigering = watch('åpenForRedigering');

  const {
    erDatoFyltUt,
    erDatoGyldig,
  // erAvslagsArsakErPeriodeErIkkeOverSeksMånGyldig
  } = valideringsFunksjonerMidlertidigAlene(getValues, 'erSokerenAleneOmOmsorgen');

  const mellomlagringFormState = useFormSessionStorage(
    formStateKey,
    formState,
    methods.watch,
    methods.setValue,
    lesemodus,
    åpenForRedigering,
    getValues
  );

  const bekreftAksjonspunkt = ({
  begrunnelse,
  erSokerenAleneOmOmsorgen,
  fraDato,
  tilDato,
  avslagsArsakErPeriodeErIkkeOverSeksMån,
}) => {
    if (!errors.begrunnelse && !errors.fraDato && !errors.tilDato && !errors.erSokerenAleneOmOmsorgen) {
      losAksjonspunkt({
        begrunnelse,
        vilkarOppfylt: tekstTilBoolean(erSokerenAleneOmOmsorgen),
        fraDato: tekstTilBoolean(erSokerenAleneOmOmsorgen) ? fraDato.replaceAll('.', '-') : '',
        tilDato: tekstTilBoolean(erSokerenAleneOmOmsorgen) ? tilDato.replaceAll('.', '-') : ''
        // avslagsArsakErPeriodeErIkkeOverSeksMån: tekstTilBoolean(avslagsArsakErPeriodeErIkkeOverSeksMån)
      });
      setValue('åpenForRedigering', false);
      mellomlagringFormState.fjerneState();
    }
  };

  return (
    <div
      className={classNames(styles.vilkarMidlerTidigAlene, lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && styleLesemodus.lesemodusboks)}>
      {vedtakFattetVilkarOppfylt && <VilkarStatus
        vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
        aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
        vilkarReferanse={informasjonOmVilkar.vilkar}
        begrunnelse={informasjonOmVilkar.begrunnelse}
        erVilkaretForOmsorgenFor={false}
      />}

      {lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt &&
      <AleneOmOmsorgenLesemodus
        fraDatoFraSoknad={fraDatoFraSoknad}
        informasjonTilLesemodus={informasjonTilLesemodus}
        harAksjonspunktBlivitLostTidligare={aksjonspunktLost}
        åpneForRedigereInformasjon={() => setValue('åpenForRedigering', true)}
      />}

      {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
        <AlertStripeTrekantVarsel text={tekst.aksjonspunkt}/>

        <OpplysningerFraSoknad
          periodeTekst={'Fra dato oppgitt'}
          periode={fraDatoFraSoknad}
        />

        <FormProvider {...methods} >
          <form className={styles.form} onSubmit={handleSubmit(bekreftAksjonspunkt)}>

            <TextArea label={tekst.begrunnelse} name={'begrunnelse'}/>

            <div>
              <RadioGruppe className={styleRadioknapper.horisontalPlassering} legend={tekst.sporsmålVilkarOppfylt}>
                <RadioButtonWithBooleanValue label={'Ja'} value={'true'} name={'erSokerenAleneOmOmsorgen'}/>
                <RadioButtonWithBooleanValue label={'Nei'}
                                             value={'false'}
                                             name={'erSokerenAleneOmOmsorgen'}/>
              </RadioGruppe>
              {errors.erSokerenAleneOmOmsorgen && <p className="typo-feilmelding">{tekst.feilIngenVurdering}</p>}
            </div>

            {/* Utkommentert i väntan på funksjonellt beslutt om avslagsårsaker erSokerAleneOmOmsorgen !== null && erSokerAleneOmOmsorgen.length > 0 && !tekstTilBoolean(erSokerAleneOmOmsorgen) &&
            <div>
              <RadioGruppe
                className={classNames(styleRadioknapper.horisontalPlassering, styles.avslagsArsakErPeriodeErIkkeOverSeksMån)}
                legend={tekst.velgArsak}>
                <RadioButtonWithBooleanValue label={tekst.arsakIkkeAleneOmsorg}
                                             value={'false'}
                                             name={'avslagsArsakErPeriodeErIkkeOverSeksMån'}
                                             valideringsFunksjoner={erAvslagsArsakErPeriodeErIkkeOverSeksMånGyldig}/>
                <RadioButtonWithBooleanValue label={tekst.arsakPeriodeIkkeOverSeksMån}
                                             value={'true'}
                                             name={'avslagsArsakErPeriodeErIkkeOverSeksMån'}
                                             valideringsFunksjoner={erAvslagsArsakErPeriodeErIkkeOverSeksMånGyldig}/>
              </RadioGruppe>
              {errors.avslagsArsakErPeriodeErIkkeOverSeksMån &&
              <p className="typo-feilmelding">{tekst.feilIngenÅrsak}</p>}
            </div>*/
            }

            {tekstTilBoolean(erSokerAleneOmOmsorgen) &&
            <SkjemaGruppe className={styles.gyldigVedtaksPeriode}
                          legend={tekst.sporsmalPeriodeVedtakGyldig}
                          feil={errors.fraDato && errors.fraDato.type === 'erDatoFyltUt' && tekst.feilmedlingManglerFraDato
                          || errors.fraDato && errors.fraDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato
                          || errors.tilDato && errors.tilDato.type === 'erDatoFyltUt' && tekst.feilmeldingManglerTilDato
                          || errors.tilDato && errors.tilDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato}
            >

              <DatePicker titel={'Fra'}
                          navn={'fraDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig}}
              />

              <DatePicker titel={'Til'}
                          navn={'tilDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig}}
              />

            </SkjemaGruppe>
            }

            <Hovedknapp className={styles.bekreftKnapp} htmlType="submit"> {tekst.bekreftFortsettKnapp}</Hovedknapp>
          </form>
        </FormProvider>
      </>}
    </div>
  );
};
export default AleneOmOmsorgen;
