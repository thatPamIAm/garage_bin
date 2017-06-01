// knex seed:run --env test

exports.seed = function(knex, Promise) {
  return knex('junk').del()
    .then(() => {
      return Promise.all([
        knex('junk').insert([
          { id: 1, name: 'testshovel', reason: 'test digging holes', cleanliness: 'dusty'},
          { id: 2, name: 'testwheelbarrow', reason: 'test filling holes', cleanliness: 'rancid'}
        ])
      ]) //end return Promise.all
    });
};
