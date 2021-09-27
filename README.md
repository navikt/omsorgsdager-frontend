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

### Generer bygg under dev mappa

`yarn buildToDev`

### Generer bygg under prod mappa

`yarn buildToProd`

# Deploy ny versjon
Kör en av scripten over slik att det genereres nytt bygg i antingen prod eller dev mappen under build. Når innehold i dev endres i main deployes dette til Q. Når innehold i prod endres i main deployes dette til prod.

# Utvikle lokalt med mikrofrontend i k9-sak-web
Utfør endringene i omsorgsdager-frontend. Kjør kommando `yarn start`.

