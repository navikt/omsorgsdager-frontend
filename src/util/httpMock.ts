import mockedTilsynsbehovVurderingsoversikt from '../mock/mockedTilsynsbehovVurderingsoversikt';
import mockedToOmsorgspersonerVurderingsoversikt from '../mock/mockedToOmsorgspersonerVurderingsoversikt';
import Vurderingsoversikt from '../types/Vurderingsoversikt';
import mockedDokumentoversikt from '../mock/mockedDokumentoversikt';
import Dokument, { Dokumentoversikt } from '../types/Dokument';
import mockedDokumentliste from '../mock/mockedDokumentliste';

export const hentTilsynsbehovVurderingsoversikt = (): Promise<Vurderingsoversikt> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockedTilsynsbehovVurderingsoversikt), 500));
};

export const hentToOmsorgspersonerVurderingsoversikt = (): Promise<Vurderingsoversikt> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockedToOmsorgspersonerVurderingsoversikt), 500));
};

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
