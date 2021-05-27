import React from 'react';
import ContainerContract from '../types/ContainerContract';
import Komponenter from '../types/Komponenter';
import KorrigerePerioder from '../ui/components/korrigere-perioder/KorrigerePerioder';
import Omsorg from '../ui/components/omsorg/Omsorg';
import VilkarKroniskSyktBarn from '../ui/components/vilkar-kronisk-sykt-barn/VilkarKroniskSyktBarn';
import AleneOmOmsorgen from './components/alene-om-omsorgen/AleneOmOmsorgen';
import VilkarMidlertidigAlene from './components/vilkar-midlertidig-alene/VilkarMidlertidigAlene';
import ContainerContext from './context/ContainerContext';
import styles from './global.less';
import {AlertStripeFeil} from 'nav-frontend-alertstriper';

interface MainComponentProps {
  containerData: ContainerContract;
}

const MainComponent = ({containerData}: MainComponentProps): JSX.Element => {

  let innhold;
  switch (containerData.visKomponent) {
    case Komponenter.KORRIGERE_PERIODER:
      innhold = <KorrigerePerioder {...containerData.props}/>;
      break;
    case Komponenter.VILKAR_KRONISK_SYKT_BARN:
      innhold = <VilkarKroniskSyktBarn {...containerData.props}/>;
      break;
    case Komponenter.VILKAR_MIDLERTIDIG_ALENE:
      innhold = <VilkarMidlertidigAlene {...containerData.props}/>;
      break;
    case Komponenter.OMSORG:
      innhold = <Omsorg {...containerData.props}/>;
      break;
    case Komponenter.ALENE_OM_OMSORGEN:
      innhold = <AleneOmOmsorgen {...containerData.props}/>;
      break;
    default:
      innhold = <AlertStripeFeil>Noe gikk galt, vennligst prøv igjen senere</AlertStripeFeil>;
  }

  return (
    <ContainerContext.Provider value={containerData}>
     <div className={styles.global}>
       {innhold}
     </div>
    </ContainerContext.Provider>
  );
};

export default MainComponent;