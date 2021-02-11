import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import styles from './korrigerePerioder.less';

const KorrigerePerioder = () => {

    const [innvilgedePerioder, endreInnvilgedePerioder] = useState<'alle' | 'ingen'>('ingen');
    const [begrunnelse, endreBegrunnelse] = useState<string>('');

    // TODO: Avventer avklaringer på hvordan denne skal se ut

    return <div className={styles.korrigerePerioder}>
        <AlertStripeAdvarsel className={styles.varselstripe}>
            Se på dokumentasjonen og vurder om den dekker alle fraværsperioder.
        </AlertStripeAdvarsel>
        <RadioGruppe legend="Er periodene innvilget pga. særlige smittevernshensyn eller stengt barnehage/skole/sfo?">
            <Radio
                label="Ja"
                name="alle"
                checked={innvilgedePerioder === 'alle'}
                onChange={e => e.target.value && endreInnvilgedePerioder('alle')}
            />
            <Radio
                label="Nei"
                name="ingen"
                checked={innvilgedePerioder === 'ingen'}
                onChange={e => e.target.value && endreInnvilgedePerioder('ingen')}
            />
        </RadioGruppe>
        <Textarea
            label="Begrunnelse"
            onChange={e => endreBegrunnelse(e.target.value)}
            value={begrunnelse}
            maxLength={0}
        />
    </div>;
};
export default KorrigerePerioder;