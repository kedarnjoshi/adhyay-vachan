require('dotenv').config();
var express = require('express');
var router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
// import postgres from 'postgres'

// const connectionString = process.env.DATABASE_URL
// const sql = postgres(connectionString)

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

module.exports = router;

router.patch('/read', async (req, res) => {
    if (!req.body) res.status(400).send({message: 'Request must contain the body.'});
    const req_body = req.body;
    console.log(req_body);
    try {
        const { data, error } = await supabase
            .from('people')
            .update(req_body) // fields to update
            .eq('p_id', req_body.p_id); // condition to find the row

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'User updated successfully', data });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
})

router.get('/', async function (req, res) {
    try {
        const {data, error} = await supabase.from('people').select('*')
        // console.log(data);
        var all_lists = data;
        if (error) {console.error(error);}
    } catch (err) {
        console.error("Database error:", err);
    }
    const query = req.query;
    if (query.no) query.no = parseInt(query.no);


    //all_lists.sort((a, b) => a.adhyay - b.adhyay).sort((a, b) => a.group_id - b.group_id);


    if (!query.no) {
        return res.status(200).send(all_lists);
    }
    else if (query.no) {
        let list = all_lists.filter(i => i.group_id===query.no);
        console.log('list: ', list);
        return res.status(200).send(list);
    }

    else return res.status(400).send({error: 'Query Parameters are not valid'})
})

router.patch('/next', async (req, res) => {
    try {
        const {data, error} = await supabase.from('people').select('*')
        // console.log(data);
        var all_lists = data;
        if (error) {
            console.error(error);
        }
    } catch (err) {
        console.error("Database error:", err);
    }
    all_lists.forEach(item => {
        item.adhyay === 21 ? item.adhyay = 1 : item.adhyay += 1;
        item.completed = false;
    })

    // TO DO: Persist this change
    res.status(200).send({message: 'Successfully changed to next'})
})

