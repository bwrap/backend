
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

 function getName (Entity, isPluralize) {
   var name = Entity.name.toLowerCase();
   return !isPluralize ? name : Pluralize(name);
 }

module.exports = function routes (express, Entity) {
  const router = express.Router();

  Object
    .getOwnPropertyNames(Entity)
    .filter(r => r !== 'constructor')
    .forEach(function (index) {
      var rt = defaultRoutes[index];

      if (typeof Entity[index] !== 'function') return;

      if (rt) {
        router[rt.method](
          `/${getName(Entity, rt.pluralize)}/${rt.path}`,
          Entity[index]
        );
      } else {
        var parseName = index
          .split(/(?=[A-Z])/)
          .join('-')
          .toLocaleLowerCase();
          debugger;
        router.post(
          `/${getName(Entity)}/${parseName}`,
          Entity[index]
        );
      }
    });

  return router;
};
