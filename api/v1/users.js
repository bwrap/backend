
/**
 * Users
 */

var user = new (require('../../dl/user'))();

class User {
  /**
   * List of users with pagination and search param
   * @param  {String} params.search       Search by email
   * @param  {Object} params.pagination   pagination by limit and offset
   * @return {Promise}                    List of users
   */
  async index (params, response) {
    try {
      var { search, pagination } = params;
      var query = { email: { $regex: search, $options: '-i' } };

      var result = await user.findAll(query, { pagination });
      response.send({ count: result.count, data: result.data });
    } catch (error) {
      response.send({ message: error });
    }
  }

  async create (req, res) {
    try {
      res.send({ count: 0,  data: {} });
    } catch (error) {
      res.send({ message: error });
    }
  }

  async get (req, res) {
    try {
      var result = await user.findOne({ _id: req.params._id });
      res.send({ data: result });
    } catch (error) {
      res.send({ message: error });
    }
  }

  async update (req, res) {
    try {
      res.send({ count: 0,  data: {} });
    } catch (error) {
      res.send({ message: error });
    }
  }

  async delete (req, res) {
    try {
      res.send({ count: 0,  data: {} });
    } catch (error) {
      res.send({ message: error });
    }
  }
}

module.exports = User;
