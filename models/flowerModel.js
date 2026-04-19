"use strict";
const pool = require('./dbConnection');

async function getAllFlowers() {
    const queryText = "SELECT * FROM flowers";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneFlowerByID(id) {
    const queryText = "SELECT * FROM flowers where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getFlowersByLocation(params) {
    const queryText = "SELECT * FROM flowers where location= $1";
    const result = await pool.query(queryText, [params]);
    return result.rows;
}


async function deleteFlower(id) {
    let queryText = "DELETE FROM flowers WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addFlower(name, location, description) {
    let queryText = "INSERT INTO flowers ( name, location, description) VALUES ($1, $2, $3) RETURNING *";
    let values = [name, location, description];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllFlowers,
    getOneFlowerByID,
    getFlowersByLocation,
    deleteFlower,
    addFlower
};