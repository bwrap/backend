
async function notFound (req, res, next) {
  res.status(404).format({
    'default': function () {
      res.send({ error: 'Route not found' });
    },
  });
}

module.exports = function routes (express) {
  const router = express.Router();
  router.route('/:url(api|modules|lib)/*')
    .get(notFound)
    .post(notFound)
    .put(notFound)
    .patch(notFound)
    .delete(notFound);

  return router;
};
