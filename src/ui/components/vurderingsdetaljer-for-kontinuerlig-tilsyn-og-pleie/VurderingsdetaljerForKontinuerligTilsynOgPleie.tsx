import React from 'react';
import VurderingAvTilsynsbehovForm, { FieldName } from '../ny-vurdering-av-tilsynsbehov/NyVurderingAvTilsynsbehovForm';
import VurderingsoppsummeringForKontinuerligTilsynOgPleie from '../vurderingsoppsummering-for-kontinuerlig-tilsyn-og-pleie/VurderingsoppsummeringForKontinuerligTilsynOgPleie';
import { Period } from '../../../types/Period';
import Dokument from '../../../types/Dokument';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import mockedDokumentliste from '../../../mock/mockedDokumentliste';
import Vurdering, { Vurderingsversjon } from '../../../types/Vurdering';

interface VurderingDetailsProps {
    vurderingId: string | null;
    resterendeVurderingsperioder: Period[];
    perioderSomKanVurderes: Period[];
    onVurderingLagret: () => void;
}

function lagreVurdering(nyVurderingsversjon: Partial<Vurderingsversjon>, vurdering: Vurdering) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({}), 1000);
    });
}

function hentVurdering(vurderingsid: string): Promise<Vurdering> {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                resolve({
                    id: vurderingsid,
                    type: 'KONTINUERLIG_TILSYN_OG_PLEIE',
                    versjoner: [
                        {
                            perioder: [new Period('2020-01-01', '2020-01-15')],
                            resultat: Vurderingsresultat.INNVILGET,
                            tekst: 'Fordi her er det behov',
                            dokumenter: mockedDokumentliste,
                            versjon: '1',
                        },
                    ],
                    annenInformasjon: {
                        resterendeVurderingsperioder: [],
                        perioderSomKanVurderes: [],
                    },
                }),
            1000
        );
    });
}

function hentNødvendigeDataForÅGjøreVurdering() {
    return new Promise<any>((resolve) => {
        setTimeout(
            () =>
                resolve({
                    dokumenter: mockedDokumentliste,
                }),
            1000
        );
    });
}

const VurderingsdetaljerForKontinuerligTilsynOgPleie = ({
    vurderingId,
    resterendeVurderingsperioder,
    perioderSomKanVurderes,
    onVurderingLagret,
}: VurderingDetailsProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [vurdering, setVurdering] = React.useState<Vurdering>(null);
    const [alleDokumenter, setDokumenter] = React.useState<Dokument[]>([]);

    React.useEffect(() => {
        let isMounted = true;

        setIsLoading(true);

        if (vurderingId) {
            hentVurdering(vurderingId).then((vurderingResponse: Vurdering) => {
                if (isMounted) {
                    setVurdering(vurderingResponse);
                    setIsLoading(false);
                }
            });
        } else {
            setVurdering(null);
            hentNødvendigeDataForÅGjøreVurdering().then(({ dokumenter }) => {
                if (isMounted) {
                    setDokumenter(dokumenter);
                    setIsLoading(false);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [vurderingId]);

    const lagreVurderingAvTilsynsbehov = (nyVurderingsversjon: Partial<Vurderingsversjon>) => {
        setIsLoading(true);
        lagreVurdering(nyVurderingsversjon, vurdering).then(
            () => {
                onVurderingLagret();
                setIsLoading(false);
            },
            () => {
                // showErrorMessage ??
                setIsLoading(false);
            }
        );
    };

    if (isLoading) {
        return <p>Laster</p>;
    }
    if (vurdering !== null) {
        return (
            <VurderingsoppsummeringForKontinuerligTilsynOgPleie alleDokumenter={alleDokumenter} vurdering={vurdering} />
        );
    }

    return (
        <VurderingAvTilsynsbehovForm
            defaultValues={{
                [FieldName.VURDERING_AV_KONTINUERLIG_TILSYN_OG_PLEIE]: '',
                [FieldName.HAR_BEHOV_FOR_KONTINUERLIG_TILSYN_OG_PLEIE]: undefined,
                [FieldName.PERIODER]: resterendeVurderingsperioder,
                [FieldName.DOKUMENTER]: [],
            }}
            resterendeVurderingsperioder={resterendeVurderingsperioder}
            perioderSomKanVurderes={perioderSomKanVurderes}
            dokumenter={alleDokumenter}
            onSubmit={lagreVurderingAvTilsynsbehov}
        />
    );
};

export default VurderingsdetaljerForKontinuerligTilsynOgPleie;
