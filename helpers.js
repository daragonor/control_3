var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

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
        database: 'tendencias', //update me
        encrypt: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            queryDatabase()
        }
    }
);

function queryDatabase()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM tendencias.cajas",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

module.exports = queryDatabase