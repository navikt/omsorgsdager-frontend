# omsorgsdager-frontend

## Deploy
Push til master deployer til prod, deploye til dev via workflow dispatch.
Legg til "ci skip" i commit-melding for att unngå deploy til prod.

## Beskrivelse

Dette er en mikrofrontend for omsorgsdager (rammevedtak) som blir tatt i bruk av [k9-sak-web](https://github.com/navikt/k9-sak-web).
Mikrofrontenden består av fire ulike komponenter. Applikasjonen er en klone av [medisinsk vilkar](https://github.com/navikt/medisinsk-vilkar-frontend).

Komponenter som tas i bruk av behandlinger for [utvidet rett](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett).

[Midlertidig alene](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett/src/panelDefinisjoner/prosessStegPaneler/utvidetRettPanel/utvidetRettMikrofrontend) 

[Kronisk syk](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett/src/panelDefinisjoner/prosessStegPaneler/utvidetRettPanel/utvidetRettMikrofrontend)

[Omsorgen for](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-utvidet-rett/src/panelDefinisjoner/prosessStegPaneler/inngangsvilkarPaneler/omsorgenForMikrofrontend)

Komponenter som tas i bruk av behandlinger for [omsorgspenger](https://github.com/navikt/k9-sak-web/tree/master/packages/behandling-omsorgspenger).

[Saerlig smittevernshensyn](https://github.com/navikt/k9-sak-web/tree/master/packages/prosess-aarskvantum-oms/src/components/saerlige-smittevernhensyn)

## Komme i gang
### Kjør utviklingsmiljø

`yarn dev`

### Generer bygg

`yarn build`

### Kjør produksjonsbygg lokalt

`yarn start`

### Utvikle lokalt med mikrofrontend i k9-sak-web
Utfør endringene i omsorgsdager-frontend. Kjør kommando `yarn build följt av yarn start`. Kjør k9-sak-web lokalt. 

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte
Interne henvendelser kan sendes via Slack i kanalen #k9sak-frontend-tech.

