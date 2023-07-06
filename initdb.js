const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

async function initialize() {
    const db = await sqlite.open({
        filename: './db.sqlite',
        driver: sqlite3.Database
    })
    await db.migrate()
    // const pokemons = await db.all('SELECT * FROM pokemon')
}

initialize()