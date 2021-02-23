import React  from 'react';
import OpplysningerFraVedtak from '../opplysninger-fra-vedtak/OpplysningerFraVedtak';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import {VilkarMidlertidigGrunnlagForBeslutt, VilkarMidlertidigSoknadsopplysninger} from '../../../types/VilkarMidlertidigAleneProps';

interface OwnProps {
  soknadsopplysninger: VilkarMidlertidigSoknadsopplysninger;
  informasjonTilLesemodus: VilkarMidlertidigGrunnlagForBeslutt;
}

const VilkarMidlertidigAleneLesemodus: React.FunctionComponent<OwnProps> = ({
  soknadsopplysninger,
  informasjonTilLesemodus
}) => {
  return (
    <>
      <p><b>Behandlet aksjonspunkt:</b>{'Vurder om vilkår om midlertidig alene om omsorgen er oppfylt.'}</p>

      <OpplysningerFraSoknad {...soknadsopplysninger}/>

      <OpplysningerFraVedtak
        erSokerenMidlertidigAleneOmOmsorgen={informasjonTilLesemodus.vilkarOppfylt}
        dato={{fra: informasjonTilLesemodus.dato.fra, til: informasjonTilLesemodus.dato.til}}
        begrunnelse={informasjonTilLesemodus.begrunnelse}
      />
    </>
  );
};

export default VilkarMidlertidigAleneLesemodus;
