import React from 'react';
import ContainerContext from './context/ContainerContext';
import ContainerContract from '../types/ContainerContract';
import MedisinskVilkår from './components/medisinsk-vilkår/MedisinskVilkår';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {
    return (
        <div style={{ padding: '1rem' }}>
            <ContainerContext.Provider value={containerData}>
                <MedisinskVilkår />
            </ContainerContext.Provider>
        </div>
    );
};

export default MainComponent;
