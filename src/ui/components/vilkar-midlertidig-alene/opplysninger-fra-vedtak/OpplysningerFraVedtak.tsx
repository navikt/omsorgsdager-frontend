import React from 'react';
import styles from './opplysningerFraVedtak.less';
import styleLesemodus from "../../lesemodus/lesemodusboks.less";
import {VilkarMidlertidigAleneDato} from "../../../../types/VilkarMidlertidigAleneProps";

interface Props {
  vilkarOppfylt: boolean;
  dato: VilkarMidlertidigAleneDato;
  begrunnelse: string;
}

const OpplysningerFraVedtak: React.FunctionComponent<Props> = ({vilkarOppfylt, dato, begrunnelse}) => {
  return (
    <div className={styles.opplysningerFraVedtak}>
      <h4>Er vilkåret om midlertidig alene om omsorgen oppfylt?</h4>
      <p>{vilkarOppfylt ? 'Ja' : 'Nei'}</p>

      <h4>I hvilken periode er vedtaket gyldig?</h4>
      <p>{`${dato.fra}-${dato.til}`}</p>

      <h4>Begrunnelse</h4>
      <p className={styleLesemodus.fritekst}>{begrunnelse}</p>
    </div>
  );
};
export default OpplysningerFraVedtak;