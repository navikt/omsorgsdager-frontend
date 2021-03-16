import classNames from 'classnames';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import AksjonspunktLesemodus from '../aksjonspunkt-lesemodus/AksjonspunktLesemodus';
import AlertStripeTrekantVarsel from '../alertstripe-trekant-varsel/AlertStripeTrekantVarsel';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './vilkarKronisSyktBarn.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';

interface Feilmeldinger {
  begrunnelse: boolean;
}

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

  const {lesemodus, losAksjonspunkt, informasjonTilLesemodus, aksjonspunktLost, vedtakFattetVilkarOppfylt, informasjonOmVilkar} = props;

  const [harDokumentasjonOgFravaerRisiko, endreHarDokumentasjonOgFravaerRisiko] = useState<boolean>(aksjonspunktLost ? informasjonTilLesemodus.vilkarOppfylt : false);
  const [arsakErIkkeRiskioFraFravaer, endreErArsakIkkeRiskioFraFravaer] = useState<boolean>(aksjonspunktLost ? informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer : false);
  const [begrunnelse, endreBegrunnelse] = useState<string>(aksjonspunktLost ? informasjonTilLesemodus.begrunnelse : '');
  const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);
  const [harAksjonspunktBlivitLostTidligare] = useState<boolean>(aksjonspunktLost);
  const [åpenForRedigering, endreÅpenForRedigering] = useState<boolean>(false);

  const onSubmit = losAksjonspunkt;

  const feilmeldinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0
  };
  const kanManGaVidere = !feilmeldinger.begrunnelse;

  const onGaVidere = () => kanManGaVidere
    ? onSubmit(harDokumentasjonOgFravaerRisiko, begrunnelse, arsakErIkkeRiskioFraFravaer)
    : endreVisFeilmeldinger(true);

  const tekst = {
    instruksjon: 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.',
    sporsmalHarDokumentasjonOgFravaerRisiko: 'Er det dokumentert at barnet har en kronisk sykdom eller en funksjonshemming?',
    arsak: 'Årsak',
    begrunnelse: 'Begrunnelse',
    velgArsak: 'Velg årsak',
    arsakIkkeSyk: 'Barnet har ikke en kronisk sykdom eller funksjonshemming',
    arsakIkkeRisikoFraFravaer: 'Det er ikke økt risiko for fravær fra arbeid'
  };

  return <div
    className={classNames(styles.vilkarKroniskSyktBarn, lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && styleLesemodus.lesemodusboks)}>
    {vedtakFattetVilkarOppfylt && <VilkarStatus
      vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
      aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
      vilkarReferanse={informasjonOmVilkar.vilkar}
      begrunnelse={informasjonOmVilkar.begrunnelse}
      erVilkaretForOmsorgenFor={false}
    />}

    {lesemodus && !åpenForRedigering && !vedtakFattetVilkarOppfylt && <>
      <AksjonspunktLesemodus
        aksjonspunktTekst={tekst.instruksjon}
        harAksjonspunktBlivitLostTidligare={harAksjonspunktBlivitLostTidligare}
        åpneForRedigereInformasjon={() => endreÅpenForRedigering(true)}
      />

      <p className={styleLesemodus.label}>{tekst.sporsmalHarDokumentasjonOgFravaerRisiko}</p>
      <p className={styleLesemodus.text}>{informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
      {!informasjonTilLesemodus.vilkarOppfylt && <>
        <p className={styleLesemodus.label}>{tekst.arsak}</p>
        <p className={styleLesemodus.text}>{
          informasjonTilLesemodus.avslagsArsakErIkkeRiskioFraFravaer ? tekst.arsakIkkeRisikoFraFravaer : tekst.arsakIkkeSyk
        }</p></>
      }
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{informasjonTilLesemodus.begrunnelse}</p>
    </>}

    {(åpenForRedigering || !lesemodus && !vedtakFattetVilkarOppfylt) && <>
      <AlertStripeTrekantVarsel text={tekst.instruksjon}/>

      <Textarea
        label={tekst.begrunnelse}
        onChange={e => endreBegrunnelse(e.target.value)}
        value={begrunnelse}
        maxLength={0}
        feil={visFeilmeldinger && feilmeldinger.begrunnelse && 'Begrunnelse må oppgis.'}
      />

      <RadioGruppe
        className={styleRadioknapper.horisontalPlassering}
        legend={tekst.sporsmalHarDokumentasjonOgFravaerRisiko}>
        <Radio label="Ja"
               name="harDokumentasjonOgFravaerRisiko"
               checked={harDokumentasjonOgFravaerRisiko}
               onChange={() => endreHarDokumentasjonOgFravaerRisiko(true)}/>
        <Radio label="Nei"
               name="harIkkeDokumentasjonOgFravaerRisiko"
               checked={!harDokumentasjonOgFravaerRisiko}
               onChange={() => endreHarDokumentasjonOgFravaerRisiko(false)}/>
      </RadioGruppe>

      {!harDokumentasjonOgFravaerRisiko && <RadioGruppe
        className={styleRadioknapper.horisontalPlassering}
        legend={tekst.velgArsak}>
        <Radio label={tekst.arsakIkkeSyk}
               name="harIkkeDokumentasjonForSykEllerFunksjonshemmet"
               checked={!arsakErIkkeRiskioFraFravaer}
               onChange={() => endreErArsakIkkeRiskioFraFravaer(false)}/>
        <Radio label={tekst.arsakIkkeRisikoFraFravaer}
               name="harIkkeFravaerRisiko"
               checked={arsakErIkkeRiskioFraFravaer}
               onChange={() => endreErArsakIkkeRiskioFraFravaer(true)}/>
      </RadioGruppe>}

      <Hovedknapp onClick={onGaVidere}>Bekreft og fortsett</Hovedknapp>
    </>}
  </div>;
};
export default VilkarKroniskSyktBarn;