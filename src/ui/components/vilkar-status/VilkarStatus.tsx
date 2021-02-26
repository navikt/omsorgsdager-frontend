import classNames from 'classnames';
import Feilikon from '../../icons/Feilikon';
import React from 'react';
import styles from './vilkarStatus.less';
import Suksessikon from '../../icons/Suksessikon';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import SjekkIkon from "../../icons/SjekkIkon";

interface OwnProps {
  aksjonspunktNavn: string;
  begrunnelse: string;
  erVilkaretForOmsorgenFor: boolean;
  beskrivelseForOmsorgenFor?: string;
  vilkarOppfylt: boolean;
  vilkarReferanse: string;
}

const VilkarStatus: React.FunctionComponent<OwnProps> = ({
                                                           aksjonspunktNavn,
                                                           begrunnelse,
                                                           erVilkaretForOmsorgenFor,
                                                           beskrivelseForOmsorgenFor,
                                                           vilkarOppfylt,
                                                           vilkarReferanse
                                                         }) => {
    return (<>
        <div className={styles.vilkarStatusOverskrift}>
          {vilkarOppfylt
            ? <Suksessikon/>
            : <Feilikon/>
          }
          <h2 className={styles.aksjonspunktNavn}>{aksjonspunktNavn}</h2>
          <p className={styles.vilkar}>{vilkarReferanse}</p>
        </div>
        <h4 className={styles.vilkarStatus}>
          {vilkarOppfylt
            ? 'Vilkåret er oppfylt'
            : 'Vilkåret er ikke oppfylt'
          }
        </h4>
        {erVilkaretForOmsorgenFor && vilkarOppfylt && <div className={styles.beskrivelseForOmsorgenForOppfyltVilkar}>
          <SjekkIkon/> <h4>{beskrivelseForOmsorgenFor}</h4>
        </div>}
        <h4 className={styles.begrunnelseOverskrift}>Begrunnelse</h4>
        <p className={classNames(styleLesemodus.fritekst, styles.begrunnelse)}>{begrunnelse}</p>

      </>
    );
  }
;
export default VilkarStatus;