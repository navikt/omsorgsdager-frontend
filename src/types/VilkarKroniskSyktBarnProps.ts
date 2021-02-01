export interface VilkarKroniskSyktBarnProps {
  type: 'VilkarKroniskSyktBarn',
  onSubmit: (
    harDokumentasjon: boolean,
    harSammenheng: boolean,
    begrunnelse: string
  ) => void;
}