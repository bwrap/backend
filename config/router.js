
/**
 * Router
 */
var Pluralize = require('pluralize');

 var defaultRoutes = {
   index:   { method: 'post', path: '', pluralize: true },
   create:  { method: 'post', path: '' },
   get:     { method: 'get', path: ':_id'  },
   update:  { method: 'put', path: ':_id'  },
   delete:  { method: 'delete', path: ':_id'  },
   patch:   { method: 'patch' },
 };

 function getName (entity, isPluralize) {
   var name = entity.name.toLowerCase();
   return !isPluralize ? name : Pluralize(name);
 }

module.exports = function routes (express, Entity) {
  const router = express.Router();
  const entity = new Entity();

  Object
    .getOwnPropertyNames(Entity.prototype)
    .filter(r => r !== 'constructor')
    .forEach(function (index) {
      var rt = defaultRoutes[index];
      if (rt) {
        router[rt.method](
          `/${getName(Entity, rt.pluralize)}/${rt.path}`,
          entity[index]
        );
      } else {
        var parseName = index
          .split(/(?=[A-Z])/)
          .join('-')
          .toLocaleLowerCase();

        router.post(
          `/${getName(Entity)}/${parseName}`,
          entity[index]
        );
      }
    });

  return router;
};
