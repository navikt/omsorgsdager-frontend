import { EtikettInfo } from 'nav-frontend-etiketter';
import React from 'react';
import { Period } from '../../../types/Period';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import OnePersonIconBlue from '../icons/OnePersonIconBlue';
import OnePersonOutline from '../icons/OnePersonOutline';
import RedCrossIconFilled from '../icons/RedCrossIconFilled';
import TwoPersonsWithOneHighlightedIconBlue from '../icons/TwoPersonsWithOneHighlightedIconBlue';
import IconWithTooltip from '../icon-with-tooltip/IconWithTooltip';
import styles from './vurderingsperiodeElement.less';

interface VurderingsperiodeElementProps {
    periode: Period;
    resultat: Vurderingsresultat;
    gjelderForAnnenPart?: boolean;
    gjelderForSøker?: boolean;
    etikett?: string;
}

const renderIcon = (resultat: Vurderingsresultat) => {
    if (resultat === Vurderingsresultat.INNVILGET) {
        return <GreenCheckIconFilled />;
    }
    if (resultat === Vurderingsresultat.AVSLÅTT) {
        return <RedCrossIconFilled />;
    }
};

const renderResultatText = (resultat: Vurderingsresultat) => {
    if (resultat === Vurderingsresultat.INNVILGET) {
        return <span>Innvilget</span>;
    }
    if (resultat === Vurderingsresultat.AVSLÅTT) {
        return <span>Avslått</span>;
    }
};

const VurderingsperiodeElement = ({
    periode,
    resultat,
    etikett,
    gjelderForAnnenPart,
    gjelderForSøker,
}: VurderingsperiodeElementProps): JSX.Element => {
    const parterLabel = () => {
        if (gjelderForAnnenPart && gjelderForSøker) {
            return (
                <IconWithTooltip
                    renderIcon={() => <TwoPersonsWithOneHighlightedIconBlue />}
                    tooltipText="Søker og annen part"
                />
            );
        }
        if (gjelderForAnnenPart) {
            return <IconWithTooltip renderIcon={() => <OnePersonOutline />} tooltipText="Annen part" />;
        }
        return <IconWithTooltip renderIcon={() => <OnePersonIconBlue />} tooltipText="Søker" />;
    };

    return (
        <div className={styles.vurderingsperiodeElement}>
            {renderIcon(resultat)}
            <div className={styles.vurderingsperiodeElement__texts}>
                <p className={styles.vurderingsperiodeElement__texts__period}>{prettifyPeriod(periode)}</p>
                <div className={styles.vurderingsperiodeElement__texts__parterIcon}>{parterLabel()}</div>
                <p className={styles.vurderingsperiodeElement__texts__parter}>{renderResultatText(resultat)}</p>
            </div>
            {etikett && (
                <div className={styles.vurderingsperiodeElement__etikett}>
                    <EtikettInfo mini>{etikett}</EtikettInfo>
                </div>
            )}
        </div>
    );
};

export default VurderingsperiodeElement;
