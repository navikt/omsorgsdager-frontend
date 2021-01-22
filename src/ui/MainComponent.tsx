import React from 'react';
import ContainerContract from '../types/ContainerContract';
import Komponenter from "../types/Komponenter";
import KorrigerePerioder from "../ui/components/korrigere-perioder/KorrigerePerioder";
import ContainerContext from './context/ContainerContext';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {
    return (
        <ContainerContext.Provider value={containerData}>
            {containerData.visKomponent == Komponenter.KORRIGERE_PERIODER && <KorrigerePerioder/>}
        </ContainerContext.Provider>
    );
};

export default MainComponent;