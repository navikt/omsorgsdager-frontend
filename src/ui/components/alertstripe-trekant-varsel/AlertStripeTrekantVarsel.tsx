import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import WarningIcon from '../../icons/WarningIcon';
import styles from './alertStripeTrekantVarsel.less';

interface IconWithTextProps {
    text: string;
}

const AlertStripeTrekantVarsel = ({ text }: IconWithTextProps) => {
    return (
      <div className={styles.alertstripe} >
        <span className={styles.alertstripe_ikon}>
          <WarningIcon />
        </span>
          <Normaltekst className={styles.alertstripe__tekst} tag="div">
              {text}
          </Normaltekst>
      </div>

    );
};
export default AlertStripeTrekantVarsel;
