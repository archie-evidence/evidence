var duckdb = require('duckdb');
const path = require('path')
const { processQueryResults } = require('@evidence-dev/db-commons')


const runQuery = async (queryString, database) => {
    
    const filename = database ? path.parse(database.filename).name  : process.env["CSV_FILENAME"] || process.env["csv_filename"] || process.env["CSV_FILENAME"]
    const filepath = filename !== ":memory:" ? "../../" + filename + ".csv" : filename
    try {
        const db = new duckdb.Database(":memory:");
        db.all(queryString, function(error, result){
            if (error) {
                    throw error
                }
            console.log(processQueryResults(result))
            return processQueryResults(result);
            });  
        
        } catch(err) {
            throw err.message
        }
}

module.exports = runQuery
