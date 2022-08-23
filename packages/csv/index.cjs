var duckdb = require('duckdb');
const path = require('path')
const { processQueryResults } = require('@evidence-dev/db-commons')


const runQuery = async (queryString, database) => {
    console.log("running csv query")
    
    const filename = database ? path.parse(database.filename).name  : process.env["CSV_FILENAME"] || process.env["csv_filename"] || process.env["CSV_FILENAME"]
    const filepath = filename !== ":memory:" ? "../../" + filename : filename
    try {
        console.log("\n trying to create csv db")
        const db = new duckdb.Database(filename + ".duckdb")
        var creationString = "CREATE TABLE " + filename + " FROM '" + filepath +".csv'";
        console.log("creation string is: " + creationString)
        db.all(creationString)

        console.log(db.all("select * from orders limit 1"))
        

        const result = await db.all(queryString);
        return processQueryResults(result);
    } catch(err) {
        if (err.message) {
            if(err.errno === 14){
                throw "Unable to open " + filename + " in " + path.resolve("../../")
            } else {
                throw err.message
            }
        } else {
            throw err
        }
    }
}

module.exports = runQuery
