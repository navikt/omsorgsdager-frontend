module.exports = app =>
  app.all('/api/kronisk-sykt-barn/:behandlingsid/aksjonspunkt/', (req, res) => {

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
            LEGEERKLÆRING: {},
            OMSORGEN_FOR: {}
          }
        });
        res.end();
        break;

      default:
        res.status(400);
        res.end();
    }
  });