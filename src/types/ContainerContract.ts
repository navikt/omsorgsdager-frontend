import Komponenter from './Komponenter';
import {KorrigerePerioderProps} from './KorrigerePerioderProps';
import {VilkarKroniskSyktBarnProps} from './VilkarKroniskSyktBarnProps';
import {VilkarMidlertidigAleneProps} from './VilkarMidlertidigAleneProps';

interface KorrigerePerioderContract {
  visKomponent: Komponenter.KORRIGERE_PERIODER;
  props: KorrigerePerioderProps;
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
