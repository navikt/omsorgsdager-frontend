import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import styles from './nyVurderingKnapp.less';

interface NyVurderingKnappProps {
    onClick: () => void;
}

const NyVurderingKnapp = ({ onClick }: NyVurderingKnappProps) => {
    return (
        <Knapp className={styles.nyVurderingKnapp} type="standard" htmlType="button" mini={true} onClick={onClick}>
            Opprett ny vurdering
        </Knapp>
    );
};

export default NyVurderingKnapp;
