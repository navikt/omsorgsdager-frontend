import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import Box, { Margin } from '../box/Box';

interface FormProps {
    children: React.ReactNode;
    buttonLabel: string;
    onSubmit: () => void;
    shouldShowSubmitButton?: boolean;
}

const Form = ({ children, onSubmit, buttonLabel, shouldShowSubmitButton }: FormProps): JSX.Element => {
    return (
        <form onSubmit={onSubmit}>
            {children}
            {shouldShowSubmitButton !== false && (
                <Box marginTop={Margin.xLarge}>
                    <Hovedknapp>{buttonLabel}</Hovedknapp>
                </Box>
            )}
        </form>
    );
};
export default Form;
