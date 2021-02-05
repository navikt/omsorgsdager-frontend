export interface VilkarMidlertidigAleneProps {
  type: 'VilkarMidlertidigAlene',
  soknedsopplysninger: {
    årsak: string;
    beskrivelse?: string;
    periode: string;
  },
  onSubmit: (
    vilkarOppfylt: boolean,
    dato: VilkarMidlertidigAleneDato,
    begrunnelse: string
  ) => void;
}

export interface VilkarMidlertidigAleneDato {
    til: string;
    fra: string;
}