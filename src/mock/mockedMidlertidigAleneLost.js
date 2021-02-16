module.exports = app =>
  app.all('/api/midlertidig-alene/:behandlingsid/aksjonspunkt/', (req, res) => {

    switch (req.method) {
      case 'PATCH':
        res.status(200);
        res.send({
          status: 'FORESLÅTT',
          potensielleStatuser: {
            INNVILGET: {},
            AVSLÅTT: {},
            FORKASTET: {}
          },
          uløsteBehov: {
            VURDER_MIDLERTIDIG_ALENE: {},
            VURDERE_OMSORGEN_FOR: {},
          }
        });
        res.end();
        break;

      default:
        res.status(400);
        res.end();
    }
  });