import {Hovedknapp} from 'nav-frontend-knapper';
import {RadioGruppe} from 'nav-frontend-skjema';
import React from 'react';
import {KorrigerePerioderProps} from '../../../types/KorrigerePerioderProps';
import {booleanTilTekst} from '../../../util/stringUtils';
import useFormPersist from '../../../util/useFormPersistUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import RadioButtonWithBooleanValue from '../react-hook-form-wrappers/RadioButton';
import TextArea from '../react-hook-form-wrappers/TextArea';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import styles from './korrigerePerioder.less';
import {FormProvider, useForm} from 'react-hook-form';


type FormData = {
  fravaerGrunnetSmittevernhensynEllerStengt: string;
  begrunnelse: string;
  åpenForRedigering: boolean;
};

const KorrigerePerioder: React.FunctionComponent<KorrigerePerioderProps> = ({
  behandlingsID,
  aksjonspunktLost,
  informasjonTilLesemodus,
  losAksjonspunkt,
  lesemodus,
  årsakFraSoknad
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      begrunnelse: aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '',
      fravaerGrunnetSmittevernhensynEllerStengt: aksjonspunktLost ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : '',
      åpenForRedigering: false
    }
  });

  const {handleSubmit, formState: {errors}, watch, setValue} = methods;
  const åpenForRedigering = watch('åpenForRedigering');

  const persistedFormData = useFormPersist(
    `${behandlingsID}-steg-saerlig-smittevern`,
    methods.watch,
    methods.setValue,
    {
      storage: window.sessionStorage
    },
    lesemodus,
    åpenForRedigering
  );

  const bekreftAksjonspunkt = data => {
    if (!errors.begrunnelse && !errors.fravaerGrunnetSmittevernhensynEllerStengt) {
      losAksjonspunkt(data.fravaerGrunnetSmittevernhensynEllerStengt, data.begrunnelse);
      persistedFormData.clear();
    }
  };

  const tekst = {
    instruksjon: 'Se på nødvendig dokumentasjon og tidligere utbetalte perioder, og vurder om søker har rett på å få utbetalt flere dager.',
    sporsmalErInnvilget: 'Har søker rett på å få utbetalt flere dager?',
    begrunnelse: 'Vurder om søker har rett på å få utbetalt flere dager',
    feilIngenVurdering: 'Resultat må oppgis.'
  };

  if (lesemodus && !åpenForRedigering) {
    return <div className={styleLesemodus.lesemodusboks}>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={aksjonspunktLost}
        åpneForRedigereInformasjon={() => setValue('åpenForRedigering', true)}
      />
      <p className={styleLesemodus.label}>{tekst.sporsmalErInnvilget}</p>
      <p className={styleLesemodus.text}>{informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{informasjonTilLesemodus.begrunnelse}</p>
    </div>;
  }

  return <div className={styles.korrigerePerioder}>
    <AlertStripeTrekantVarsel text={tekst.instruksjon}/>

    <div className={styles.opplysningerFraSoknad}>
      <div>Opplysninger fra sist innsendte søknad:</div>
      <h4>Oppgitt årsak</h4>
      <p>{årsakFraSoknad}</p>
    </div>

    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(bekreftAksjonspunkt)}>
        <TextArea label={tekst.begrunnelse} name={'begrunnelse'}/>

          <RadioGruppe
            legend={tekst.sporsmalErInnvilget}
            className={styleRadioknapper.horisontalPlassering}
          >
            <RadioButtonWithBooleanValue label={'Ja'}
                                         value={'true'}
                                         name={'fravaerGrunnetSmittevernhensynEllerStengt'}/>
            <RadioButtonWithBooleanValue label={'Nei'}
                                         value={'false'}
                                         name={'fravaerGrunnetSmittevernhensynEllerStengt'}/>
          </RadioGruppe>
          {errors.fravaerGrunnetSmittevernhensynEllerStengt &&
          <p className="typo-feilmelding">{tekst.feilIngenVurdering}</p>}

        <Hovedknapp className={styles.knapp} htmlType="submit">Bekreft og fortsett</Hovedknapp>
      </form>
    </FormProvider>
  </div>;
};
export default KorrigerePerioder;
