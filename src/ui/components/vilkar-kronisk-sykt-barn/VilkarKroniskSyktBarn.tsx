import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {Hovedknapp} from "nav-frontend-knapper";
import {Radio, RadioGruppe, Textarea} from "nav-frontend-skjema";
import React, {useState} from 'react';
import {VilkarKroniskSyktBarnProps} from "../../../types/VilkarKroniskSyktBarnProps";
import styles from './vilkarKronisSyktBarn.less';

const VilkarKroniskSyktBarn: React.FunctionComponent<VilkarKroniskSyktBarnProps> = props => {

    const [harDokumentasjon, endreHarDokumentasjon] = useState<boolean>(false);
    const [harSammenheng, endreHarSammenheng] = useState<boolean>(false);
    const [begrunnelse, endreBegrunnelse] = useState<string>("");

    const byttHarDokumentasjon = () => endreHarDokumentasjon(!harDokumentasjon);
    const byttHarSammenheng = () => endreHarSammenheng(!harSammenheng);

    return <div className={styles.vilkarKroniskSyktBarn}>
        <AlertStripeAdvarsel className={styles.varselstripe}>
            Se på vedlagt dokumentasjon/legeerklæring og vurder om barnet er kronisk sykt eller har en funksjonshemmelse.
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
        <Textarea
            label="Begrunnelse"
            onChange={e => endreBegrunnelse(e.target.value)}
            value={begrunnelse}
            maxLength={0}
        />
        <Hovedknapp onClick={() => props.onSubmit(harDokumentasjon, harSammenheng, begrunnelse)}>Gå videre</Hovedknapp>
    </div>;
};
export default VilkarKroniskSyktBarn;