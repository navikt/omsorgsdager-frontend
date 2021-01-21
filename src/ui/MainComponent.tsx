import React from 'react';
import ContainerContext from './context/ContainerContext';
import ContainerContract from '../types/ContainerContract';
import KomponentToggle from "./components/komponent-toggle/KomponentToggle";

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {
    return (
        <ContainerContext.Provider value={containerData}>
          <KomponentToggle/>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
