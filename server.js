const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())
console.log('Using database configuration:', pool.options);
//routes
app.get('/', async (req, res) => {
    try{
        const data = await pool.query(`SELECT * FROM cats`)
        res.status(200).send({ cats: data.rows })
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req, res) => {
    const { name, breed } = req.body
    try{
        await pool.query(`INSERT INTO cats(name, breed) VALUES ($1, $2)`, [name, breed])
        res.status(200).send({message: "Successfully added cat"})
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.get('/setup', async (req, res) =>{
    try{
        await pool.query(`CREATE TABLE cats( id SERIAL PRIMARY KEY, name VARCHAR(100), breed VARCHAR(100))`)
        res.status(200).send({message: "Succesfully created table"})
    } catch (err){
        console.error(err);

        if (err.code === '42P07') {
            // Table already exists
            res.status(200).send({ message: "Table already exists" });
        } else {
            res.sendStatus(500);
        }
    }
})

app.get('/ping', (req, res) => {
    res.send('pong!')
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))
module.exports = app;