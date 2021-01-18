import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { SkjemaGruppe, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { DatepickerLimitations } from 'nav-datovelger';
import Box, { Margin } from '../../components/box/Box';
import PlusIcon from '../../components/icons/PlusIcon';
import styles from './periodpickerList.less';
import { Period } from '../../../types/Period';
import PureDatepicker from '../pure/PureDatepicker';

const AddButton = ({ onClick }) => (
    <div className={styles.buttonAddContainer}>
        <PlusIcon />
        <button className={styles.buttonAdd} type="button" onClick={onClick}>
            Legg til flere perioder
        </button>
    </div>
);

const DeleteButton = ({ onClick }) => (
    <div className={styles.buttonDeleteContainer}>
        <button className={styles.buttonDelete} type="button" onClick={onClick}>
            Fjern periode
        </button>
    </div>
);

interface DatepickerProps {
    label?: string;
    ariaLabel?: string;
    limitations?: DatepickerLimitations;
}

interface PeriodpickerListProps {
    name: string;
    legend: string;
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
    defaultValues?: Period[];
    fromDatepickerProps: DatepickerProps;
    toDatepickerProps: DatepickerProps;
}

const PeriodpickerList = ({
    name,
    legend,
    validators,
    fromDatepickerProps,
    toDatepickerProps,
    defaultValues,
}: PeriodpickerListProps): JSX.Element => {
    const formMethods = useFormContext();
    const { control, errors } = formMethods;
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className={styles.periodpickerList}>
            <SkjemaGruppe legend={legend}>
                {fields.map((item, index) => {
                    const errorMessage = errors[name] && errors[name][index]?.period.message;
                    return (
                        <Box key={item.id} marginTop={Margin.medium}>
                            <div className={styles.flexContainer}>
                                <Controller
                                    name={`${name}[${index}].period`}
                                    rules={{ validate: { ...(validators || {}) } }}
                                    defaultValue={defaultValues && defaultValues[index]}
                                    render={({ value, onChange }) => {
                                        return (
                                            <>
                                                <PureDatepicker
                                                    {...fromDatepickerProps}
                                                    label={fromDatepickerProps.label}
                                                    ariaLabel={fromDatepickerProps.ariaLabel}
                                                    value={value?.fom || ''}
                                                    onChange={(fomValue) =>
                                                        onChange(new Period(fomValue, value?.tom || ''))
                                                    }
                                                    inputId={`${name}[${index}].fom`}
                                                />
                                                <div style={{ display: 'flex', marginLeft: '1rem' }}>
                                                    <PureDatepicker
                                                        {...toDatepickerProps}
                                                        label={toDatepickerProps.label}
                                                        ariaLabel={toDatepickerProps.ariaLabel}
                                                        value={value?.tom || ''}
                                                        onChange={(tomValue) =>
                                                            onChange(new Period(value?.fom || '', tomValue))
                                                        }
                                                        inputId={`${name}[${index}].tom`}
                                                    />
                                                </div>
                                            </>
                                        );
                                    }}
                                />
                                {fields.length > 1 && <DeleteButton onClick={() => remove(index)} />}
                            </div>
                            {errorMessage && <SkjemaelementFeilmelding>{errorMessage}</SkjemaelementFeilmelding>}
                        </Box>
                    );
                })}
            </SkjemaGruppe>
            <Box marginTop={Margin.large}>
                <AddButton onClick={() => append({ fom: '', tom: '' })} />
            </Box>
        </div>
    );
};

export default PeriodpickerList;
