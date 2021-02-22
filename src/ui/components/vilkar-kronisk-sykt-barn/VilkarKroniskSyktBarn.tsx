import classNames from 'classnames';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Radio, RadioGruppe, Textarea} from 'nav-frontend-skjema';
import React, {useState} from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import Feilikon from '../../icons/Feilikon';
import Suksessikon from '../../icons/Suksessikon';
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './vilkarKronisSyktBarn.less';

interface Feilmeldinger {
  vilkar: boolean;
  begrunnelse: boolean;
}

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

  const {lesemodus, legeerklaeringsinfo} = props;

  const [harDokumentasjon, endreHarDokumentasjon] = useState<boolean>(legeerklaeringsinfo.harDokumentasjon);
  const [harSammenheng, endreHarSammenheng] = useState<boolean>(legeerklaeringsinfo.harSammenheng);
  const [begrunnelse, endreBegrunnelse] = useState<string>(legeerklaeringsinfo.begrunnelse);
  const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);

  const onSubmit = props.losAksjonspunkt;

  const byttHarDokumentasjon = () => endreHarDokumentasjon(!harDokumentasjon);
  const byttHarSammenheng = () => endreHarSammenheng(!harSammenheng);

  const kanManGaVidere = harDokumentasjon && harSammenheng && begrunnelse;
  const feilmeldinger: Feilmeldinger = {
    vilkar: !harDokumentasjon || !harSammenheng,
    begrunnelse: begrunnelse.length === 0
  };

  const onGaVidere = () => kanManGaVidere
    ? onSubmit(harDokumentasjon, harSammenheng, begrunnelse)
    : endreVisFeilmeldinger(true);

  const tekst = {
    instruksjon: 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.',
    sporsmalHarDokumentasjon: 'Er det dokumentert at barnets sykdom er kronisk eller at barnet har en funksjonshemmelse?',
    sporsmalHarSammenheng: 'Henger søkers risiko for fravær fra arbeid sammen med barnets kroniske sykdom eller funksjonshemmelse?',
    begrunnelse: 'Begrunnelse'
  };

  return <div className={classNames(styles.vilkarKroniskSyktBarn, lesemodus && styleLesemodus.lesemodusboks)}>

    {lesemodus
      ? <>
          <p><b>Behandlet aksjonspunkt:</b> {tekst.instruksjon}</p>
          <p className={styleLesemodus.label}>{tekst.sporsmalHarDokumentasjon}</p>
          <p>{harDokumentasjon ? 'Ja' : 'Nei'}</p>
          <p className={styleLesemodus.label}>{tekst.sporsmalHarSammenheng}</p>
          <p>{harSammenheng ? 'Ja' : 'Nei'}</p>
        </>
      : <>
          <AlertStripeAdvarsel className={styles.varselstripe}>
            {tekst.instruksjon}
          </AlertStripeAdvarsel>
          <RadioGruppe
            className={styles.jaellernei}
            legend={tekst.sporsmalHarDokumentasjon}
          >
            <Radio label="Ja" name="harDokumentasjon" checked={harDokumentasjon} onChange={byttHarDokumentasjon}/>
            <Radio label="Nei" name="harIkkeDokumentasjon" checked={!harDokumentasjon} onChange={byttHarDokumentasjon}/>
          </RadioGruppe>
          <RadioGruppe
            className={styles.jaellernei}
            legend={tekst.sporsmalHarSammenheng}
          >
            <Radio label="Ja" name="harSammenheng" checked={harSammenheng} onChange={byttHarSammenheng}/>
            <Radio label="Nei" name="harIkkeSammenheng" checked={!harSammenheng} onChange={byttHarSammenheng}/>
          </RadioGruppe>
        </>}

    {harDokumentasjon && harSammenheng && <div className={styles.vilkarOppfylt}>
        <Suksessikon/>
        <span>Vilkåret er oppfylt</span>
    </div>}
    {visFeilmeldinger && feilmeldinger.vilkar && <div className={styles.vilkarOppfylt}>
        <Feilikon/>
        <span>Vilkåret er ikke oppfylt</span>
    </div>}

    {lesemodus
      ? <>
          <p className={styleLesemodus.label}>{tekst.begrunnelse}</p>
          <p className={styleLesemodus.fritekst}>{begrunnelse}</p>
        </>
      : <>
          <Textarea
            label={tekst.begrunnelse}
            onChange={e => endreBegrunnelse(e.target.value)}
            value={begrunnelse}
            maxLength={0}
            feil={visFeilmeldinger && feilmeldinger.begrunnelse && 'Begrunnelse må oppgis.'}
          />
          <Hovedknapp onClick={onGaVidere}>Gå videre</Hovedknapp>
        </>}

  </div>;
};
export default VilkarKroniskSyktBarn;