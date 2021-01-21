import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import React from 'react';
import styles from './korrigerePerioder.less';

const KorrigerePerioder = () => {
    return <div className={styles.korrigerePerioder}>
        <AlertStripeAdvarsel className={styles.varselstripe}>
            Det finnes avslåtte perioder. Korriger eller legg til rammemeldinger i Infotrygd, eller fortsett dersom avslåtte perioder er korrekte.
        </AlertStripeAdvarsel>
    </div>;
};
export default KorrigerePerioder;