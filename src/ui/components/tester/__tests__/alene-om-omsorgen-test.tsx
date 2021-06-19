import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';
import React from 'react';
import {AleneOmOmsorgenProps} from '../../../../types/AleneOmOmsorgenProps';
import AleneOmOmsorgen from '../../alene-om-omsorgen/AleneOmOmsorgen';
import FormStateTilTest from '../dataTilTest/FormStateTilTest';

describe('<AleneOmOmsorgen>', () => {
  test('AleneOmOmsorgen viser åpen aksjonspunkt som forventet', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: '',
        vilkarOppfylt: true,
        fraDato: '',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(<AleneOmOmsorgen {...props}/>);

    const aksjonspunkt = 'Vurder om vilkår for alene om omsorgen er oppfylt.';
    const oppgittPeriodeText = 'Fra dato oppgitt';

    const begrunnelseText = 'Vurder om vilkåret for alene om omsorgen er oppfylt';
    const vilkarOppfyltText = 'Er vilkåret om alene om omsorgen er oppfylt?';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetOppgittPeriodeText = screen.getByText(oppgittPeriodeText);
    expect(hentetOppgittPeriodeText).toBeInTheDocument();

    const hentetBegrunnelseText = screen.getByText(begrunnelseText);
    expect(hentetBegrunnelseText).toBeInTheDocument();

    const hentetVilkarOppfyltText = screen.getByText(vilkarOppfyltText);
    expect(hentetVilkarOppfyltText).toBeInTheDocument();

  });

  test('AleneOmOmsorgen viser åpen aksjonspunkt med informasjon fra tidigare lost vilkar (kommer tillbake etter totrinnskontroll)', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse',
        vilkarOppfylt: true,
        fraDato: '22.12.1994',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(<AleneOmOmsorgen {...props}/>);

    const hentetBegrunnelseInputText = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelseInputText).toBeInTheDocument();

    const hentetFraDato = screen.getByDisplayValue(props.informasjonTilLesemodus.fraDato);
    expect(hentetFraDato).toBeDefined();

    const hentetTilDato = screen.getByDisplayValue(props.informasjonTilLesemodus.tilDato);
    expect(hentetTilDato).toBeDefined();
  });

  test('AleneOmOmsorgen viser lesemodus', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: true,
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse',
        vilkarOppfylt: true,
        fraDato: '22.12.1994',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(
      <AleneOmOmsorgen {...props}/>
    );

    const aksjonspunkt = 'Vurder om vilkår for alene om omsorgen er oppfylt.';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetPeriode = screen.getAllByText(props.fraDatoFraSoknad);
    expect(hentetPeriode).toHaveLength(1);

    const hentetBegrunnelseTekst = screen.getByText('Vurdering');
    expect(hentetBegrunnelseTekst).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText(props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei');
    expect(hentetVilkarOppfylt).toBeInTheDocument();

    const hentetVilkarOppfyltPeriodeTekst = screen.getByText('I hvilken periode er vedtaket gyldig?');
    expect(hentetVilkarOppfyltPeriodeTekst).toBeInTheDocument();

    const hentetVilkarOppfyltPeriode = screen.getByText(`${props.informasjonTilLesemodus.fraDato} - ${props.informasjonTilLesemodus.tilDato}`);
    expect(hentetVilkarOppfyltPeriode).toBeInTheDocument();
  });

  test('AleneOmOmsorgen viser lesemodus med rediger', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: true,
      lesemodus: true,
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse',
        vilkarOppfylt: true,
        fraDato: '22.12.1994',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(
      <AleneOmOmsorgen {...props}/>
    );

    const hentetRedigerVurderingTekst = screen.getByText('Rediger vurdering');
    expect(hentetRedigerVurderingTekst).toBeInTheDocument();
  });

  test('AleneOmOmsorgen viser informasjon om vilkar etter fattet vedtak', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse',
        vilkarOppfylt: true,
        fraDato: '22.12.1994',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(
      <AleneOmOmsorgen {...props}/>
    );

    const hentetNavnPåAksjonspunkt = screen.getByText(props.informasjonOmVilkar.navnPåAksjonspunkt);
    expect(hentetNavnPåAksjonspunkt).toBeInTheDocument();

    const hentetVilkar = screen.getByText(props.informasjonOmVilkar.vilkar);
    expect(hentetVilkar).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonOmVilkar.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText('Vilkåret er oppfylt');
    expect(hentetVilkarOppfylt).toBeInTheDocument();

  });

  test('Alene om omsorgen viser informasjon om vilkar ikke oppfylt etter fattet vedtak', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: false,
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: true,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: false,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse',
        vilkarOppfylt: false,
        fraDato: '22.12.1994',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(<AleneOmOmsorgen {...props}/>);

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
      fraDatoFraSoknad: '22.22.02',
      tomDato: '23.22.02',
      vedtakFattetVilkarOppfylt: false,
      informasjonOmVilkar: {
        begrunnelse: 'begrunnelse',
        navnPåAksjonspunkt: 'Utvidet rett',
        vilkarOppfylt: true,
        vilkar: '§ 9-3 vilkar'
      },
      informasjonTilLesemodus: {
        begrunnelse: 'Begrunnelse',
        vilkarOppfylt: true,
        fraDato: '22.12.1994',
        tilDato: '22.12.2020',
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    const {container} = render(<AleneOmOmsorgen {...props}/>);

    const a11yResults = await axe(container);

    expect(a11yResults).toHaveNoViolations();
  });
});
