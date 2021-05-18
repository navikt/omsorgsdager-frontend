import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';
import React from 'react';
import {KorrigerePerioderProps} from '../../../../types/KorrigerePerioderProps';
import KorrigerePerioder from '../../korrigere-perioder/KorrigerePerioder';
import FormStateTilTest from '../dataTilTest/FormStateTilTest';

describe('<KorrigerePerioder>', () => {
  test('KorrigerePerioder viser åpen aksjonspunkt som forventet', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      årsakerFraSoknad: ['Årsak', 'årsaker'],
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse),
      formState: FormStateTilTest,
    } as KorrigerePerioderProps;

    render(<KorrigerePerioder {...props}/>);

    const aksjonspunkt = 'Se på nødvendig dokumentasjon og tidligere utbetalte perioder, og vurder om søker har rett på å få utbetalt flere dager.';
    const begrunnelseTekst = 'Vurder om søker har rett på å få utbetalt flere dager';
    const vilkarOppfyltTekst = 'Har søker rett på å få utbetalt flere dager?';
    const årsakTekst = 'Opplysninger fra innsendte søknader:';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBegrunnelseText = screen.getByText(begrunnelseTekst);
    expect(hentetBegrunnelseText).toBeInTheDocument();

    const hentetVilkarOppfyltText = screen.getByText(vilkarOppfyltTekst);
    expect(hentetVilkarOppfyltText).toBeInTheDocument();

    const hentetÅrsakTekst = screen.getByText(årsakTekst);
    expect(hentetÅrsakTekst).toBeInTheDocument();

    const hentetÅrsak = screen.getByText(props.årsakerFraSoknad[0]);
    expect(hentetÅrsak).toBeInTheDocument();

  });

  test('KorrigerePerioder viser lesemodus', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: true,
      årsakerFraSoknad: ['Årsak'],
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse),
      formState: FormStateTilTest
    } as KorrigerePerioderProps;
    render(<KorrigerePerioder {...props}/>);

    const aksjonspunkt = 'Se på nødvendig dokumentasjon og tidligere utbetalte perioder, og vurder om søker har rett på å få utbetalt flere dager.';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBehandletAksjonspunktTekst = screen.getByText('Behandlet aksjonspunkt:');
    expect(hentetBehandletAksjonspunktTekst).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText(props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei');
    expect(hentetVilkarOppfylt).toBeInTheDocument();
  });

  test('KorrigerePerioder viser lesemodus med redigering', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: true,
      lesemodus: true,
      årsakerFraSoknad: ['Årsak'],
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse),
      formState: FormStateTilTest
    } as KorrigerePerioderProps;
    render(<KorrigerePerioder {...props}/>);

    const hentetRedigerVurderingTekst = screen.getByText('Rediger vurdering');
    expect(hentetRedigerVurderingTekst).toBeInTheDocument();
  });

  test('Den har ingen a11y violations', async () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: true,
      årsakerFraSoknad: ['Årsak'],
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse),
      formState: FormStateTilTest
    } as KorrigerePerioderProps;

    const {container} = render(<KorrigerePerioder {...props}/>);

    const a11yResults = await axe(container);

    expect(a11yResults).toHaveNoViolations();
  });
});
