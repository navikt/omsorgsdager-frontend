import { Element } from 'nav-frontend-typografi';
import React from 'react';
import GreenCheckIcon from '../icons/GreenCheckIcon';
import RedCrossIcon from '../icons/RedCrossIcon';
import styles from './statusPanel.less';

export enum StatusPanelTheme {
    SUCCESS = 'success',
    ALERT = 'alert',
}

interface StatusPanelProps {
    theme: StatusPanelTheme;
    heading: string;
    children?: React.ReactNode;
}

const StatusPanel = ({ theme, heading, children }: StatusPanelProps): JSX.Element => {
    const statusPanelBorder = styles.statusPanel__border;
    const statusPanelTheme = `statusPanel__border--${theme}`;
    return (
        <div className={styles.statusPanel}>
            <div className={`${statusPanelBorder} ${styles[statusPanelTheme]}`} />
            <div className={styles.statusPanel__infoContainer}>
                {theme === StatusPanelTheme.SUCCESS && <GreenCheckIcon />}
                {theme === StatusPanelTheme.ALERT && <RedCrossIcon />}
                <div className={styles.statusPanel__infoContainer__info}>
                    <Element>{heading}</Element>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default StatusPanel;
