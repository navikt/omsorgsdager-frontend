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
      soknadsopplysninger: {
        årsak: 'Årsak',
        beskrivelse: 'Beskrivelse',
        fraDato: '22.12.1994',
        soknadsdato: '2021-10-20'
      },
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
        avslagsArsakErPeriodeErIkkeOverSeksMån: false
      },
      losAksjonspunkt: () => {
        console.log('losAksjonspunkt alene om omsorgen');
      },
      formState: FormStateTilTest
    } as AleneOmOmsorgenProps;

    render(<AleneOmOmsorgen {...props}/>);

    const aksjonspunkt = 'Vurder om vilkår for alene om omsorgen er oppfylt.';
    const oppgittÅrsakText = 'Oppgitt årsak';
    const oppgittPeriodeText = 'Fra dato oppgitt';

    const begrunnelseText = 'Vurder om vilkåret for alene om omsorgen er oppfylt';
    const vilkarOppfyltText = 'Er vilkåret om alene om omsorgen er oppfylt?';

    const hentetAksjonspunkt = screen.getByText(aksjonspunkt);
    expect(hentetAksjonspunkt).toBeInTheDocument();

    const hentetOppgittÅrsakText = screen.getByText(oppgittÅrsakText);
    expect(hentetOppgittÅrsakText).toBeInTheDocument();

    const hentetOppgittPeriodeText = screen.getByText(oppgittPeriodeText);
    expect(hentetOppgittPeriodeText).toBeInTheDocument();

    const hentetBegrunnelseText = screen.getByText(begrunnelseText);
    expect(hentetBegrunnelseText).toBeInTheDocument();

    const hentetVilkarOppfyltText = screen.getByText(vilkarOppfyltText);
    expect(hentetVilkarOppfyltText).toBeInTheDocument();

  });

  test('AleneOmOmsorgen viser lesemodus', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: false,
      lesemodus: true,
      soknadsopplysninger: {
        årsak: 'Årsak',
        beskrivelse: 'Beskrivelse',
        fraDato: '22.12.1994',
        soknadsdato: '2021-10-20'
      },
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

    const hentetÅrsak = screen.getByText(props.soknadsopplysninger.årsak);
    expect(hentetÅrsak).toBeInTheDocument();

    const hentetPeriode = screen.getAllByText(props.soknadsopplysninger.fraDato);
    expect(hentetPeriode).toHaveLength(2);

    const hentetBegrunnelseTekst = screen.getByText('Vurdering');
    expect(hentetBegrunnelseTekst).toBeInTheDocument();

    const hentetBegrunnelse = screen.getByText(props.informasjonTilLesemodus.begrunnelse);
    expect(hentetBegrunnelse).toBeInTheDocument();

    const hentetVilkarOppfylt = screen.getByText(props.informasjonTilLesemodus.vilkarOppfylt ? 'Ja' : 'Nei');
    expect(hentetVilkarOppfylt).toBeInTheDocument();
  });

  test('AleneOmOmsorgen viser lesemodus med rediger', () => {
    const props = {
      behandlingsID: '123',
      aksjonspunktLost: true,
      lesemodus: true,
      soknadsopplysninger: {
        årsak: 'Årsak',
        beskrivelse: 'Beskrivelse',
        fraDato: '22.12.1994',
        soknadsdato: '2021-10-20'
      },
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
      soknadsopplysninger: {
        årsak: 'Årsak',
        beskrivelse: 'Beskrivelse',
        fraDato: '22.12.1994',
        soknadsdato: '2021-10-20'
      },
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
      soknadsopplysninger: {
        årsak: 'Årsak',
        beskrivelse: 'Beskrivelse',
        fraDato: '22.12.1994',
        soknadsdato: '2021-10-20'
      },
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
      soknadsopplysninger: {
        årsak: 'Årsak',
        beskrivelse: 'Beskrivelse',
        fraDato: '22.12.1994',
        soknadsdato: '2021-10-20'
      },
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
