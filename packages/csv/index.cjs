var duckdb = require('duckdb');
const path = require('path')
const { processQueryResults } = require('@evidence-dev/db-commons')


const runQuery = async (queryString, database) => {
    
    const db = new duckdb.Database("../../unit_savings_data.csv"); // hardcode - replace with actual settings handler 
    return new Promise((resolve, reject) => {
        db.all(queryString, (err, rows) => {
            if (err) {
                reject(err);
            }else{
                resolve(processQueryResults(rows)) // process query results isn't actually leveraging duckdb's column types
            }
        }); 
    })
}

module.exports = runQuery
