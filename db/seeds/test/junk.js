// knex seed:run --env test

exports.seed = function(knex, Promise) {
  return knex('junk').del()
    .then(() => {
      return Promise.all([
        knex('junk').insert([
          { name: 'test shovel', reason: 'test digging holes', cleanliness: 'dusty'},
          { name: 'test wheelbarrow', reason: 'test filling holes', cleanliness: 'rancid'}
        ])
      ]) //end return Promise.all
    });
};
