// knex seed:run --env test

exports.seed = function(knex, Promise) {
  return knex('junk').del()
    .then(() => {
      return Promise.all([
        knex('junk').insert([
          { id: 1, name: 'test shovel', reason: 'test digging holes', cleanliness: 'dusty'},
          { id: 2, name: 'test wheelbarrow', reason: 'test filling holes', cleanliness: 'rancid'}
        ])
      ]) //end return Promise.all
    });
};
