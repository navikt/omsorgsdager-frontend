import React from 'react';
import styles from './opplysningerFraSoknad.less';

interface Props {
  årsak: string;
  beskrivelse?: string;
  periode: string;
}

const OpplysningerFraSoknad: React.FunctionComponent<Props> = ({årsak, beskrivelse, periode}) => {
  return (
    <div className={styles.opplysningerFraSoknad}>
      <div>Opplysninger fra søknaden:</div>
      <h4>Oppgitt årsak</h4>
      <p>{årsak}</p>

      {årsak != undefined && årsak.toLowerCase() === 'annet' && beskrivelse !== undefined && beskrivelse.length !== 0 && <>
        <h4>Beskrivelse</h4>
        <p>{beskrivelse}</p>
      </>}

      <h4>Oppgitt periode</h4>
      <p>{periode}</p>
    </div>
  );
}
export default OpplysningerFraSoknad;