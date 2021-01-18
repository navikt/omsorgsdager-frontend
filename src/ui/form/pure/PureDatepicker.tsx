import { Datepicker } from 'nav-datovelger';
import { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import { Label } from 'nav-frontend-skjema';
import * as React from 'react';
import Error from '../../components/error/Error';

interface CustomDatepickerProps {
    label: string;
    errorMessage?: string;
    ariaLabel?: string;
    inputId?: string;
}

const PureDatepicker = ({
    label,
    value,
    onChange,
    errorMessage,
    limitations,
    ariaLabel,
    inputId,
}: DatepickerProps & CustomDatepickerProps): JSX.Element => {
    const dayPickerProps = limitations?.minDate ? { initialMonth: new Date(limitations.minDate) } : undefined;

    return (
        <>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            <Datepicker
                onChange={onChange}
                value={value}
                inputProps={{
                    placeholder: 'dd.mm.åååå',
                    'aria-label': ariaLabel,
                }}
                limitations={limitations}
                dayPickerProps={dayPickerProps}
                inputId={inputId}
            />
            {errorMessage && <Error message={errorMessage} />}
        </>
    );
};

export default PureDatepicker;
