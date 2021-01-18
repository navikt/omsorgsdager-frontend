import { Period } from './Period';
import Vurderingsresultat from './Vurderingsresultat';

interface Vurderingselement {
    id: string;
    resultat: Vurderingsresultat;
    periode: Period;
    gjelderForSøker: boolean;
    gjelderForAnnenPart: boolean;
}

export default Vurderingselement;
