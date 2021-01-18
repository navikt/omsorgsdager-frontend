import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailView from '../detail-view/DetailView';
import RadioGroupPanel from '../../form/wrappers/RadioGroupPanel';
import Form from '../form/Form';
import Datepicker from '../../form/wrappers/Datepicker';
import Box, { Margin } from '../box/Box';
import YesOrNoQuestion from '../../form/wrappers/YesOrNoQuestion';
import PeriodpickerList from '../../form/wrappers/PeriodpickerList';
import PeriodWrapper from '../../form/types/PeriodWrapper';
import { required } from '../../form/validators';
import { Dokument, Dokumenttype } from '../../../types/Dokument';
import { lagStrukturertDokument } from '../../../util/dokumentUtils';

export enum FieldName {
    INNEHOLDER_MEDISINSKE_OPPLYSNINGER = 'inneholderMedisinskeOpplysninger',
    DATERT = 'datert',
    SIGNERT_AV_SYKEHUSLEGE_ELLER_LEGE_I_SPESIALISTHELSETJENESTEN = 'signertAvSykehuslegeEllerLegeISpesialisthelsetjenesten',
    INNLEGGELSESPERIODER = 'innleggelsesperioder',
}

export interface StrukturerDokumentFormState {
    [FieldName.INNEHOLDER_MEDISINSKE_OPPLYSNINGER]?: Dokumenttype;
    [FieldName.DATERT]: string;
    [FieldName.SIGNERT_AV_SYKEHUSLEGE_ELLER_LEGE_I_SPESIALISTHELSETJENESTEN]?: boolean;
    [FieldName.INNLEGGELSESPERIODER]: PeriodWrapper[];
}

interface StrukturerDokumentFormProps {
    dokument: Dokument;
    onSubmit: (nyttDokument: Dokument) => void;
}

const StrukturerDokumentForm = ({ dokument, onSubmit }: StrukturerDokumentFormProps) => {
    const formMethods = useForm<StrukturerDokumentFormState>({
        defaultValues: {
            innleggelsesperioder: [{ period: { fom: '', tom: '' } }],
        },
    });

    const inneholderMedisinskeOpplysninger = formMethods.watch(FieldName.INNEHOLDER_MEDISINSKE_OPPLYSNINGER);

    const dokumentetErEnLegeerklæring = inneholderMedisinskeOpplysninger === Dokumenttype.LEGEERKLÆRING;
    const dokumentetHarMedisinskeOpplysninger =
        dokumentetErEnLegeerklæring || inneholderMedisinskeOpplysninger === Dokumenttype.ANDRE_MEDISINSKE_OPPLYSNINGER;

    const lagNyttStrukturertDokument = (formState: StrukturerDokumentFormState) => {
        onSubmit(lagStrukturertDokument(formState, dokument));
    };

    return (
        <DetailView title={`Håndter nytt dokument ("${dokument.name}")`}>
            <FormProvider {...formMethods}>
                <Form
                    buttonLabel="Lagre"
                    onSubmit={formMethods.handleSubmit((formState) => lagNyttStrukturertDokument(formState))}
                >
                    <Box marginTop={Margin.large}>
                        <RadioGroupPanel
                            name={FieldName.INNEHOLDER_MEDISINSKE_OPPLYSNINGER}
                            question="Inneholder dokumentet medisinske opplysninger?"
                            radios={[
                                {
                                    label: 'Ja, legeerklæring',
                                    value: Dokumenttype.LEGEERKLÆRING,
                                },
                                {
                                    label: 'Ja, andre medisinske opplysninger (f.eks. ...)',
                                    value: Dokumenttype.ANDRE_MEDISINSKE_OPPLYSNINGER,
                                },
                                {
                                    label: 'Dokumentet inneholder ikke medisinske opplysninger',
                                    value: Dokumenttype.MANGLER_MEDISINSKE_OPPLYSNINGER,
                                },
                            ]}
                            validators={{ required }}
                        />
                    </Box>
                    {dokumentetHarMedisinskeOpplysninger && (
                        <Box marginTop={Margin.large}>
                            <Datepicker
                                name={FieldName.DATERT}
                                label="Hvilken dato er dokumentet datert?"
                                defaultValue=""
                                validators={{ required }}
                            />
                        </Box>
                    )}
                    {dokumentetErEnLegeerklæring && (
                        <Box marginTop={Margin.large}>
                            <YesOrNoQuestion
                                name={FieldName.SIGNERT_AV_SYKEHUSLEGE_ELLER_LEGE_I_SPESIALISTHELSETJENESTEN}
                                question="Er dokumentet signert av en sykehuslege eller en lege i spesialisthelsetjenesten?"
                                validators={{ required }}
                            />
                        </Box>
                    )}
                    {dokumentetHarMedisinskeOpplysninger && (
                        <Box marginTop={Margin.large}>
                            <PeriodpickerList
                                name={FieldName.INNLEGGELSESPERIODER}
                                legend="Periode for eventuelle innleggelser"
                                fromDatepickerProps={{
                                    label: 'Fra',
                                    ariaLabel: 'fra',
                                }}
                                toDatepickerProps={{
                                    label: 'Til',
                                    ariaLabel: 'til',
                                }}
                            />
                        </Box>
                    )}
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default StrukturerDokumentForm;
