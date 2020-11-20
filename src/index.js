const express = require('express')
const app = express()


app.get('', (req, res) => {
    res.send("hello")
})

app.listen(6900, () => {
    console.log('Supplier\'s Web Service is up and running on port 6900.')
})