import React  from 'react';
import {AleneOmOmsorgenAksjonspunktObjekt, AleneOmOmsorgenSoknadsopplysninger} from '../../../types/AleneOmOmsorgenProps';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import OpplysningerFraVedtak from '../opplysninger-fra-vedtak/OpplysningerFraVedtak';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import tekst from '../alene-om-omsorgen/alene-om-omsorgen-tekst';

interface OwnProps {
  soknadsopplysninger: AleneOmOmsorgenSoknadsopplysninger;
  informasjonTilLesemodus: AleneOmOmsorgenAksjonspunktObjekt;
  harAksjonspunktBlivitLostTidligare: boolean;
  åpneForRedigereInformasjon: () => void;
}

const AleneOmOmsorgenLesemodus: React.FunctionComponent<OwnProps> = ({
  soknadsopplysninger,
  informasjonTilLesemodus,
  harAksjonspunktBlivitLostTidligare,
  åpneForRedigereInformasjon
}) => {
  return (
    <>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.aksjonspunkt}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={åpneForRedigereInformasjon}
      />

      <OpplysningerFraSoknad
        periodeTekst={'Fra dato oppgitt'}
        periode={soknadsopplysninger.fraDato}
        {...soknadsopplysninger}
      />
      <OpplysningerFraVedtak
        tekstBegrunnelseLesemodus={tekst.begrunnelseLesemodus}
        begrunnelse={informasjonTilLesemodus.begrunnelse}
        tekstVilkarOppfylt={tekst.sporsmålVilkarOppfylt}
        erVilkarOppfylt={informasjonTilLesemodus.vilkarOppfylt}
        textVilkarOppfylt={'Fra vilket dato er vedtaket gyldig?'}
        informasjonVilkarOppfylt={informasjonTilLesemodus.fraDato}
        textVilkarIkkeOppfylt={tekst.arsak}
        årsakVilkarIkkeOppfylt={informasjonTilLesemodus.avslagsArsakErPeriodeErIkkeOverSeksMån ? tekst.arsakPeriodeIkkeOverSeksMån : tekst.arsakIkkeAleneOmsorg}
      />
    </>
  );
};
export default AleneOmOmsorgenLesemodus;
