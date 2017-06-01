exports.seed = function(knex, Promise) {
  return knex('junk').del()
    .then(() => {
      return Promise.all([
        knex('junk').insert([
          { name: 'shovel', reason: 'digging holes', cleanliness: 'dusty'},
          { name: 'wheelbarrow', reason: 'filling holes', cleanliness: 'rancid'}
        ])
      ]) //end return Promise.all
    });
};
