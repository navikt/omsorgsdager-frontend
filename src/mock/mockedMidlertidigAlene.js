module.exports = app =>
  app.all('/api/midlertidig-alene/', (req, res) => {

    switch (req.method) {
      case 'GET':
        res.status(200);
        res.send({
          vedtak: [
            {
              barn: {
                identitetsnummer: "29099011111",
                fødselsdato: "2021-02-10",
                harSammeBosted: true
              },
              behandlingId: "UUID-123-123",
              gyldigFraOgMed: "2021-02-10",
              gyldigTilOgMed: "2021-02-10",
              status: "FORESLÅTT",
              soknedsopplysninger: {
                årsak: 'Annet',
                beskrivelse: 'Beskrivelse',
                periode: 'DD.MM.ÅÅÅÅ - DD.MM.ÅÅÅÅ'
              },
              uløsteBehov: {
                OMSORGEN_FOR: {},
                VURDER_MIDLERTIDIG_ALENE: {
                  "vurdering": "Saksbehandler sin input",
                  "erSøkerenMidlertidigAleneOmOmsorgen": true,
                  "gyldigFraOgMed": "2021-02-02",
                  "gyldigTilOgMed": "2022-02-03"
                }
              },
              løsteBehov: {
              },
              lovhenvisnigner: {
                "FTL 9-5 3.ledd": "søkeren bor ikke i norge",
                "FTL 9-5 2.ledd": "ikke omsorgen for barnet"
              }
            }
          ]
        });
        res.end();
        break;

      default:
        res.status(400);
        res.end();
    }
  });