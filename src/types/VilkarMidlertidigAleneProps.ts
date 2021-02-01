export interface VilkarMidlertidigAleneProps {
  onSubmit: (
    vilkarOppfylt: boolean,
    dato: {
      til: string,
      fra: string
    },
    begrunnelse: string
  ) => void;
}