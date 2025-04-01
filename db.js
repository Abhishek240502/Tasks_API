const postgres = require('postgres');
require('dotenv').config();

const sql = postgres('postgresql://batch1_user_user:5wG4PioOhefxwvxtmKurkhd1bRGxCoMl@dpg-cvlpb9ripnbc73atjcdg-a.oregon-postgres.render.com/batch1_user', {
    ssl : 'require'
});


//create table task
sql`CREATE TABLE IF NOT EXISTS tasks (id INTEGER , name TEXT)`.then(res => {
    console.log('tasks table created');
}).catch(err => {
    console.log(err);
});

module.exports = sql;