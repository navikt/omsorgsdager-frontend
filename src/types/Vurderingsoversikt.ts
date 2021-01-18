import { Period } from './Period';
import Vurderingselement from './Vurderingselement';

interface Vurderingsoversikt {
    vurderingselementer: Vurderingselement[];
    resterendeVurderingsperioder: Period[];
    søknadsperioderTilBehandling: Period[];
    perioderSomKanVurderes: Period[];
}

export default Vurderingsoversikt;
