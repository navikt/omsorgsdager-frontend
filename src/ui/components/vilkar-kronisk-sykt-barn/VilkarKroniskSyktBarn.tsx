import classNames from 'classnames';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './vilkarKronisSyktBarn.less';
import VilkarStatus from '../vilkar-status/VilkarStatus';
import styleRadioknapper from '../styles/radioknapper/radioknapper.less';

interface Feilmeldinger {
  begrunnelse: boolean;
}

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

  const {lesemodus, informasjonTilLesemodus, vedtakFattetVilkarOppfylt, informasjonOmVilkar} = props;

  const [harDokumentasjonOgFravaerRisiko, endreHarDokumentasjonOgFravaerRisiko] = useState<boolean>(false);
  const [begrunnelse, endreBegrunnelse] = useState<string>('');
  const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);

  const onSubmit = props.losAksjonspunkt;

  const feilmeldinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0
  };
  const kanManGaVidere = !feilmeldinger.begrunnelse;

  const onGaVidere = () => kanManGaVidere
    ? onSubmit(harDokumentasjonOgFravaerRisiko, begrunnelse)
    : endreVisFeilmeldinger(true);

  const tekst = {
    instruksjon: 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.',
    sporsmalHarDokumentasjonOgFravaerRisiko: 'Henger søkers risiko for fravær fra arbeid sammen med barnets kroniske sykdom eller funksjonshemmelse?',
    begrunnelse: 'Begrunnelse'
  };

  return <div
    className={classNames(styles.vilkarKroniskSyktBarn, lesemodus && !vedtakFattetVilkarOppfylt && styleLesemodus.lesemodusboks)}>

    {vedtakFattetVilkarOppfylt && <VilkarStatus
      vilkarOppfylt={informasjonOmVilkar.vilkarOppfylt}
      aksjonspunktNavn={informasjonOmVilkar.navnPåAksjonspunkt}
      vilkarReferanse={informasjonOmVilkar.vilkar}
      begrunnelse={informasjonOmVilkar.begrunnelse}
      erVilkaretForOmsorgenFor={false}
    />}

    {lesemodus && !vedtakFattetVilkarOppfylt && <>
      <p><b>Behandlet aksjonspunkt:</b> {tekst.instruksjon}</p>
      <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
      <p className={styleLesemodus.fritekst}>{informasjonTilLesemodus.begrunnelse}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarDokumentasjonOgFravaerRisiko}</p>
      <p>{informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei'}</p>
    </>}

    {!lesemodus && !vedtakFattetVilkarOppfylt && <>
      <AlertStripeAdvarsel className={styles.varselstripe}>
        {tekst.instruksjon}
      </AlertStripeAdvarsel>

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

      <Hovedknapp onClick={onGaVidere}>Gå videre</Hovedknapp>
    </>}
  </div>;
};
export default VilkarKroniskSyktBarn;