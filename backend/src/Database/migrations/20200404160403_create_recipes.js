exports.up = function(knex) {
    return knex.schema.createTable('recipes', function(table) {
        table.increments()
        table.string('name').notNullable()
        table.string('recipe').notNullable()
        table.string('image').notNullable()
        table.string('video').notNullable()
        table.integer('category_id').notNullable()

        table.foreign('category_id').references('id').inTable('categories')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recipies')
};