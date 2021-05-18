import {Hovedknapp} from 'nav-frontend-knapper';
import {RadioGruppe} from 'nav-frontend-skjema';
import React from 'react';
import {KorrigerePerioderProps} from '../../../types/KorrigerePerioderProps';
import {booleanTilTekst} from '../../../util/stringUtils';
import useFormSessionStorage from '../../../util/useFormSessionStorageUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import RadioButtonWithBooleanValue from '../react-hook-form-wrappers/RadioButton';
import TextArea from '../react-hook-form-wrappers/TextArea';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';
import styles from './korrigerePerioder.less';
import {FormProvider, useForm} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type FormData = {
  fravaerGrunnetSmittevernhensynEllerStengt: string;
  begrunnelse: string;
  åpenForRedigering: boolean;
};

const tekst = {
  instruksjon: 'Se på nødvendig dokumentasjon og tidligere utbetalte perioder, og vurder om søker har rett på å få utbetalt flere dager.',
  sporsmalErInnvilget: 'Har søker rett på å få utbetalt flere dager?',
  begrunnelse: 'Vurder om søker har rett på å få utbetalt flere dager',
  feilIngenVurdering: 'Resultat må oppgis.'
};

const KorrigerePerioder: React.FunctionComponent<KorrigerePerioderProps> = ({
  behandlingsID,
  aksjonspunktLost,
  informasjonTilLesemodus,
  losAksjonspunkt,
  lesemodus,
  årsakerFraSoknad,
  formState
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      begrunnelse: aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '',
      fravaerGrunnetSmittevernhensynEllerStengt: aksjonspunktLost ? booleanTilTekst(informasjonTilLesemodus.vilkarOppfylt) : '',
      åpenForRedigering: false
    }
  });

  const {handleSubmit, formState: {errors}, watch, setValue, getValues} = methods;
  const åpenForRedigering = watch('åpenForRedigering');
  const formStateKey = `${behandlingsID}-saerlig-smittevern`;

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
    if (!errors.begrunnelse && !errors.fravaerGrunnetSmittevernhensynEllerStengt) {
      losAksjonspunkt(data.fravaerGrunnetSmittevernhensynEllerStengt, data.begrunnelse);
      setValue('åpenForRedigering', false);
      mellomlagringFormState.fjerneState();
    }
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

    {årsakerFraSoknad.length > 0 && <div className={styles.opplysningerFraSoknad}>
      <div>Opplysninger fra innsendte søknader:</div>
      <h4>Oppgitte årsaker</h4>
      {årsakerFraSoknad.map(årsak => <p key={uuidv4()}>{årsak}</p>)}
    </div>}

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
