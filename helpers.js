var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var db = {}
var config =
{
    authentication: {
        options: {
            userName: 'daragonor', // update me
            password: 'Le2019....' // update me
        },
        type: 'default'
    },
    server: 'tendenciasdb.database.windows.net', // update me
    options:
    {
        rowCollectionOnDone: true,
        database: 'tendencias', //update me
        encrypt: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Database Connected')
    }
}
);
db.queryDatabase = function (handler) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM [dbo].[ITEM]",
        function (err, rowCount, rows) {

        }
    );

    request.on('doneInProc', function (rowCount, more, rows) {
        data = [];
        rows.forEach((columns) => {
            data.push({
                id: columns[0].value,
                name: columns[1].value,
                stock: columns[2].value
            })
        })
        console.log(data);
        handler(data);
    })
    connection.execSql(request);
}



module.exports = db