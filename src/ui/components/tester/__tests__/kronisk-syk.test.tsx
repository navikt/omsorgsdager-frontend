import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';
import React from 'react';
import {VilkarKroniskSyktBarnProps} from '../../../../types/VilkarKroniskSyktBarnProps';
import VilkarKroniskSyktBarn from '../../vilkar-kronisk-sykt-barn/VilkarKroniskSyktBarn';
import FormStateTilTest from '../dataTilTest/FormStateTilTest';

describe('<VilkarKroniskSyktBarn>', () => {
  test('VilkarKroniskSyktBarn viser åpen aksjonspunkt som forventet', () => {
    const props = {
      behandlingsID: '123',
      lesemodus: false,
      aksjonspunktLost: false,
      informasjonTilLesemodus: {
        begrunnelse: '',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const aksjonspunkt = 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemming, og om det er økt risiko for fravær.';
    const begrunnelseText = 'Vurdering';
    const vilkarOppfyltText = 'Er det dokumentert at barnet har en kronisk sykdom eller funksjonshemming som gir rett?';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBegrunnelseText = screen.getByText(begrunnelseText);
    expect(hentetBegrunnelseText).toBeInTheDocument();

    const hentetVilkarOppfyltText = screen.getByText(vilkarOppfyltText);
    expect(hentetVilkarOppfyltText).toBeInTheDocument();

  });

  test('VilkarKroniskSyktBarn viser åpen aksjonspunkt med informasjon fra tidigare lost vilkar (kommer tillbake etter totrinnskontroll)', () => {
    const props = {
      behandlingsID: '123',
      lesemodus: false,
      aksjonspunktLost: false,
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const hentetBegrunnelseInputText = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelseInputText).toBeInTheDocument();
  });

  test('VilkarKroniskSyktBarn viser lesemodus', () => {
    const props = {
      behandlingsID: '123',
      lesemodus: true,
      aksjonspunktLost: false,
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const aksjonspunkt = 'Se på vedlagt legeerklæring og vurder om barnet har en kronisk sykdom eller en funksjonshemming, og om det er økt risiko for fravær.';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBehandletAksjonspunktTekst = screen.getByText('Behandlet aksjonspunkt:');
    expect(hentetBehandletAksjonspunktTekst).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText(props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei');
    expect(hentetVilkarOppfylt).toBeInTheDocument();
  });

  test('VilkarKroniskSyktBarn viser lesemodus med redigering', () => {
    const props = {
      behandlingsID: '123',
      lesemodus: true,
      aksjonspunktLost: true,
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
    } as VilkarKroniskSyktBarnProps;

    render(<VilkarKroniskSyktBarn {...props}/>);

    const hentetRedigerVurderingTekst = screen.getByText('Rediger vurdering');
    expect(hentetRedigerVurderingTekst).toBeInTheDocument();
  });

  test('VilkarKroniskSyktBarn viser informasjon om vilkar etter fattet vedtak', () => {
    const props = {
      behandlingsID: '123',
      lesemodus: false,
      aksjonspunktLost: false,
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
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
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: false,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
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
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false,
        avslagsArsakErIkkeRiskioFraFravaer: true
      },
      losAksjonspunkt: (endreHarDokumentasjonOgFravaerRisiko, begrunnelse) => console.log(endreHarDokumentasjonOgFravaerRisiko, begrunnelse),
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: false,
        vilkar: '§ 9-3 vilkar'
      },
      formState: FormStateTilTest
    } as VilkarKroniskSyktBarnProps;

    const {container} = render(<VilkarKroniskSyktBarn {...props}/>);

    const a11yResults = await axe(container);

    expect(a11yResults).toHaveNoViolations();
  });
});
