import {VilkarKroniskSyktBarnProps} from "./VilkarKroniskSyktBarnProps";
import {VilkarMidlertidigAleneProps} from "./VilkarMidlertidigAleneProps";

interface ContainerContract {
  visKomponent: string;
  props?: VilkarKroniskSyktBarnProps | VilkarMidlertidigAleneProps;
}

export default ContainerContract;
