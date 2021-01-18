import React from 'react';
import { EtikettFokus } from 'nav-frontend-etiketter';
import { prettifyPeriod } from '../../../util/formats';
import WarningIcon from '../icons/WarningIcon';
import { Period } from '../../../types/Period';
import styles from './perioderSomSkalVurderes.less';

interface PerioderSomSkalVurderesProps {
    perioder: Period[];
}

const PerioderSomSkalVurderes = ({ perioder }: PerioderSomSkalVurderesProps) => {
    return (
        <div className={styles.perioderSomSkalVurderes}>
            <WarningIcon />
            <div className={styles.perioderSomSkalVurderes__texts}>
                {perioder.map((periode) => (
                    <p key={`${periode.fom}_${periode.tom}`} className={styles.perioderSomSkalVurderes__texts__period}>
                        {prettifyPeriod(periode)}
                    </p>
                ))}
            </div>
            <EtikettFokus mini={true}>Må vurderes</EtikettFokus>
        </div>
    );
};

export default PerioderSomSkalVurderes;
