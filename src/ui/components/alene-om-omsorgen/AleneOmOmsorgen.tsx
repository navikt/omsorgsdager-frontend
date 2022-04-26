import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {AleneOmOmsorgenProps} from '../../../types/AleneOmOmsorgenProps';
import {booleanTilTekst, formatereDato, formatereDatoTilLesemodus, tekstTilBoolean} from '../../../util/stringUtils';
import useFormSessionStorage from '../../../util/useFormSessionStorageUtils';
import {valideringsFunksjoner} from '../../../util/validationReactHookFormUtils';
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
  åpenForRedigering: boolean;
};

const AleneOmOmsorgen: React.FunctionComponent<AleneOmOmsorgenProps> = ({
  behandlingsID,
  aksjonspunktLost,
  lesemodus,
  fraDatoFraSoknad,
  informasjonTilLesemodus,
  vedtakFattetVilkarOppfylt,
  erBehandlingstypeRevurdering,
  informasjonOmVilkar,
  losAksjonspunkt,
  formState
}) => {
  const formStateKey = `${behandlingsID}-utvidetrett-alene-om-omsorgen`;
  const harAksjonspunktOgVilkarLostTidligere = informasjonTilLesemodus?.fraDato.length > 0 && informasjonTilLesemodus?.begrunnelse.length > 0;

  const methods = useForm<FormData>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      begrunnelse: harAksjonspunktOgVilkarLostTidligere ? informasjonTilLesemodus.begrunnelse : '',
      fraDato: harAksjonspunktOgVilkarLostTidligere ? formatereDato(informasjonTilLesemodus.fraDato) : 'dd.mm.åååå',
      tilDato: harAksjonspunktOgVilkarLostTidligere ? formatereDato(informasjonTilLesemodus.tilDato) : 'dd.mm.åååå',
      erSokerenAleneOmOmsorgen: harAksjonspunktOgVilkarLostTidligere ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : '',
      åpenForRedigering: false
    }
  });

  const {formState: {errors}, getValues, handleSubmit, watch, setValue} = methods;
  const erSokerAleneOmOmsorgen = watch('erSokerenAleneOmOmsorgen');
  const åpenForRedigering = watch('åpenForRedigering');
  const {
    erDatoFyltUt,
    erDatoGyldig,
  } = valideringsFunksjoner(getValues, 'erSokerenAleneOmOmsorgen');

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
}) => {
    if (!errors.begrunnelse && !errors.fraDato && !errors.erSokerenAleneOmOmsorgen && !erBehandlingstypeRevurdering || !errors.begrunnelse && !errors.fraDato && !errors.tilDato && !errors.erSokerenAleneOmOmsorgen && erBehandlingstypeRevurdering) {
      losAksjonspunkt({
        begrunnelse,
        vilkarOppfylt: tekstTilBoolean(erSokerenAleneOmOmsorgen),
        fraDato: tekstTilBoolean(erSokerenAleneOmOmsorgen) ? fraDato.replaceAll('.', '-') : '',
        tilDato: tekstTilBoolean(erSokerenAleneOmOmsorgen) ? tilDato.replaceAll('.', '-') : ''
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
        periode={informasjonOmVilkar.periode}
      />}

      {lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt &&
      <AleneOmOmsorgenLesemodus
        fraDatoFraSoknad={fraDatoFraSoknad}
        informasjonTilLesemodus={informasjonTilLesemodus}
        harAksjonspunktBlivitLostTidligare={aksjonspunktLost}
        åpneForRedigereInformasjon={() => setValue('åpenForRedigering', true)}
        erBehandlingstypeRevurdering={erBehandlingstypeRevurdering}
      />}

      {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
        <AlertStripeTrekantVarsel text={tekst.aksjonspunkt}/>

        <OpplysningerFraSoknad
          periodeTekst={'Fra dato oppgitt'}
          periode={formatereDatoTilLesemodus(fraDatoFraSoknad)}
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

            {tekstTilBoolean(erSokerAleneOmOmsorgen) &&
            <SkjemaGruppe className={erBehandlingstypeRevurdering ? styles.gyldigVedtaksPeriode : styles.gyldigVedtaksPeriode_forstegangsbehandling_aleneOmOmsorgen}
                          legend={tekst.sporsmalPeriodeVedtakGyldig}
                          feil={errors.fraDato && errors.fraDato.type === 'erDatoFyltUt' && tekst.feilmedlingManglerFraDato
                          || errors.fraDato && errors.fraDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato
                          || erBehandlingstypeRevurdering && errors.tilDato && errors.tilDato.type === 'erDatoFyltUt' && tekst.feilmeldingManglerTilDato
                          || erBehandlingstypeRevurdering && errors.tilDato && errors.tilDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato}
            >

              <DatePicker titel={'Fra'}
                          navn={'fraDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig}}
              />


              {erBehandlingstypeRevurdering && <DatePicker titel={'Til'}
                          navn={'tilDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig}}
              />}

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
