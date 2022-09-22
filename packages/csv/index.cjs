var duckdb = require('duckdb');
const path = require('path')
const { processQueryResults } = require('@evidence-dev/db-commons')
const fs = require('fs')
const chalk = require('chalk')


const runQuery = async (queryString, database) => {

const db = new duckdb.Database("csv_files.duckdb");
const conn = db.connect();
dataFolder= "../../"

fs.readdirSync(dataFolder).filter((name) => name.endsWith('.csv')).forEach(file => {
    createDBString=`CREATE OR REPLACE TABLE ${file.replace('.csv','')} AS SELECT * FROM read_csv_auto('${path.join(dataFolder, file)}', HEADER = 1, SAMPLE_SIZE = -1);`

    process.stdout.write(chalk.grey("\n   => loading data from", file, "..."))
    conn.all(createDBString, (err, rows) => {
        if (err) {
            throw (err)
        }
        process.stdout.write(chalk.grey("\n   =>",file, "loaded"))
    });
  });

const result =  new Promise((resolve, reject) => {
    conn.all(queryString, (err, result) => {
        if (err) {
            reject(err);
        }else{
            resolve(processQueryResults(result)) // process query results isn't actually leveraging duckdb's column types
        }
    }); 
});

return result

}


module.exports = runQuery
