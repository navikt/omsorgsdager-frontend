import React from 'react';
import ContainerContext from './context/ContainerContext';
import ContainerContract from '../types/ContainerContract';
import KorrigerePerioder from './components/korrigere-perioder/KorrigerePerioder';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {
    return (
        <ContainerContext.Provider value={containerData}>
            <KorrigerePerioder/>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
