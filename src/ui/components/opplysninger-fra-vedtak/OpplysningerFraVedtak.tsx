import React from 'react';
import {tekst} from '../vilkar-midlertidig-alene/vilkar-midlertidig-alene-tekst';
import styles from './opplysningerFraVedtak.less';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import {VilkarMidlertidigAleneDato} from '../../../types/VilkarMidlertidigAleneProps';

interface Props {
  dato: VilkarMidlertidigAleneDato;
  begrunnelse: string;
  erVilkarOppfylt: boolean;
  avslagsÅrsakPeriodeErIkkeOverSeksMån: boolean;
}

const OpplysningerFraVedtak: React.FunctionComponent<Props> = ({
                                                                 dato,
                                                                 begrunnelse,
                                                                 erVilkarOppfylt,
                                                                 avslagsÅrsakPeriodeErIkkeOverSeksMån
                                                               }) => {
  return (
    <div className={styles.opplysningerFraVedtak}>
      <h4>{tekst.begrunnelse}</h4>
      <p className={styleLesemodus.fritekst}>{begrunnelse}</p>

      <h4>{tekst.sporsmålVilkarOppfylt}</h4>
      <p>{erVilkarOppfylt ? 'Ja' : 'Nei'}</p>

      {erVilkarOppfylt && <>
        <h4>I hvilken periode er vedtaket gyldig?</h4>
        <p>{`${dato.fra} - ${dato.til}`}</p>
        </>}

      {!erVilkarOppfylt && <>
        <h4 className={styleLesemodus.label}>{tekst.arsak}</h4>
        <p className={styleLesemodus.text}>{
          avslagsÅrsakPeriodeErIkkeOverSeksMån ? tekst.arsakPeriodeIkkeOverSeksMån : tekst.arsakIkkeAleneOmsorg
        }</p>
      </>
      }
    </div>
  );
}
;
export default OpplysningerFraVedtak;