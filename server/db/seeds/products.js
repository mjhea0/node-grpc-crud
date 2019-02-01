exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'pencil', price: '1.99' },
        { name: 'pen', price: '2.99' },
      ]);
    });
};
