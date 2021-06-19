import {Datepicker} from 'nav-datovelger';
import {DatepickerLimitations} from 'nav-datovelger/lib/types';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

interface OwnProps {
  titel: string;
  navn: `${string}`;
  valideringsFunksjoner;
  begrensningerIKalender?: DatepickerLimitations;
}

const DatePicker: React.FunctionComponent<OwnProps> = ({
  titel,
  navn,
  valideringsFunksjoner,
  begrensningerIKalender
}) => {
  const {control} = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={navn}
        rules={{
          validate: valideringsFunksjoner
        }}
        render={({field: {onChange, value}}) => (
          <label> {titel.length > 0 && <span>{titel}</span>}
            <Datepicker onChange={onChange}
                        value={value}
                        limitations={begrensningerIKalender}
            />
          </label>
        )}
      />
    </div>
  );
};

export default DatePicker;