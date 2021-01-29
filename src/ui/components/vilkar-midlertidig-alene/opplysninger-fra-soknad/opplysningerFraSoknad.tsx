import React from 'react';
import styles from './opplysningerFraSoknad.less';

const OpplysningerFraSoknad = ({årsak, beskrivelse, periode}) => {
  return (
    <>
      <span>Opplysninger fra søknaden:</span>
      <div className={styles.arsakRad}>
        <h4>Oppgitt årsak</h4>
        <span>{årsak}</span>

        {beskrivelse.length!=0 && <>
            <h4>Beskrivelse</h4>
            <span>{beskrivelse}</span>
          </>
        }

        <h4>Oppgitt periode</h4>
        <span>{periode}</span>
      </div>
    </>
  );
}
export default OpplysningerFraSoknad;