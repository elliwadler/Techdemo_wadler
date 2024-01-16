const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())
console.log('Using database configuration:', pool.options);
//routes

// Setup - GET
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

// Create - POST
app.post('/', async (req, res) => {
    const { name, breed } = req.body;
    try {
        await pool.query(`INSERT INTO cats(name, breed) VALUES ($1, $2)`, [name, breed]);
        res.status(200).send({ message: "Successfully added cat" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Read - GET by ID
app.get('/:id', async (req, res) => {
    const catId = req.params.id;
    try {
        const data = await pool.query(`SELECT * FROM cats WHERE id = $1`, [catId]);
        res.status(301).send({ cat: data.rows[0] });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Read - GET all
app.get('/', async (req, res) => {
    try {
        const data = await pool.query(`SELECT * FROM cats`);
        res.status(200).send({ cats: data.rows });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Update - PUT
app.put('/:id', async (req, res) => {
    const catId = req.params.id;
    const { name, breed } = req.body;
    try {
        await pool.query(`UPDATE cats SET name = $1, breed = $2 WHERE id = $3`, [name, breed, catId]);
        res.status(200).send({ message: "Successfully updated cat" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Delete - DELETE
app.delete('/:id', async (req, res) => {
    const catId = req.params.id;
    try {
        await pool.query(`DELETE FROM cats WHERE id = $1`, [catId]);
        res.status(200).send({ message: "Successfully deleted cat" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`))
module.exports = app;