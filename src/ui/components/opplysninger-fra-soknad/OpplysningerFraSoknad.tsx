import React from 'react';
import styles from './opplysningerFraSoknad.less';

interface Props {
  årsak: string;
  beskrivelse?: string;
  periodeTekst: string;
  periode: string;
}

const OpplysningerFraSoknad: React.FunctionComponent<Props> = ({årsak, beskrivelse, periode, periodeTekst}) => {
  return (
    <div className={styles.opplysningerFraSoknad}>
      <div>Opplysninger fra søknaden:</div>
      <h4>Oppgitt årsak</h4>
      <p>{årsak}</p>

      {beskrivelse !== undefined && beskrivelse.length > 0 && <>
        <h4>Beskrivelse</h4>
        <p className={styles.begrunnelseContainer}>{beskrivelse}</p>
      </>}

      {periode !== undefined && periode.length > 0 && <>
        <h4>{periodeTekst}</h4>
        <p>{periode}</p>
      </>}
    </div>
  );
};
export default OpplysningerFraSoknad;