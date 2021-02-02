import renderers from './util/renderers';
import ContainerContract from './types/ContainerContract';
import {vilkarKroniskSyktBarn, vilkarMidlertidigAlene, korrigerePerioder} from './mock/mockedContainerData';

(window as any).renderMicrofrontendOmsorgsdagerApp = async (appId, data: ContainerContract) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
