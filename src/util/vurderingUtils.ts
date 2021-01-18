import {
    FieldName as TilsynFieldName,
    VurderingAvTilsynsbehovFormState,
} from '../ui/components/ny-vurdering-av-tilsynsbehov/NyVurderingAvTilsynsbehovForm';
import {
    FieldName as ToOmsorgspersonerFieldName,
    VurderingAvToOmsorgspersonerFormState,
} from '../ui/components/ny-vurdering-av-to-omsorgspersoner/NyVurderingAvToOmsorgspersoner';
import Vurderingsresultat from '../types/Vurderingsresultat';
import { Period } from '../types/Period';
import Dokument from '../types/Dokument';
import { finnBenyttedeDokumenter } from './dokumentUtils';
import { Vurderingsversjon } from '../types/Vurdering';

export const lagTilsynsbehovVurdering = (
    formState: VurderingAvTilsynsbehovFormState,
    alleDokumenter: Dokument[]
): Vurderingsversjon => {
    const resultat = formState[TilsynFieldName.HAR_BEHOV_FOR_KONTINUERLIG_TILSYN_OG_PLEIE]
        ? Vurderingsresultat.INNVILGET
        : Vurderingsresultat.AVSLÅTT;
    const perioder = formState[TilsynFieldName.PERIODER].map((periodeWrapper) => {
        return new Period((periodeWrapper as any).period.fom, (periodeWrapper as any).period.tom);
    });
    const begrunnelse = formState[TilsynFieldName.VURDERING_AV_KONTINUERLIG_TILSYN_OG_PLEIE];

    return {
        resultat,
        perioder,
        tekst: begrunnelse,
        dokumenter: finnBenyttedeDokumenter(formState[TilsynFieldName.DOKUMENTER], alleDokumenter),
    };
};

export const lagToOmsorgspersonerVurdering = (
    formState: VurderingAvToOmsorgspersonerFormState,
    alleDokumenter: Dokument[]
): Vurderingsversjon => {
    const resultat = formState[ToOmsorgspersonerFieldName.HAR_BEHOV_FOR_TO_OMSORGSPERSONER]
        ? Vurderingsresultat.INNVILGET
        : Vurderingsresultat.AVSLÅTT;
    const perioder = formState[TilsynFieldName.PERIODER].map(
        (periodeWrapper) => new Period((periodeWrapper as any).period.fom, (periodeWrapper as any).period.tom)
    );
    const begrunnelse = formState[ToOmsorgspersonerFieldName.VURDERING_AV_TO_OMSORGSPERSONER];

    return {
        resultat,
        perioder,
        tekst: begrunnelse,
        dokumenter: finnBenyttedeDokumenter(formState[TilsynFieldName.DOKUMENTER], alleDokumenter),
    };
};
