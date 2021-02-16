module.exports = app =>
  app.all('/api/kronisk-sykt-barn/', (req, res) => {

    switch (req.method) {

      case 'GET':
        res.status(200);
        res.send({
          vedtak: [
            {
              behandlingId: 'UUID-123-123',
              gyldigFraOgMed: '2021-02-16',
              gyldigTilOgMed: '2021-02-16',
              status: 'FORESLÅTT',
              grunnlag: {
                saksnummer: 'OBC123',
                behandlingId: 'UUID-123-123',
                tidspunkt: '2021-02-16T07:46:38.461Z',
                søknadMottatt: '2021-02-16T07:46:38.461Z',
                søker: {
                  identitetsnummer: '29099011112'
                },
                barn: {
                  identitetsnummer: '29099011111',
                  fødselsdato: '2021-02-16',
                  harSammeBosted: true
                }
              },
              uløsteBehov: {
                VURDERE_OMSORGEN_FOR: {}
              },
              løsteBehov: {
                VURDERE_KRONISK_SYKT_BARN: {
                  grunnlag: {},
                  lovhenvisninger: {
                    innvilget: {
                      'Ftrl. § 9-6 andre ledd': [
                        'Barnet er kronisk sykt eller har en funksjonshemning.'
                      ],
                      'Ftrl. § 9-5 fjerde ledd andre punktum': [
                        'Perioden gjelder fra dagen søknaden ble mottatt ut året barnet fyller 18 år.'
                      ]
                    },
                    avslått: {
                      'Ftrl. § 9-6 andre ledd': [
                        'Er ikke sammenheng med søkers risiko for fravær fra arbeidet.'
                      ]
                    }
                  },
                  løsning: {
                    vurdering: 'Dette er saksbehandlers vurdering',
                    barnetErKroniskSyktEllerHarEnFunksjonshemning: true,
                    erSammenhengMedSøkersRisikoForFraværFraArbeid: true
                  }
                }
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