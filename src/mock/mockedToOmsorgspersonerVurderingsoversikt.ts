import { Period } from '../types/Period';
import Vurderingsoversikt from '../types/Vurderingsoversikt';
import { toSøkereMedTilsynsbehovVurderingselementerMock } from './mockedTilsynsbehovVurderinger';

const mockedToOmsorgspersonerVurderingsoversikt: Vurderingsoversikt = {
    vurderingselementer: toSøkereMedTilsynsbehovVurderingselementerMock,
    resterendeVurderingsperioder: [new Period('2020-01-16', '2020-01-20')],
    perioderSomKanVurderes: [new Period('2020-01-01', '2020-01-15'), new Period('2020-01-16', '2020-01-20')],
    søknadsperioderTilBehandling: [new Period('2020-01-16', '2020-01-20')],
};

export default mockedToOmsorgspersonerVurderingsoversikt;
