import React from 'react';
import ContainerContract from '../types/ContainerContract';
import Komponenter from "../types/Komponenter";
import KorrigerePerioder from "../ui/components/korrigere-perioder/KorrigerePerioder";
import VilkarKroniskSyktBarn from "../ui/components/vilkar-kronisk-sykt-barn/VilkarKroniskSyktBarn";
import ContainerContext from './context/ContainerContext';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {

    let innhold;
    switch (containerData.visKomponent) {
        case Komponenter.KORRIGERE_PERIODER: innhold = <KorrigerePerioder/>; break;
        case Komponenter.VILKAR_KRONISK_SYKT_BARN: innhold = <VilkarKroniskSyktBarn {...containerData.props}/>; break;
        default: innhold = <></>;
    }

    return (
        <ContainerContext.Provider value={containerData}>
            {innhold}
        </ContainerContext.Provider>
    );
};

export default MainComponent;