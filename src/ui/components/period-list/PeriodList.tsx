import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { Period } from '../../../types/Period';
import { isValidPeriod } from '../../../util/dateUtils';
import { prettifyPeriod } from '../../../util/formats';
import CalendarIcon from '../icons/CalendarIcon';
import GreenCheckIcon from '../icons/GreenCheckIcon';
import WarningIcon from '../icons/WarningIcon';
import styles from './periodList.less';

export enum PeriodListTheme {
    CALENDAR = 'calendar',
    SUCCESS = 'success',
    WARNING = 'warning',
}

interface PeriodListProps {
    periods: Period[];
    title: string;
    theme?: PeriodListTheme;
}

const PeriodList = ({ periods, title, theme }: PeriodListProps): JSX.Element => {
    const periodsToShow = periods.filter(isValidPeriod);
    return (
        <div className={styles.periodList}>
            {theme === PeriodListTheme.CALENDAR && <CalendarIcon />}
            {theme === PeriodListTheme.SUCCESS && <GreenCheckIcon />}
            {theme === PeriodListTheme.WARNING && <WarningIcon />}
            <div className={styles.periodList__infoContainer}>
                <p className={styles.periodList__infoContainer__title}>{title}</p>
                {periodsToShow.length > 0 ? (
                    <ul className={styles.periodList__infoContainer__list}>
                        {periodsToShow.map((period) => (
                            <li key={`${period.fom}-${period.tom}`}>
                                <Element>{prettifyPeriod(period)}</Element>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Ingen perioder</p>
                )}
            </div>
        </div>
    );
};
export default PeriodList;
