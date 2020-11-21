const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

let connection = null

app.use(express.json())

app.get('/ingredients', async (req, res) => {
    
    const showPrice = req.body.show_price
    
    if(showPrice == 1) {
        const [rows] = await connection.execute('SELECT `uuid`, `name`, `price` FROM `ingredients`')
        res.json(rows)
    } else {
        const [rows] = await connection.execute('SELECT `uuid`, `name` FROM `ingredients`')
        res.json(rows)
    }
})

app.post('/addtransaction', async (req, res) => {

    let amount = req.body.amount 

    for(const item of req.body.ingredients) {
        const qty = item.quantity 
        const uuid = item.uuid 

        const [rows] = await connection.execute('SELECT `price` FROM `ingredients` WHERE `uuid` = ?', [uuid])
        
        const totalPrice = qty * rows[0].price 

        amount -= totalPrice 
    }

    if(amount >= 0) {
        const result = {status: "success", amount: amount}

        res.json(result)
    } else {
        const result = {status: "failed", needed_amount: -1 * amount}

        res.json(result)
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