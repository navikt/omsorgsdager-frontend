import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Dokument from '../../../types/Dokument';
import { Period } from '../../../types/Period';
import { Vurderingsversjon } from '../../../types/Vurdering';
import { getPeriodAsListOfDays } from '../../../util/dateUtils';
import { convertToInternationalPeriod } from '../../../util/formats';
import { finnHullIPerioder, finnMaksavgrensningerForPerioder } from '../../../util/periodUtils';
import { fomDatoErFørTomDato, harBruktDokumentasjon, required } from '../../form/validators';
import CheckboxGroup from '../../form/wrappers/CheckboxGroup';
import PeriodpickerList from '../../form/wrappers/PeriodpickerList';
import TextArea from '../../form/wrappers/TextArea';
import YesOrNoQuestion from '../../form/wrappers/YesOrNoQuestion';
import Box, { Margin } from '../box/Box';
import DetailView from '../detail-view/DetailView';
import DokumentLink from '../dokument-link/DokumentLink';
import Form from '../form/Form';
import styles from './nyVurderingAvToOmsorgspersonerForm.less';

export enum FieldName {
    VURDERING_AV_TO_OMSORGSPERSONER = 'vurderingAvToOmsorgspersoner',
    HAR_BEHOV_FOR_TO_OMSORGSPERSONER = 'harBehovForToOmsorgspersoner',
    PERIODER = 'perioder',
    DOKUMENTER = 'dokumenter',
}

export interface VurderingAvToOmsorgspersonerFormState {
    [FieldName.VURDERING_AV_TO_OMSORGSPERSONER]?: string;
    [FieldName.HAR_BEHOV_FOR_TO_OMSORGSPERSONER]?: boolean;
    [FieldName.PERIODER]?: Period[];
    [FieldName.DOKUMENTER]: string[];
}

interface VurderingAvToOmsorgspersonerFormProps {
    defaultValues: VurderingAvToOmsorgspersonerFormState;
    onSubmit: (nyVurdering: Vurderingsversjon) => void;
    resterendeVurderingsperioder?: Period[];
    perioderSomKanVurderes?: Period[];
    dokumenter: Dokument[];
}

const VurderingAvToOmsorgspersonerForm = ({
    defaultValues,
    onSubmit,
    resterendeVurderingsperioder,
    perioderSomKanVurderes,
    dokumenter,
}: VurderingAvToOmsorgspersonerFormProps): JSX.Element => {
    const formMethods = useForm({
        defaultValues,
        shouldUnregister: false,
    });

    const perioderSomBlirVurdert = formMethods.watch(FieldName.PERIODER);

    const harVurdertAlleDagerSomSkalVurderes = React.useMemo(() => {
        const dagerSomSkalVurderes = (resterendeVurderingsperioder || []).flatMap(getPeriodAsListOfDays);
        const dagerSomBlirVurdert = (perioderSomBlirVurdert || [])
            .map((period) => {
                if ((period as any).period) {
                    return (period as any).period;
                }
                return period;
            })
            .flatMap(getPeriodAsListOfDays);
        return dagerSomSkalVurderes.every((dagSomSkalVurderes) => dagerSomBlirVurdert.indexOf(dagSomSkalVurderes) > -1);
    }, [resterendeVurderingsperioder, perioderSomBlirVurdert]);

    const hullISøknadsperiodene = React.useMemo(
        () => finnHullIPerioder(perioderSomKanVurderes).map((periode) => convertToInternationalPeriod(periode)),
        [perioderSomKanVurderes]
    );

    const avgrensningerForSøknadsperiode = React.useMemo(
        () => finnMaksavgrensningerForPerioder(perioderSomKanVurderes),
        [perioderSomKanVurderes]
    );
    return (
        <DetailView title="Vurdering av to omsorgspersoner">
            <FormProvider {...formMethods}>
                <Form buttonLabel="Lagre og vurder resterende periode" onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <Box marginTop={Margin.large}>
                        <CheckboxGroup
                            question="Hvilke dokumenter er brukt i vurderingen av to omsorgspersoner?"
                            name={FieldName.DOKUMENTER}
                            checkboxes={dokumenter.map((dokument) => ({
                                value: dokument.id,
                                label: <DokumentLink dokument={dokument} />,
                            }))}
                            validators={{
                                harBruktDokumentasjon,
                            }}
                        />
                    </Box>
                    <Box marginTop={Margin.large}>
                        <TextArea
                            textareaClass={styles.begrunnelsesfelt}
                            name={FieldName.VURDERING_AV_TO_OMSORGSPERSONER}
                            label={
                                <b>
                                    Gjør en vurdering av om det er behov for to omsorgspersoner etter § 9-10, andre
                                    ledd.
                                </b>
                            }
                            validators={{ required }}
                        />
                    </Box>
                    <Box marginTop={Margin.large}>
                        <YesOrNoQuestion
                            question="Er det behov for to omsorgspersoner?"
                            name={FieldName.HAR_BEHOV_FOR_TO_OMSORGSPERSONER}
                            validators={{ required }}
                        />
                    </Box>
                    <Box marginTop={Margin.large}>
                        <PeriodpickerList
                            legend="Oppgi perioder"
                            name={FieldName.PERIODER}
                            defaultValues={defaultValues[FieldName.PERIODER] || []}
                            validators={{
                                required,
                                inngårISammenhengendePeriodeMedTilsynsbehov: (value: Period) => {
                                    const isOk = perioderSomKanVurderes.some((sammenhengendeSøknadsperiode) =>
                                        sammenhengendeSøknadsperiode.covers(value)
                                    );

                                    if (!isOk) {
                                        return 'Perioden som vurderes må være innenfor en eller flere sammenhengede perioder med behov for kontinuerlig tilsyn og pleie';
                                    }

                                    return true;
                                },
                                fomDatoErFørTomDato,
                            }}
                            fromDatepickerProps={{
                                label: 'Fra',
                                ariaLabel: 'fra',
                                limitations: {
                                    minDate: avgrensningerForSøknadsperiode?.fom || '',
                                    maxDate: avgrensningerForSøknadsperiode?.tom || '',
                                    invalidDateRanges: hullISøknadsperiodene,
                                },
                            }}
                            toDatepickerProps={{
                                label: 'Til',
                                ariaLabel: 'til',
                                limitations: {
                                    minDate: avgrensningerForSøknadsperiode?.fom || '',
                                    maxDate: avgrensningerForSøknadsperiode?.tom || '',
                                    invalidDateRanges: hullISøknadsperiodene,
                                },
                            }}
                        />
                    </Box>
                    {!harVurdertAlleDagerSomSkalVurderes && (
                        <Box marginTop={Margin.large}>
                            <AlertStripeAdvarsel>
                                Du har ikke vurdert alle periodene som må vurderes. Resterende perioder vurderer du
                                etter at du har lagret denne.
                            </AlertStripeAdvarsel>
                        </Box>
                    )}
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default VurderingAvToOmsorgspersonerForm;
