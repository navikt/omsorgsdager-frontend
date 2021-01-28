export interface VilkarKroniskSyktBarnProps {
    onSubmit: (
        harDokumentasjon: boolean,
        harSammenheng: boolean,
        begrunnelse: string
    ) => void;
}