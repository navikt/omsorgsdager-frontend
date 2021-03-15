import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';
import React from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../types/VilkarKroniskSyktBarnProps';
import {VilkarMidlertidigAleneProps} from '../../../types/VilkarMidlertidigAleneProps';
import Omsorg from '../omsorg/Omsorg';
import VilkarKroniskSyktBarn from '../vilkar-kronisk-sykt-barn/VilkarKroniskSyktBarn';
import VilkarMidlertidigAlene from '../vilkar-midlertidig-alene/VilkarMidlertidigAlene';

describe('<VilkarKroniskSyktBarn>', () => {
  test('VilkarKroniskSyktBarn viser åpen aksjonspunkt som forventet', () => {
    const props =  {
      lesemodus: false,
        informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
          vilkarOppfylt: false
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
        vedtakFattetVilkarOppfylt: false,
        informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
          navnPåAksjonspunkt: 'Utvidet rett',
          vilkarOppfylt: true,
          vilkar: '§ 9-3 vilkar'
      }
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const aksjonspunkt = 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.';
    const begrunnelseText = 'Begrunnelse';
    const vilkarOppfyltText = 'Henger søkers risiko for fravær fra arbeid sammen med barnets kroniske sykdom eller funksjonshemmelse?';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBegrunnelseText = screen.getByText(begrunnelseText);
    expect(hentetBegrunnelseText).toBeInTheDocument();

    const hentetVilkarOppfyltText = screen.getByText(vilkarOppfyltText);
    expect(hentetVilkarOppfyltText).toBeInTheDocument();

  });

  test('VilkarKroniskSyktBarn viser lesemodus', () => {
    const props =  {
      lesemodus: true,
      informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      }
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const aksjonspunkt = 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemmelse, og om det er økt risiko for fravær.';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBehandletAksjonspunktTekst = screen.getByText('Behandlet aksjonspunkt:');
    expect(hentetBehandletAksjonspunktTekst).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText(props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei');
    expect(hentetVilkarOppfylt).toBeInTheDocument();
  });

  test('VilkarKroniskSyktBarn viser informasjon om vilkar etter fattet vedtak', () => {
    const props =  {
      lesemodus: false,
      informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      }
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const hentetNavnPåAksjonspunkt = screen.getByText(props.informasjonOmVilkar.navnPåAksjonspunkt);
    expect(hentetNavnPåAksjonspunkt).toBeInTheDocument();

    const hentetVilkar = screen.getByText(props.informasjonOmVilkar.vilkar);
    expect(hentetVilkar).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonOmVilkar.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText('Vilkåret er oppfylt');
    expect(hentetVilkarOppfylt).toBeInTheDocument();

  });

  test('VilkarKroniskSyktBarn viser informasjon om vilkar ikke oppfylt etter fattet vedtak', () => {
    const props =  {
      lesemodus: false,
      informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: false,
        vilkar: '§ 9-3 vilkar'
      }
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const hentetVilkar = screen.getByText(props.informasjonOmVilkar.vilkar);
    expect(hentetVilkar).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonOmVilkar.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText('Vilkåret er ikke oppfylt');
    expect(hentetVilkarOppfylt).toBeInTheDocument();

  });

  test('Den har ingen a11y violations', async () => {
    const props =  {
      lesemodus: false,
      informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: false,
        vilkar: '§ 9-3 vilkar'
      }
    } as VilkarKroniskSyktBarnProps;

    const {container} = render(<VilkarKroniskSyktBarn {...props}/>);

    const a11yResults = await axe(container);

    expect(a11yResults).toHaveNoViolations();
  });
});
