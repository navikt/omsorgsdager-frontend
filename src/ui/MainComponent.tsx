import React from 'react';
import ContainerContract from '../types/ContainerContract';
import ContainerContext from './context/ContainerContext';
import Komponenter from "../types/Komponenter";
import KorrigerePerioder from "../ui/components/korrigere-perioder/KorrigerePerioder";
import VilkarKroniskSyktBarn from "../ui/components/vilkar-kronisk-sykt-barn/VilkarKroniskSyktBarn";
import VilkarMidlertidigAlene from "./components/vilkar-midlertidig-alene/VilkarMidlertidigAlene";

interface MainComponentProps {
  containerData: ContainerContract;
}

const MainComponent = ({containerData}: MainComponentProps): JSX.Element => {

    let innhold;
    switch (containerData.visKomponent) {
      case Komponenter.KORRIGERE_PERIODER:
        innhold = <KorrigerePerioder/>;
        break;
      case Komponenter.VILKAR_KRONISK_SYKT_BARN:
        innhold = containerData.props.type === 'VilkarKroniskSyktBarn' &&
          <VilkarKroniskSyktBarn {...containerData.props}/>;
        break;
      case Komponenter.VILKAR_MIDLERTIDIG_ALENE:
        innhold = containerData.props.type === 'VilkarMidlertidigAlene' &&
          <VilkarMidlertidigAlene {...containerData.props} />;
        break;
      default:
        innhold = <></>;
    }

    return (
      <ContainerContext.Provider value={containerData}>
        {innhold}
      </ContainerContext.Provider>
    );
  }
;

export default MainComponent;