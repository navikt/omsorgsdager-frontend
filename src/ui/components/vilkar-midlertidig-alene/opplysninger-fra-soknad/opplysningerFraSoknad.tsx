import React from 'react';
import styles from './opplysningerFraSoknad.less';

interface Props {
  årsak: string,
  beskrivelse?: string,
  periode: string
}

const OpplysningerFraSoknad: React.FunctionComponent<Props> = ({årsak, beskrivelse, periode}) => {
  return (
    <div className={styles.opplysningerFraSoknad}>
      <span>Opplysninger fra søknaden:</span>
      <h4>Oppgitt årsak</h4>
      {"Heihei"}

      {beskrivelse !== undefined && beskrivelse.length !== 0 && <>
        <h4>Beskrivelse</h4>
        {"heihei"}
      </>}

      <h4>Oppgitt periode</h4>
      {"Heihei"}
    </div>
  );
}
export default OpplysningerFraSoknad;