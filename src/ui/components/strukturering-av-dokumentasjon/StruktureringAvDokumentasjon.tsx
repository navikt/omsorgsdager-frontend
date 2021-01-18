import React from 'react';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import Dokumentnavigasjon from '../dokumentnavigasjon/Dokumentnavigasjon';
import StrukturerDokumentForm from '../strukturer-dokument-form/StrukturerDokumentForm';
import StrukturertDokumentDetaljer from '../strukturert-dokument-detaljer/StrukturertDokumentDetaljer';
import { hentDokumentoversikt } from '../../../util/httpMock';
import { Dokumentoversikt, StrukturertDokument } from '../../../types/Dokument';

function lagreStrukturertDokument(dokument: StrukturertDokument) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({}), 1000);
    });
}

const StruktureringAvDokumentasjon = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [valgtDokument, setValgtDokument] = React.useState(null);
    const [dokumentoversikt, setDokumentoversikt] = React.useState<Dokumentoversikt>(null);

    React.useEffect(() => {
        let isMounted = true;
        hentDokumentoversikt().then((nyDokumentoversikt: Dokumentoversikt) => {
            if (isMounted) {
                setDokumentoversikt(nyDokumentoversikt);
                setIsLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const strukturerteDokumenter = React.useMemo(() => {
        if (dokumentoversikt) {
            const { dokumenterMedMedisinskeOpplysninger, dokumenterUtenMedisinskeOpplysninger } = dokumentoversikt;
            return [...dokumenterMedMedisinskeOpplysninger, ...dokumenterUtenMedisinskeOpplysninger];
        }
        return [];
    }, [dokumentoversikt]);

    const lagreStruktureringAvDokument = (dokument: StrukturertDokument) => {
        setIsLoading(true);
        lagreStrukturertDokument(dokument).then(
            () => {
                setIsLoading(false);
            },
            () => {
                // showErrorMessage ??
                setIsLoading(false);
            }
        );
    };

    if (isLoading) {
        return <p>Henter dokumenter</p>;
    }
    return (
        <NavigationWithDetailView
            navigationSection={() => (
                <Dokumentnavigasjon
                    dokumenter={strukturerteDokumenter}
                    dokumenterSomMåGjennomgås={dokumentoversikt?.ustrukturerteDokumenter}
                    onDokumentValgt={(legeerklæring) => setValgtDokument(legeerklæring)}
                />
            )}
            detailSection={() => {
                if (!valgtDokument) {
                    const ustrukturertDokument = dokumentoversikt?.ustrukturerteDokumenter[0];
                    if (ustrukturertDokument) {
                        return (
                            <StrukturerDokumentForm
                                dokument={ustrukturertDokument}
                                onSubmit={lagreStruktureringAvDokument}
                            />
                        );
                    }
                    return 'Ingen dokumenter å vise';
                }
                return <StrukturertDokumentDetaljer dokument={valgtDokument} />;
            }}
        />
    );
};

export default StruktureringAvDokumentasjon;
