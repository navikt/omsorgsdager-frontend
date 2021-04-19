import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {booleanTilTekst, tekstTilBoolean} from '../../../util/stringUtils';
import useFormPersist from '../../../util/useFormPersistUtils';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import {RadioGruppe, SkjemaGruppe} from 'nav-frontend-skjema';
import React, {useEffect, useState} from 'react';
import DatePicker from '../react-hook-form-wrappers/DatePicker';
import RadioButtonWithBooleanValue from '../react-hook-form-wrappers/RadioButton';
import TextArea from '../react-hook-form-wrappers/TextArea';
import styles from './vilkarMidlertidigAlene.less';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import {tekst} from './vilkar-midlertidig-alene-tekst';
import {VilkarMidlertidigAleneProps} from '../../../types/VilkarMidlertidigAleneProps';
import VilkarMidlertidigAleneLesemodus from '../vilkar-midlertidig-alene-lesemodus/VilkarMidlertidigAleneLesemodus';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import {FormProvider, useForm} from 'react-hook-form';

type FormData = {
  begrunnelse: string;
  fraDato: string;
  tilDato: string;
  erSokerenMidlertidigAleneOmOmsorgen: string;
  avslagsArsakErPeriodeErIkkeOverSeksMån: string;
};

const hanteringAvDatoForDatoVelger = (soknadsdato) => {
  const antallÅrFramITid = 10;
  const maxDato = new Date(soknadsdato);
  maxDato.setFullYear(maxDato.getFullYear() + antallÅrFramITid);

  const startDato = new Date(maxDato.getFullYear() - antallÅrFramITid, 12, 1);
  const invalidDateRanges = [];

  for (let i = 0; i < antallÅrFramITid; i++) {
    invalidDateRanges.push(
      {
        from: `${(startDato.getFullYear() + i).toString()}-01-01`,
        to: `${(startDato.getFullYear() + i).toString()}-12-30`,
      }
    );
  }

  return {
    invalidDateRanges: invalidDateRanges,
    minDate: startDato.toISOString().substring(0, 10),
    maxDate: maxDato.toISOString().substring(0, 10),
  };
};

