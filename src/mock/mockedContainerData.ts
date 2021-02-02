import ContainerContract from "../types/ContainerContract";
import Komponenter from "../types/Komponenter";
import {VilkarMidlertidigAleneDato} from "../types/VilkarMidlertidigAleneProps";

const onSubmitKroniskSyktBarn = (
  harDokumentasjon: boolean,
  harSammenheng: boolean,
  begrunnelse: string
) => {
  console.log(`OnSubmit från VilkarKroniskSyktBarn: Dokumentasjon: ${harDokumentasjon} // Sammenheng: ${harSammenheng} // Begrunnelse: ${begrunnelse}`);
};

const onSubmitVilkarMidlertidigAlene = (
  vilkarOppfylt: boolean,
  dato: VilkarMidlertidigAleneDato,
  begrunnelse: string
) => {
  console.log(`OnSubmit från VilkarMidlertidigAlene: Vilkår oppfylt: ${vilkarOppfylt} // Dato: ${dato.fra} - ${dato.til} // Begrunnelse: ${begrunnelse}`);
};

export const vilkarMidlertidigAlene: ContainerContract = {
  visKomponent: Komponenter.VILKAR_MIDLERTIDIG_ALENE,
  props: {
    type: 'VilkarMidlertidigAlene',
    soknedsopplysninger: {
      årsak: 'Årsak',
      beskrivelse: 'Beskrivelse',
      periode: 'DD.MM.ÅÅÅÅ - DD.MM.ÅÅÅÅ'
    },
    onSubmit: onSubmitVilkarMidlertidigAlene
  }
}

export const vilkarKroniskSyktBarn: ContainerContract = {
  visKomponent: Komponenter.VILKAR_KRONISK_SYKT_BARN,
  props: {
    type: 'VilkarKroniskSyktBarn',
    onSubmit: onSubmitKroniskSyktBarn,
  }
}

export const korrigerePerioder: ContainerContract = {
  visKomponent: Komponenter.KORRIGERE_PERIODER,
}
