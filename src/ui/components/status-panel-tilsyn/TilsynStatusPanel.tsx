import * as React from 'react';
import { prettifyPeriod } from '../../../util/formats';
import Box, { Margin } from '../box/Box';
import StatusPanel, { StatusPanelTheme } from '../status-panel/StatusPanel';
import OnePersonIcon from '../icons/OnePersonIcon';
import TwoPersonsIcon from '../icons/TwoPersonsIcon';
import styles from './tilsynStatusPanel.less';
import GradAvTilsynsbehov from '../../../types/GradAvTilsynsbehov';
import PeriodeMedGradAvTilsynsbehov from '../../../types/PeriodeMedGradAvTilsynsbehov';

const statusPanelConfig = {
    [GradAvTilsynsbehov.BEHOV_FOR_EN]: {
        heading: 'Behov for kontinuerlig tilsyn og pleie',
        theme: StatusPanelTheme.SUCCESS,
        description: 'Det er kun behov for én omsorgsperson denne perioden',
        iconRenderer: () => <OnePersonIcon />,
    },
    [GradAvTilsynsbehov.BEHOV_FOR_TO]: {
        heading: 'Behov for kontinuerlig tilsyn og pleie',
        theme: StatusPanelTheme.SUCCESS,
        description: 'Det er behov for to omsorgspersoner denne perioden',
        iconRenderer: () => <TwoPersonsIcon />,
    },
    [GradAvTilsynsbehov.INNLAGT]: {
        heading: 'Innlagt på sykehus',
        theme: StatusPanelTheme.SUCCESS,
        description: 'Det er behov for to omsorgspersoner denne perioden',
        iconRenderer: () => <TwoPersonsIcon />,
    },
    [GradAvTilsynsbehov.IKKE_BEHOV]: {
        heading: 'Ikke behov for kontinuerlig tilsyn og pleie',
        theme: StatusPanelTheme.ALERT,
    },
};

const Tilsynsbeskrivelse = ({ status }) => (
    <div className={styles.tilsynBeskrivelseContainer}>
        {statusPanelConfig[status].iconRenderer()}

        <p className={styles.tilsynBeskrivelseContainer__beskrivelse}>{statusPanelConfig[status].description}</p>
    </div>
);

const TilsynStatusPanel = ({ periode, grad }: PeriodeMedGradAvTilsynsbehov): JSX.Element => {
    const { heading, theme } = statusPanelConfig[grad];

    const harTilsynsbehov = [
        GradAvTilsynsbehov.BEHOV_FOR_EN,
        GradAvTilsynsbehov.BEHOV_FOR_TO,
        GradAvTilsynsbehov.INNLAGT,
    ].includes(grad);

    return (
        <StatusPanel heading={heading} theme={theme}>
            <Box marginTop={Margin.small}>{prettifyPeriod(periode)}</Box>
            {harTilsynsbehov && (
                <Box marginTop={Margin.small}>
                    <Tilsynsbeskrivelse status={grad} />
                </Box>
            )}
        </StatusPanel>
    );
};

export default TilsynStatusPanel;
