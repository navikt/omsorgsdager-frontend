import { RadioPanelGruppe as RadioPanelGroup } from 'nav-frontend-skjema';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface RadioProps {
    value: string;
    label: string;
}

interface RadioGroupPanelProps {
    question: string;
    name: string;
    radios: RadioProps[];
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
    onChange?: (value) => void;
}

const RadioGroupPanel = ({ question, name, validators, radios, onChange }: RadioGroupPanelProps) => {
    const { control, errors } = useFormContext();
    const customOnChange = onChange;
    return (
        <Controller
            control={control}
            defaultValue={null}
            name={name}
            rules={{
                validate: {
                    ...validators,
                },
            }}
            render={(props) => {
                const reactHookFormOnChange = props.onChange;
                return (
                    <RadioPanelGroup
                        legend={question}
                        name={name}
                        onChange={(event, newValue) => {
                            if (customOnChange) {
                                customOnChange(newValue);
                            }
                            reactHookFormOnChange(newValue);
                        }}
                        radios={radios}
                        checked={props.value}
                        feil={errors[name]?.message}
                    />
                );
            }}
        />
    );
};

export default RadioGroupPanel;
