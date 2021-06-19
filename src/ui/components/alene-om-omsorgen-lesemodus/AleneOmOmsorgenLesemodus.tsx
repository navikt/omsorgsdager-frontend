import React  from 'react';
import {AleneOmOmsorgenAksjonspunktObjekt} from '../../../types/AleneOmOmsorgenProps';
import {formatereDato} from '../../../util/stringUtils';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import OpplysningerFraVedtak from '../opplysninger-fra-vedtak/OpplysningerFraVedtak';
import OpplysningerFraSoknad from '../opplysninger-fra-soknad/OpplysningerFraSoknad';
import tekst from '../alene-om-omsorgen/alene-om-omsorgen-tekst';

interface OwnProps {
  fraDatoFraSoknad: string;
  informasjonTilLesemodus: AleneOmOmsorgenAksjonspunktObjekt;
  harAksjonspunktBlivitLostTidligare: boolean;
  åpneForRedigereInformasjon: () => void;
}

const AleneOmOmsorgenLesemodus: React.FunctionComponent<OwnProps> = ({
  fraDatoFraSoknad,
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
        periode={formatereDato(fraDatoFraSoknad)}
      />

      <OpplysningerFraVedtak
        tekstBegrunnelseLesemodus={tekst.begrunnelseLesemodus}
        begrunnelse={informasjonTilLesemodus.begrunnelse}
        tekstVilkarOppfylt={tekst.sporsmålVilkarOppfylt}
        erVilkarOppfylt={informasjonTilLesemodus.vilkarOppfylt}
        textVilkarOppfylt={'I hvilken periode er vedtaket gyldig?'}
        informasjonVilkarOppfylt={`${formatereDato(informasjonTilLesemodus.fraDato)} - ${formatereDato(informasjonTilLesemodus.tilDato)}`}
      />
    </>
  );
};
export default AleneOmOmsorgenLesemodus;
