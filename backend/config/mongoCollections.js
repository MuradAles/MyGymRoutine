const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
  let _collection = undefined;

  return async () => {
    if (!_collection) {
      const db = await dbConnection();
      _collection = await db.collection(collection);
    }
    return _collection;
  };
};

module.exports = {
  users: getCollectionFn('users'),
  recipes: getCollectionFn('recipes')
};

