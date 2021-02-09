import classNames from 'classnames';
import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {Hovedknapp} from "nav-frontend-knapper";
import {Radio, RadioGruppe, Textarea} from "nav-frontend-skjema";
import React, {useState} from 'react';
import {KroniskSyktBarnAksjonspunktRequest} from "../../../types/KroniskSyktBarnAksjonspunktRequest";
import {VilkarKroniskSyktBarnProps} from "../../../types/VilkarKroniskSyktBarnProps";
import {patch} from "../../../util/apiUtils";
import Feilikon from "../../icons/Feilikon";
import Suksessikon from "../../icons/Suksessikon";
import styleLesemodus from '../lesemodus/lesemodusboks.less';
import styles from './vilkarKronisSyktBarn.less';

interface Feilmeldinger {
    vilkar: boolean;
    begrunnelse: boolean;
}

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

    const [harDokumentasjon, endreHarDokumentasjon] = useState<boolean>(false);
    const [harSammenheng, endreHarSammenheng] = useState<boolean>(false);
    const [begrunnelse, endreBegrunnelse] = useState<string>("");
    const [visFeilmeldinger, endreVisFeilmeldinger] = useState<boolean>(false);

    const onSubmit = () => {
        const request: KroniskSyktBarnAksjonspunktRequest = {
            LEGEERKLÆRING: {
                vurdering: begrunnelse,
                barnetErKroniskSyktEllerHarEnFunksjonshemning: harDokumentasjon,
                erSammenhengMedSøkersRisikoForFraværeFraArbeid: harSammenheng
            },
            OMSORGEN_FOR: {}
        };
        try {
            patch(
                `${props.stiTilEndepunkt}/kronisk-sykt-barn/${props.behandlingsid}/aksjonspunkt`,
                request
            );
        } catch (e) {
            console.error(e);
        }
    };

    const byttHarDokumentasjon = () => endreHarDokumentasjon(!harDokumentasjon);
    const byttHarSammenheng = () => endreHarSammenheng(!harSammenheng);

    const kanManGaVidere = harDokumentasjon && harSammenheng && begrunnelse;
    const feilmeldinger: Feilmeldinger = {
        vilkar: !harDokumentasjon || !harSammenheng,
        begrunnelse: begrunnelse.length === 0
    };

    const onGaVidere = () => kanManGaVidere
        ? onSubmit()
        : endreVisFeilmeldinger(true);

    return <div className={classNames(styles.vilkarKroniskSyktBarn, props.lesemodus && styleLesemodus.lesemodusboks)}>
        <AlertStripeAdvarsel className={styles.varselstripe}>
            Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.
        </AlertStripeAdvarsel>
        <RadioGruppe
            className={styles.jaellernei}
            legend="Er det dokumentert at barnets sykdom er kronisk eller at barnet har en funksjonshemmelse?"
        >
            <Radio label="Ja" name="harDokumentasjon" checked={harDokumentasjon} onChange={byttHarDokumentasjon}/>
            <Radio label="Nei" name="harIkkeDokumentasjon" checked={!harDokumentasjon} onChange={byttHarDokumentasjon}/>
        </RadioGruppe>
        <RadioGruppe
            className={styles.jaellernei}
            legend="Henger søkers risiko for fravær fra arbeid sammen med barnets kroniske sykdom eller funksjonshemmelse?"
        >
            <Radio label="Ja" name="harSammenheng" checked={harSammenheng} onChange={byttHarSammenheng}/>
            <Radio label="Nei" name="harIkkeSammenheng" checked={!harSammenheng} onChange={byttHarSammenheng}/>
        </RadioGruppe>
        {harDokumentasjon && harSammenheng && <div className={styles.vilkarOppfylt}>
            <Suksessikon/>
            <span>Vilkåret er oppfylt</span>
        </div>}
        {visFeilmeldinger && feilmeldinger.vilkar && <div className={styles.vilkarOppfylt}>
            <Feilikon/>
            <span>Vilkåret er ikke oppfylt</span>
        </div>}
        <Textarea
            label="Begrunnelse"
            onChange={e => endreBegrunnelse(e.target.value)}
            value={begrunnelse}
            maxLength={0}
            feil={visFeilmeldinger && feilmeldinger.begrunnelse && "Begrunnelse må oppgis."}
        />
        <Hovedknapp onClick={onGaVidere}>Gå videre</Hovedknapp>
    </div>;
};
export default VilkarKroniskSyktBarn;