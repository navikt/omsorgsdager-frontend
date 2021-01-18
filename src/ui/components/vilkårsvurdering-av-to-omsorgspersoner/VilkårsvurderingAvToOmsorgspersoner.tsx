import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import React from 'react';
import Vurderingsoversikt from '../../../types/Vurderingsoversikt';
import { prettifyPeriod } from '../../../util/formats';
import { hentToOmsorgspersonerVurderingsoversikt } from '../../../util/httpMock';
import ContainerContext from '../../context/ContainerContext';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import ActionType from './actionTypes';
import vilkårsvurderingReducer from './reducer';
import VurderingsdetaljerForToOmsorgspersoner from '../vurderingsdetaljer-for-to-omsorgspersoner/VurderingsdetaljerForToOmsorgspersoner';
import Vurderingsnavigasjon from '../vurderingsnavigasjon/Vurderingsnavigasjon';
import { Period } from '../../../types/Period';
import Vurderingselement from '../../../types/Vurderingselement';

const VilkårsvurderingAvToOmsorgspersoner = (): JSX.Element => {
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

    const harPerioderSomSkalVurderes = vurderingsoversikt?.resterendeVurderingsperioder?.length > 0;

    React.useEffect(() => {
        let isMounted = true;

        hentToOmsorgspersonerVurderingsoversikt().then((nyVurderingsoversikt: Vurderingsoversikt) => {
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

    const velgVurderingselement = (nyvalgtVurderingselement: Vurderingselement) => {
        onVurderingValgt(nyvalgtVurderingselement.id);
        dispatch({ type: ActionType.VELG_VURDERINGSELEMENT, vurderingselement: nyvalgtVurderingselement });
    };

    if (isLoading) {
        return <p>Henter vurderinger</p>;
    }
    return (
        <>
            {harPerioderSomSkalVurderes && (
                <div style={{ maxWidth: '1194px' }}>
                    <AlertStripeAdvarsel>
                        {`Vurder behov for to omsorgspersoner for perioden ${prettifyPeriod(
                            vurderingsoversikt?.resterendeVurderingsperioder[0]
                        )}.`}
                    </AlertStripeAdvarsel>
                    <div style={{ marginTop: '1rem' }} />
                </div>
            )}
            <NavigationWithDetailView
                navigationSection={() => {
                    if (vurderingsoversikt?.resterendeVurderingsperioder.length === 0) {
                        return (
                            <div style={{ marginTop: '1rem' }}>
                                <AlertStripeInfo>
                                    To omsorgspersoner skal ikke vurderes før tilsyn og pleie er blitt innvilget og det
                                    er to parter i saken.
                                </AlertStripeInfo>
                            </div>
                        );
                    }
                    return (
                        <Vurderingsnavigasjon
                            vurderingselementer={vurderingsoversikt?.vurderingselementer}
                            resterendeVurderingsperioder={vurderingsoversikt?.resterendeVurderingsperioder}
                            søknadsperioderTilBehandling={vurderingsoversikt?.søknadsperioderTilBehandling}
                            onVurderingValgt={velgVurderingselement}
                            onNyVurderingClick={visNyVurderingForm}
                        />
                    );
                }}
                detailSection={() => {
                    if (visVurderingDetails) {
                        return (
                            <VurderingsdetaljerForToOmsorgspersoner
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
        </>
    );
};

export default VilkårsvurderingAvToOmsorgspersoner;
