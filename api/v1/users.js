
/**
 * Users
 */
var UserModel = require('../models/users');

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

      var count = await UserModel.count();
      var user = await UserModel
        .find({}, {})
        .skip(pagination.offset)
        .limit(pagination.limit)
        .sort({ createdAt: -1 });

      var result = { count, user };

      response
        .send([
          'Something went wrong',
          0
        ]);
    } catch (error) {
      response.send(['error', 404]);
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
