
/**
 * Users
 */

module.exports = function route (express) {
  const router = express.Router();

  // List
  router.post('/users', function (req, res) {
    res.send({ data: [] });
  });

  // GET - get one result
  router.get('/user/:_id', function (req, res) {
    res.send({ data: {} });
  });

  // PUT - edit one result
  router.put('/user/:_id', function (req, res) {
    res.send({ data: {} });
  });

  // Delete - delete one result
  router.delete('/user/:_id',function (req, res) {
    res.send({ data: {} });
  });

  return router;
};
