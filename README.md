# omsorgsdager-frontend

Dette er en mikrofrontend for omsorgspenger som blir tatt i bruk av [k9-sak-web](https://github.com/navikt/k9-sak-web).
Mikrofrontenden består av fire ulike komponenter. 

Komponenter som tas i bruk av behandlinger for [utvidet rett](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett).

[Midlertidig alene](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett/src/panelDefinisjoner/prosessStegPaneler/utvidetRettPanel/utvidetRettMikrofrontend) 

[Kronisk syk](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett/src/panelDefinisjoner/prosessStegPaneler/utvidetRettPanel/utvidetRettMikrofrontend)

[Omsorgen for](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett/src/panelDefinisjoner/prosessStegPaneler/inngangsvilkarPaneler/omsorgenForMikrofrontend)

Komponenter som tas i bruk av behandlinger for [omsorgspenger](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-omsorgspenger).

[Saerlig smittevernshensyn](https://github.com/navikt/k9-sak-web/tree/master/packages/prosess-aarskvantum-oms/src/components/saerlige-smittevernhensyn)

## Kommando
### Kjør utviklingsmiljø

`yarn dev`

### Generer bygg

`yarn build`

### Kjør produksjonsbygg lokalt

`yarn start`

### Generer bygg med ny minor versjonsnummer

`yarn buildNewVersion`

### Generer nye byggfiler i siste buildmappa for lokal utvikling med k9-sak-web

`yarn buildDev`

### Beregn SHA384 og SHA256 for den siste builden

`yarn calculateHashOnLatestBuild`

# Deploy ny versjon
Når man skall deploye en ny versjon av omsorgsdager-frontend må scriptet `yarn buildNewVersion` kjøres. 
Genererte endringer med ny versjon og byggfiler må merges in i master for en ny versjon skal deployes.

Når en ny versjon er deployet må man oppdatere versjonen registrert for hver implementasjon av mikrofrontend i k9-sak-web med jsIntegrity, stylesheetIntegrity og versjon.
De ulike mikrofrontends kan ha forskjellige versjoner.

Exempel på oppdatering av versjon i Q (preprod).
```
const preprodVersjon = {
    versjon: '1.5.37',
    jsIntegrity: 'sha384-T9E+13YgCnqQhCnzpOXWPIZLkeY3ZyG4IPFEWnZOXNBJKvMY4hreCxt4H6ALbtCx',
    stylesheetIntegrity: 'sha384-qqVqf1BVSlTidE86KqYBuuUlaYXyhbpN1ir3hOsN2dT/Yj5jygdCrlipblJIFzKd',
  };
```

# Utvikle lokalt med mikrofrontend i k9-sak-web
Utfør endringene i omsorgsdager-frontend. Kjør kommando `yarn buildDev` som produserer nye byggfiler og kjører dem på server.
Disse byggfilerne som skriver over eksisterende versjon skal ikke pushes til gitrepo. Ta sha256 output og oppdater preprod objektet for ønsket mikrofrontend.

Exempel:
```
const preprodVersjon = {
    versjon: '1.5.37',
    jsIntegrity: 'sha256-xxx',
    stylesheetIntegrity: 'sha256-xxx',
  };
```

Legg til build mappa innen versjonsnummer.
```javascript
  return (
    <MicroFrontend
      id={omsorgenForVilkårAppID}
      jsSrc={`/k9/microfrontend/omsorgsdager/build/${versjon}/app.js`}
      jsIntegrity={jsIntegrity}
      stylesheetSrc={`/k9/microfrontend/omsorgsdager/build/${versjon}/styles.css`}
      stylesheetIntegrity={stylesheetIntegrity}
      onReady={() => initializeOmsorgenForVilkar(omsorgenForVilkårAppID, props)}
    />
  );
```