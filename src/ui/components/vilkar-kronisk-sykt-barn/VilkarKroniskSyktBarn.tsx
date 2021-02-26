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

  const {lesemodus, legeerklaeringsinfo, vedtakFattetVilkarOppfylt, informasjonOmVilkar} = props;

  const [harDokumentasjon, endreHarDokumentasjon] = useState<boolean>(legeerklaeringsinfo.harDokumentasjon);
  const [harSammenheng, endreHarSammenheng] = useState<boolean>(legeerklaeringsinfo.harSammenheng);
  const [begrunnelse, endreBegrunnelse] = useState<string>(legeerklaeringsinfo.begrunnelse);
  const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);

  const onSubmit = props.losAksjonspunkt;

  const byttHarDokumentasjon = () => endreHarDokumentasjon(!harDokumentasjon);
  const byttHarSammenheng = () => endreHarSammenheng(!harSammenheng);

  const feilmeldinger: Feilmeldinger = {
    begrunnelse: begrunnelse.length === 0
  };
  const kanManGaVidere = !feilmeldinger.begrunnelse;

  const onGaVidere = () => kanManGaVidere
    ? onSubmit(harDokumentasjon, harSammenheng, begrunnelse)
    : endreVisFeilmeldinger(true);

  const tekst = {
    instruksjon: 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.',
    sporsmalHarDokumentasjon: 'Er det dokumentert at barnets sykdom er kronisk eller at barnet har en funksjonshemmelse?',
    sporsmalHarSammenheng: 'Henger søkers risiko for fravær fra arbeid sammen med barnets kroniske sykdom eller funksjonshemmelse?',
    begrunnelse: 'Begrunnelse'
  };

  return <div className={classNames(styles.vilkarKroniskSyktBarn, lesemodus && !vedtakFattetVilkarOppfylt && styleLesemodus.lesemodusboks)}>

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
      <p className={styleLesemodus.fritekst}>{begrunnelse}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarDokumentasjon}</p>
      <p>{harDokumentasjon ? 'Ja' : 'Nei'}</p>
      <p className={styleLesemodus.label}>{tekst.sporsmalHarSammenheng}</p>
      <p>{harSammenheng ? 'Ja' : 'Nei'}</p>
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
        legend={tekst.sporsmalHarDokumentasjon}>
        <Radio label="Ja" name="harDokumentasjon" checked={harDokumentasjon} onChange={byttHarDokumentasjon}/>
        <Radio label="Nei" name="harIkkeDokumentasjon" checked={!harDokumentasjon} onChange={byttHarDokumentasjon}/>
      </RadioGruppe>

      <RadioGruppe
        className={styleRadioknapper.horisontalPlassering}
        legend={tekst.sporsmalHarSammenheng}>
        <Radio label="Ja" name="harSammenheng" checked={harSammenheng} onChange={byttHarSammenheng}/>
        <Radio label="Nei" name="harIkkeSammenheng" checked={!harSammenheng} onChange={byttHarSammenheng}/>
      </RadioGruppe>

      <Hovedknapp onClick={onGaVidere}>Gå videre</Hovedknapp>
    </>}
  </div>;
};
export default VilkarKroniskSyktBarn;