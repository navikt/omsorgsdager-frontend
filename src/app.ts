import renderers from './util/renderers';
import ContainerContract from './types/ContainerContract';
import {localDevConfig} from '../localDevConfig.js'
import {vilkarKroniskSyktBarn, vilkarMidlertidigAlene, korrigerePerioder} from './mock/mockedContainerData';

(window as any).renderMicrofrontendOmsorgsdagerApp = async (appId, data: ContainerContract) => {
  const {renderAppInSuccessfulState} = renderers;
  if (!localDevConfig.lokalUtvikling) renderAppInSuccessfulState(appId, data);
  else {
    if (localDevConfig.visVilkarKroniskSyktBarn) renderAppInSuccessfulState(appId, vilkarKroniskSyktBarn);
    else if (localDevConfig.visVilkarMidlertidigAlene) renderAppInSuccessfulState(appId, vilkarMidlertidigAlene);
    else if (localDevConfig.visKorrigerePerioder) renderAppInSuccessfulState(appId, korrigerePerioder);
    else renderAppInSuccessfulState(appId, data);
  }
}
