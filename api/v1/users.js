
/**
 * Users
 */

var user = new (require('../../dl/user'))();

class User {
  async index (req, res) {
    try {
      var result = await user.findAll({}, {}, {  });
      res.send({ count: result.count, data: result.data });
    } catch (error) {
      res.send({ message: error });
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
