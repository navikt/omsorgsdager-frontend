import {Datepicker} from 'nav-datovelger';
import {DatepickerLimitations} from 'nav-datovelger/lib/types';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styles from '../vilkar-midlertidig-alene/vilkarMidlertidigAlene.less';

interface OwnProps{
  titel: string;
  navn: `${string}`;
  valideringsFunksjoner;
  begrensningerIKalender?: DatepickerLimitations;
}

const DatePicker: React.FunctionComponent<OwnProps> = ({titel, navn, valideringsFunksjoner, begrensningerIKalender}) => {
  const {control} = useFormContext();

  return(
    <div>
      <span className={styles.gyldigVedtaksPeriodeTilFra}>{titel}</span>
      <Controller
        control={control}
        name={navn}
        rules={{
          validate: valideringsFunksjoner
        }}
        render={({field: {onChange, value}}) => (
          <Datepicker onChange={onChange}
                      value={value}
                      limitations={begrensningerIKalender}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;