import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';
import React from 'react';
import {KorrigerePerioderProps} from '../../../types/KorrigerePerioderProps';
import KorrigerePerioder from '../korrigere-perioder/KorrigerePerioder';

describe('<KorrigerePerioder>', () => {
  test('KorrigerePerioder viser åpen aksjonspunkt som forventet', () => {
    const props = {
      lesemodus: false,
      årsakFraSoknad: 'Årsak',
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse)
    } as KorrigerePerioderProps;

    render(<KorrigerePerioder {...props}/>);

    const aksjonspunkt = 'Se på nødvendig dokumentasjon og tidligere utbetalte perioder, og vurder om søker har rett på å få utbetalt flere dager.';
    const begrunnelseTekst = 'Har søker rett på å få utbetalt flere dager?';
    const vilkarOppfyltTekst = 'Skyldes fraværet særlig smittevernhensyn eller stengte barnehager/skole/SFO?';
    const årsakTekst = 'Opplysninger fra sist innsendte søknad:';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetBegrunnelseText = screen.getByText(begrunnelseTekst);
    expect(hentetBegrunnelseText).toBeInTheDocument();

    const hentetVilkarOppfyltText = screen.getByText(vilkarOppfyltTekst);
    expect(hentetVilkarOppfyltText).toBeInTheDocument();

    const hentetÅrsakTekst = screen.getByText(årsakTekst);
    expect(hentetÅrsakTekst).toBeInTheDocument();

    const hentetÅrsak = screen.getByText(props.årsakFraSoknad);
    expect(hentetÅrsak).toBeInTheDocument();

  });

  test('KorrigerePerioder viser lesemodus', () => {
    const props = {
      lesemodus: true,
      årsakFraSoknad: 'Årsak',
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse)
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

  test('Den har ingen a11y violations', async () => {
    const props = {
      lesemodus: true,
      årsakFraSoknad: 'Årsak',
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      losAksjonspunkt: (fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse) => console.log(fravaerGrunnetSmittevernhensynEllerStengt, begrunnelse)
    } as KorrigerePerioderProps;

    const {container} = render(<KorrigerePerioder {...props}/>);

    const a11yResults = await axe(container);

    expect(a11yResults).toHaveNoViolations();
  });
});
