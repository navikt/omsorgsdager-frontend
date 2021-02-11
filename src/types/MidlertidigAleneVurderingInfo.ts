import {VilkarMidlertidigAleneDato} from "./VilkarMidlertidigAleneProps";

export default interface MidlertidigAleneVurderingInfo {
  vilkarOppfylt: boolean;
  dato: VilkarMidlertidigAleneDato;
  begrunnelse: string;
}

export interface VilkarMidlertidigAleneDato {
  til: string;
  fra: string;
}
