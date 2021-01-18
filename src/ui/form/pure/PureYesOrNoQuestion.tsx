import React from 'react';
import { RadioPanelGruppe as RadioPanelGroup } from 'nav-frontend-skjema';

interface YesOrNoQuestionProps {
    question: string;
    value: boolean;
    onChange: (value) => void;
    name: string;
    errorMessage?: string;
}

enum YesOrNo {
    YES = 'YES',
    NO = 'NO',
}

const resolveYesOrNoLiteral = (value: boolean | undefined) => {
    if (value === true) {
        return YesOrNo.YES;
    }
    if (value === false) {
        return YesOrNo.NO;
    }
    return undefined;
};

const PureYesOrNoQuestion = ({
    question,
    value,
    onChange,
    name,
    errorMessage,
}: YesOrNoQuestionProps) => (
    <RadioPanelGroup
        legend={question}
        name={name}
        checked={resolveYesOrNoLiteral(value)}
        onChange={(event, value) => onChange(value === YesOrNo.YES)}
        radios={[
            { label: 'Ja', value: YesOrNo.YES },
            { label: 'Nei', value: YesOrNo.NO },
        ]}
        feil={errorMessage}
    />
);

export default PureYesOrNoQuestion;
