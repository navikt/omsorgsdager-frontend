import { Dokument, StrukturertDokument } from '../types/Dokument';
import {
    FieldName,
    StrukturerDokumentFormState,
} from '../ui/components/strukturer-dokument-form/StrukturerDokumentForm';
import { Period } from '../types/Period';

export const finnBenyttedeDokumenter = (benyttedeDokumentIder: string[], alleDokumenter: Dokument[]): Dokument[] => {
    return alleDokumenter.filter((dokument) => {
        return benyttedeDokumentIder.includes(dokument.id);
    });
};

export const lagStrukturertDokument = (
    formState: StrukturerDokumentFormState,
    dokument: Dokument
): StrukturertDokument => {
    const innleggelsesperioder = formState[FieldName.INNLEGGELSESPERIODER];
    const harInnleggelsesperioder = innleggelsesperioder && innleggelsesperioder.length > 0;

    return {
        type: formState[FieldName.INNEHOLDER_MEDISINSKE_OPPLYSNINGER],
        datert: formState[FieldName.DATERT],
        harGyldigSignatur: formState[FieldName.SIGNERT_AV_SYKEHUSLEGE_ELLER_LEGE_I_SPESIALISTHELSETJENESTEN] === true,
        innleggelsesperioder: harInnleggelsesperioder
            ? formState[FieldName.INNLEGGELSESPERIODER].map((periodeWrapper) => {
                  return new Period((periodeWrapper as any).period.fom, (periodeWrapper as any).period.tom);
              })
            : [],
        ...dokument,
    };
};
