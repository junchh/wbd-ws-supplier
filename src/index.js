const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

let connection = null

app.use(express.json())

app.get('/getingredients', async (req, res) => {
    
    const showPrice = req.body.show_price
    
    if(showPrice == 1) {
        const [rows] = await connection.execute('SELECT `uuid`, `name`, `price` FROM `ingredients`')
        res.json(rows)
    } else {
        const [rows] = await connection.execute('SELECT `uuid`, `name` FROM `ingredients`')
        res.json(rows)
    }
})

app.listen(6900, async () => {
    console.log('Supplier\'s Web Service is up and running on port 6900.')

    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'ws-supplier',
        password: '123'
    });
})