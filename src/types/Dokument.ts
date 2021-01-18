import { Period } from './Period';

export enum Dokumenttype {
    LEGEERKLÆRING = 'Legeerklæring',
    ANDRE_MEDISINSKE_OPPLYSNINGER = 'ANDRE_MEDISINSKE_OPPLYSNINGER',
    MANGLER_MEDISINSKE_OPPLYSNINGER = 'MANGLER_MEDISINSKE_OPPLYSNINGER',
}

export interface Dokument {
    id: string;
    navn: string;
    type: Dokumenttype;
    benyttet: boolean;
    annenPartErKilde: boolean;
    datert: Date;
    fremhevet: boolean;
    location?: string;
}

export interface DokumentMedMedisinskeOpplysninger extends Dokument {
    type: Dokumenttype.LEGEERKLÆRING | Dokumenttype.ANDRE_MEDISINSKE_OPPLYSNINGER;
    harGyldigSignatur: boolean;
    innleggelsesperioder: Period[];
}

export interface DokumentUtenMedisinskeOpplysninger extends Dokument {
    type: Dokumenttype.MANGLER_MEDISINSKE_OPPLYSNINGER;
}

export type StrukturertDokument = DokumentUtenMedisinskeOpplysninger | DokumentMedMedisinskeOpplysninger;

export interface Dokumentoversikt {
    dokumenterMedMedisinskeOpplysninger: DokumentMedMedisinskeOpplysninger[];
    dokumenterUtenMedisinskeOpplysninger: DokumentUtenMedisinskeOpplysninger[];
    ustrukturerteDokumenter: Dokument[];
}

export default Dokument;
