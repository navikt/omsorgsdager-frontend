import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxGruppe, CheckboxProps } from 'nav-frontend-skjema';

interface CheckboxGroupProps {
    question: string;
    name: string;
    checkboxes: CheckboxProps[];
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
}

const CheckboxGroup = ({ question, checkboxes, name, validators }: CheckboxGroupProps) => {
    const { control, errors } = useFormContext();
    return (
        <Controller
            control={control}
            defaultValue={[]}
            name={name}
            rules={{
                validate: {
                    ...validators,
                },
            }}
            render={({ name, value, onChange }) => {
                return (
                    <CheckboxGruppe legend={question} feil={errors[name]?.message}>
                        {checkboxes.map((checkboxProps) => (
                            <Checkbox
                                {...checkboxProps}
                                onChange={() => {
                                    const index = value.indexOf(checkboxProps.value);
                                    const newValue = [...value];
                                    if (index > -1) {
                                        newValue.splice(index, 1);
                                    } else {
                                        newValue.push(checkboxProps.value);
                                    }
                                    onChange(newValue);
                                }}
                                checked={value.indexOf(checkboxProps.value) >= 0}
                                key={'' + checkboxProps.value}
                            />
                        ))}
                    </CheckboxGruppe>
                );
            }}
        />
    );
};

export default CheckboxGroup;
