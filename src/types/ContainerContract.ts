import Komponenter from './Komponenter';
import {VilkarKroniskSyktBarnProps} from './VilkarKroniskSyktBarnProps';
import {VilkarMidlertidigAleneProps} from './VilkarMidlertidigAleneProps';

interface KorrigerePerioderContract {
  visKomponent: Komponenter.KORRIGERE_PERIODER;
}

interface VilkarMidlertidigAleneContract {
  visKomponent: Komponenter.VILKAR_MIDLERTIDIG_ALENE;
  props: VilkarMidlertidigAleneProps;
}

interface VilkarKroniskSyktBarnContract {
  visKomponent: Komponenter.VILKAR_KRONISK_SYKT_BARN;
  props: VilkarKroniskSyktBarnProps;
}

type ContainerContract =
  KorrigerePerioderContract |
  VilkarMidlertidigAleneContract |
  VilkarKroniskSyktBarnContract;

export default ContainerContract;
