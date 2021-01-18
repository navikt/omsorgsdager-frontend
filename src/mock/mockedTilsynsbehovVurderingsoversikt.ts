import { Period } from '../types/Period';
import Vurderingsoversikt from '../types/Vurderingsoversikt';
import { genereltTilsynsbehovVurderingselementerMock } from './mockedTilsynsbehovVurderinger';

const tilsynsbehovVurderingsoversiktMock: Vurderingsoversikt = {
    vurderingselementer: genereltTilsynsbehovVurderingselementerMock,
    resterendeVurderingsperioder: [new Period('2020-01-16', '2020-01-20')],
    perioderSomKanVurderes: [new Period('2020-01-01', '2020-01-15'), new Period('2020-01-16', '2020-01-20')],
    søknadsperioderTilBehandling: [],
};

export default tilsynsbehovVurderingsoversiktMock;
