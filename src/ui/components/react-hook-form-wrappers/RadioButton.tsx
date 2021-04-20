import {Radio} from 'nav-frontend-skjema';
import React from 'react';
import {useFormContext} from 'react-hook-form';

interface OwnProps{
  label: string;
  value: string;
  name: `${string}`;
}

const RadioButtonWithBooleanValue: React.FunctionComponent<OwnProps> = ({label, value, name}) => {
  const { register} = useFormContext();
  const radio = register(name, {required: true});

  return(
    <Radio label={label}
           value={value}
           name={radio.name}
           onChange={radio.onChange}
           onBlur={radio.onBlur}
           radioRef={radio.ref}
    />
  );
};

export default RadioButtonWithBooleanValue;