const VilkarMidlertidigAlene: React.FunctionComponent<VilkarMidlertidigAleneProps> = ({
  behandlingsID,
  aksjonspunktLost,
  lesemodus,
  soknadsopplysninger,
  informasjonTilLesemodus,
  vedtakFattetVilkarOppfylt,
  informasjonOmVilkar,
  losAksjonspunkt
}) => {
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);

  const methods = useForm<FormData>({
    defaultValues: {
      begrunnelse: aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '',
      fraDato: aksjonspunktLost ? informasjonTilLesemodus.dato.fra : 'dd.mm.åååå',
      tilDato: aksjonspunktLost ? informasjonTilLesemodus.dato.til : 'dd.mm.åååå',
      erSokerenMidlertidigAleneOmOmsorgen: aksjonspunktLost ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : 'true',
      avslagsArsakErPeriodeErIkkeOverSeksMån: aksjonspunktLost ? booleanTilTekst(informasjonTilLesemodus.avslagsArsakErPeriodeErIkkeOverSeksMån) : 'false'
    }
  });

  const {formState: {errors}, formState, handleSubmit, getValues, watch, unregister, register} = methods;
  const sokerenMidlertidigAleneOmOmsorgen = watch('erSokerenMidlertidigAleneOmOmsorgen');
  const erDatoFyltUt = dato => dato.toLowerCase() !== 'dd.mm.åååå' && dato !== '' && tekstTilBoolean(sokerenMidlertidigAleneOmOmsorgen);
  const erDatoSisteDagenIÅret = dato => dato.substr(5, 5) === '12-31' && tekstTilBoolean(sokerenMidlertidigAleneOmOmsorgen);
  const erDatoGyldig = dato => {

    const år = parseInt(dato.substr(0, 4));
    const måned = parseInt(dato.substr(5, 2)) - 1;
    const dag = parseInt(dato.substr(8, 2));
    const parsedDato = new Date(år, måned, dag);

    if (parsedDato.getDate() === dag) {
      return true;
    }
    return false;
  };

  const persistedFormData = useFormPersist(
    `${behandlingsID}-steg-midlertidig-alene`,
    methods.watch,
    methods.setValue,
    {
      storage: window.sessionStorage
    }
  );

  useEffect(() => {
    if (!tekstTilBoolean(sokerenMidlertidigAleneOmOmsorgen)) {
      unregister('fraDato', {keepValue: true});
      unregister('tilDato', {keepValue: true});
    } else {
      register('fraDato');
      register('tilDato');
    }
  }, [sokerenMidlertidigAleneOmOmsorgen]);


  const bekreftAksjonspunkt = ({
    begrunnelse,
    erSokerenMidlertidigAleneOmOmsorgen,
    avslagsArsakErPeriodeErIkkeOverSeksMån,
    fraDato,
    tilDato
  }) => {
    if (formState.isValid) {
      losAksjonspunkt({
        begrunnelse,
        erSokerenMidlertidigAleneOmOmsorgen: tekstTilBoolean(erSokerenMidlertidigAleneOmOmsorgen),
        fra: tekstTilBoolean(erSokerenMidlertidigAleneOmOmsorgen) ? fraDato.replaceAll('.', '-') : '',
        til: tekstTilBoolean(erSokerenMidlertidigAleneOmOmsorgen) ? tilDato.replaceAll('.', '-') : '',
        avslagsArsakErPeriodeErIkkeOverSeksMån: tekstTilBoolean(avslagsArsakErPeriodeErIkkeOverSeksMån)
      });
      persistedFormData.clear();
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
      <VilkarMidlertidigAleneLesemodus
        soknadsopplysninger={soknadsopplysninger}
        informasjonTilLesemodus={informasjonTilLesemodus}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => endreÅpenForRedigering(true)}
      />}

      {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
        <AlertStripeTrekantVarsel text={tekst.aksjonspunkt}/>

        <OpplysningerFraSoknad {...soknadsopplysninger}/>

        <FormProvider {...methods} >
          <form className={styles.form} onSubmit={handleSubmit(bekreftAksjonspunkt)}>

            <TextArea label={tekst.begrunnelse} name={'begrunnelse'}/>

            <RadioGruppe className={styles.radioButtons} legend={tekst.sporsmålVilkarOppfylt}>
              <RadioButtonWithBooleanValue label={'Ja'} value={'true'} name={'erSokerenMidlertidigAleneOmOmsorgen'}/>
              <RadioButtonWithBooleanValue label={'Nei'} value={'false'} name={'erSokerenMidlertidigAleneOmOmsorgen'}/>
            </RadioGruppe>

            {!tekstTilBoolean(sokerenMidlertidigAleneOmOmsorgen) &&
            <RadioGruppe className={styles.radioButtons} legend={tekst.velgArsak}>
              <RadioButtonWithBooleanValue label={tekst.arsakIkkeAleneOmsorg}
                                           value={'false'}
                                           name={'avslagsArsakErPeriodeErIkkeOverSeksMån'}/>
              <RadioButtonWithBooleanValue label={tekst.arsakPeriodeIkkeOverSeksMån}
                                           value={'true'}
                                           name={'avslagsArsakErPeriodeErIkkeOverSeksMån'}/>
            </RadioGruppe>
            }

            {tekstTilBoolean(getValues().erSokerenMidlertidigAleneOmOmsorgen) &&
            <SkjemaGruppe className={styles.gyldigVedtaksPeriode}
                          legend={tekst.sporsmalPeriodeVedtakGyldig}
                          feil={errors.fraDato && errors.fraDato.type === 'erDatoFyltUt' && tekst.feilmedlingManglerFraDato
                          || errors.fraDato && errors.fraDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato
                          || errors.tilDato && errors.tilDato.type === 'erDatoFyltUt' && tekst.feilmeldingManglerTilDato
                          || errors.tilDato && errors.tilDato.type === 'erDatoSisteDagenIÅret' && tekst.feilmedlingFeilDato
                          || errors.tilDato && errors.tilDato.type === 'erDatoGyldig' && tekst.feilmedlingUgyldigDato}
            >

              <DatePicker titel={'Fra'}
                          navn={'fraDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig}}
                          begrensningerIKalender={{
                            minDate: soknadsopplysninger.soknadsdato,
                          }}
              />

              <DatePicker titel={'Til'}
                          navn={'tilDato'}
                          valideringsFunksjoner={{erDatoFyltUt, erDatoGyldig, erDatoSisteDagenIÅret}}
                          begrensningerIKalender={hanteringAvDatoForDatoVelger(soknadsopplysninger.soknadsdato)}
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
export default VilkarMidlertidigAlene;
