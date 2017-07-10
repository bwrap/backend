
/**
 * Users
 */

module.exports = function route (express) {
  const router = express.Router();

  // List
  router.post('/', function (req, res) {
    res.send({ data: [] });
  });

  // GET - get one result
  router.get('/:_id', function (req, res) {
    res.send({ data: {} });
  });

  // PUT - edit one result
  router.put('/:_id', function (req, res) {
    res.send({ data: {} });
  });

  // Delete - delete one result
  router.delete('/:_id',function (req, res) {
    res.send({ data: {} });
  });

  return router;
};
