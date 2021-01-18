import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { Period } from '../../../types/Period';
import Vurderingselement from '../../../types/Vurderingselement';
import Vurderingsoversikt from '../../../types/Vurderingsoversikt';
import { prettifyPeriod } from '../../../util/formats';
import { hentTilsynsbehovVurderingsoversikt } from '../../../util/httpMock';
import ContainerContext from '../../context/ContainerContext';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import VurderingsdetaljerForKontinuerligTilsynOgPleie from '../vurderingsdetaljer-for-kontinuerlig-tilsyn-og-pleie/VurderingsdetaljerForKontinuerligTilsynOgPleie';
import Vurderingsnavigasjon from '../vurderingsnavigasjon/Vurderingsnavigasjon';
import ActionType from './actionTypes';
import vilkårsvurderingReducer from './reducer';

interface VilkårsvurderingAvTilsynOgPleieProps {
    onVilkårVurdert: () => void;
}

const VilkårsvurderingAvTilsynOgPleie = ({ onVilkårVurdert }: VilkårsvurderingAvTilsynOgPleieProps): JSX.Element => {
    const { vurdering, onVurderingValgt } = React.useContext(ContainerContext);

    const [state, dispatch] = React.useReducer(vilkårsvurderingReducer, {
        visVurderingDetails: false,
        isLoading: true,
        vurderingsoversikt: null,
        valgtVurderingselement: null,
        resterendeVurderingsperioderDefaultValue: [],
        vurdering,
    });

    const {
        vurderingsoversikt,
        isLoading,
        visVurderingDetails,
        valgtVurderingselement,
        resterendeVurderingsperioderDefaultValue,
    } = state;

    const harPerioderSomSkalVurderes =
        vurderingsoversikt &&
        vurderingsoversikt.resterendeVurderingsperioder &&
        vurderingsoversikt.resterendeVurderingsperioder.length > 0;

    React.useEffect(() => {
        let isMounted = true;
        hentTilsynsbehovVurderingsoversikt().then((nyVurderingsoversikt: Vurderingsoversikt) => {
            if (isMounted) {
                dispatch({ type: ActionType.VIS_VURDERINGSOVERSIKT, vurderingsoversikt: nyVurderingsoversikt });
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const visNyVurderingForm = (resterendeVurderingsperioder?: Period[]) => {
        onVurderingValgt(null);
        dispatch({ type: ActionType.VIS_NY_VURDERING_FORM, resterendeVurderingsperioder });
    };

    const velgVurderingselement = (nyValgtVurderingselement: Vurderingselement) => {
        onVurderingValgt(nyValgtVurderingselement.id);
        dispatch({ type: ActionType.VELG_VURDERINGSELEMENT, vurderingselement: nyValgtVurderingselement });
    };

    if (isLoading) {
        return <p>Henter vurderinger</p>;
    }
    return (
        <>
            {harPerioderSomSkalVurderes && (
                <div style={{ maxWidth: '1194px' }}>
                    <AlertStripeAdvarsel>
                        {`Vurder behov for tilsyn og pleie for perioden ${prettifyPeriod(
                            vurderingsoversikt?.resterendeVurderingsperioder[0]
                        )}.`}
                        Perioden som skal vurderes overlapper med tidligere vurderinger. Vurder om det er grunnlag for å
                        gjøre en ny vurdering.
                    </AlertStripeAdvarsel>
                    <div style={{ marginTop: '1rem' }} />
                </div>
            )}
            <NavigationWithDetailView
                navigationSection={() => (
                    <Vurderingsnavigasjon
                        vurderingselementer={vurderingsoversikt?.vurderingselementer}
                        resterendeVurderingsperioder={vurderingsoversikt?.resterendeVurderingsperioder}
                        søknadsperioderTilBehandling={vurderingsoversikt?.søknadsperioderTilBehandling}
                        onVurderingValgt={velgVurderingselement}
                        onNyVurderingClick={visNyVurderingForm}
                    />
                )}
                detailSection={() => {
                    if (visVurderingDetails) {
                        return (
                            <VurderingsdetaljerForKontinuerligTilsynOgPleie
                                vurderingId={valgtVurderingselement?.id}
                                onVurderingLagret={() => null}
                                resterendeVurderingsperioder={resterendeVurderingsperioderDefaultValue}
                                perioderSomKanVurderes={vurderingsoversikt?.perioderSomKanVurderes}
                            />
                        );
                    }
                    return null;
                }}
            />
            {!harPerioderSomSkalVurderes && (
                <Knapp style={{ marginTop: '2rem' }} onClick={() => onVilkårVurdert()}>
                    Gå videre til vurdering av to omsorgspersoner
                </Knapp>
            )}
        </>
    );
};

export default VilkårsvurderingAvTilsynOgPleie;
