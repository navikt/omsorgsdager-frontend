import React  from 'react';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import OpplysningerFraVedtak from '../opplysninger-fra-vedtak/OpplysningerFraVedtak';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import {VilkarMidlertidigInformasjonTilLesemodus, VilkarMidlertidigSoknadsopplysninger} from '../../../types/VilkarMidlertidigAleneProps';

interface OwnProps {
  soknadsopplysninger: VilkarMidlertidigSoknadsopplysninger;
  informasjonTilLesemodus: VilkarMidlertidigInformasjonTilLesemodus;
  harAksjonspunktBlivitLostTidligare: boolean;
  åpneForRedigereInformasjon: () => void;
}

const VilkarMidlertidigAleneLesemodus: React.FunctionComponent<OwnProps> = ({
  soknadsopplysninger,
  informasjonTilLesemodus,
  harAksjonspunktBlivitLostTidligare,
  åpneForRedigereInformasjon
}) => {
  return (
    <>
      <AksjonspunktLesemodus
        aksjonspunktTekst={'Vurder om vilkår om midlertidig alene om omsorgen er oppfylt.'}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={åpneForRedigereInformasjon}
      />

      <OpplysningerFraSoknad {...soknadsopplysninger}/>

      <OpplysningerFraVedtak
        erSokerenMidlertidigAleneOmOmsorgen={informasjonTilLesemodus.vilkarOppfylt}
        dato={{fra: informasjonTilLesemodus.dato.fra, til: informasjonTilLesemodus.dato.til}}
        begrunnelse={informasjonTilLesemodus.begrunnelse}
        erVilkarOppfylt={informasjonTilLesemodus.vilkarOppfylt}
        avslagsÅrsakPeriodeErIkkeOverSeksMån={informasjonTilLesemodus.avslagsArsakErPeriodeErIkkeOverSeksMån}
      />
    </>
  );
};

export default VilkarMidlertidigAleneLesemodus;
