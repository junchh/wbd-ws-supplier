const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

let connection = null

app.get('', async (req, res) => {
    
    const [rows, fields] = await connection.execute('SELECT * FROM `ingredients`')
    console.log(rows)
    console.log(fields)
    res.send("success")
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