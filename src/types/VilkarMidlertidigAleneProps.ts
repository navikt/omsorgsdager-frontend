export interface VilkarMidlertidigAleneProps {
  type: 'VilkarMidlertidigAlene',
  soknedsopplysninger: {
    årsak: string,
    beskrivelse?: string,
    periode: string
  },
  onSubmit: (
    vilkarOppfylt: boolean,
    dato: {
      til: string,
      fra: string
    },
    begrunnelse: string
  ) => void;
}