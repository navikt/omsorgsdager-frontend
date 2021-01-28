import React from 'react';
import styles from './opplysningerFraSoknad.less';

const OpplysningerFraSoknad = () => {

  return (
    <>
      <span className={styles.overskrift}>Opplysninger fra søknaden:</span>
      <div className={styles.arsakRad}>
        <div>
          <h4>Årsak</h4>
          <span>Avtjener verneplikt</span>
        </div>
        <div>
          <h4>Årsak</h4>
          <span>Avtjener verneplikt</span>
        </div>
      </div>

      <div className={styles.arsakRad}>
        <div>
          <h4>Varighet/Periode</h4>
          <span>Avtjener verneplikt</span>
        </div>
        <div>
          <h4>Varighet/Periode</h4>
          <span>Avtjener verneplikt</span>
        </div>
      </div>
    </>
  );
}
export default OpplysningerFraSoknad;