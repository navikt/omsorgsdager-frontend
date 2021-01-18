import mockedDokumentoversikt from '../mock/mockedDokumentoversikt';
import Dokument, { Dokumentoversikt } from '../types/Dokument';
import mockedDokumentliste from '../mock/mockedDokumentliste';

export const hentDokumenter = (): Promise<Dokument[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockedDokumentliste), 500));
};

export const hentDokumentoversikt = (): Promise<Dokumentoversikt> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockedDokumentoversikt), 500));
};

export const doDryRun = (): Promise<string> => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve('Alt i orden');
        }, 500)
    );
};
