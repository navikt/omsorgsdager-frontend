
import React from 'react';
import Omsorg from '../omsorg/Omsorg';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

describe('<Omsorg>', () => {
  test('Omsorg viser åpen aksjonspunkt som forventet', () => {
    const props = {
      lesemodus: true,
      informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      barn: ['01010050053'],
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      losAksjonspunkt: (harOmsorgen, begrunnelse) => console.log(harOmsorgen, begrunnelse)
    };

    render(
      <Omsorg {...props}/>
    );

    const aksjonspunkt = 'Barnet er ikke registrert på samme adresse som søker. Vurder om søkeren har omsorgen for barnet.';
    const opplysningerFraSoknad = 'Opplysninger fra søknaden';
    const sokersBarn = props.barn[0];
    const begrunnelse = 'Begrunn om søker har omsorgen for barnet';
    const harOmsorg = 'Har søker omsorgen for barnet?';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetOpplysningerFraSoknad = screen.getByText(opplysningerFraSoknad);
    expect(hentetOpplysningerFraSoknad).toBeInTheDocument();

    const hentetSokersBarn = screen.getByText(sokersBarn);
    expect(hentetSokersBarn).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetHarOmsorg = screen.getByText(harOmsorg);
    expect(hentetHarOmsorg).toBeInTheDocument();
  });
  

  test('Den har ingen a11y violations', async () => {
    const props = {
      lesemodus: true,
      informasjonTilLesemodus:{
        begrunnelse: 'Begrunnelse til lesemodus',
        vilkarOppfylt: false
      },
      barn: ['01010050053'],
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar:{
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      losAksjonspunkt: (harOmsorgen, begrunnelse) => console.log(harOmsorgen, begrunnelse)
    };

    const {container} = render(
      <Omsorg {...props}/>
    );

    const a11yResults = await axe(container);

    expect(a11yResults).toHaveNoViolations();
  });
});
