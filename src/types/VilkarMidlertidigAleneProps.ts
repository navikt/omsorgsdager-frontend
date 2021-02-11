export interface VilkarMidlertidigAleneProps {
  behandlingsid: string;
  lesemodus?: boolean;
  stiTilEndepunkt: string;
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