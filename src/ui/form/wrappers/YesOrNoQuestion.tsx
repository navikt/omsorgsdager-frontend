import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PureYesOrNoQuestion from '../pure/PureYesOrNoQuestion';

interface YesOrNoQuestionProps {
    question: string;
    name: string;
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
}

const YesOrNoQuestion = ({ question, name, validators }: YesOrNoQuestionProps) => {
    const { control, errors } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={null}
            rules={{
                validate: {
                    ...validators,
                },
            }}
            render={({ value, onChange }) => {
                return (
                    <PureYesOrNoQuestion
                        question={question}
                        name={name}
                        onChange={onChange}
                        value={value}
                        errorMessage={errors[name]?.message}
                    />
                );
            }}
        />
    );
};

export default YesOrNoQuestion;
