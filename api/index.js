var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOURL;

var conn = function (url) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
};

var toArray = function (cursor) {
    return new Promise((resolve, reject) => {
        cursor.toArray(function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

exports.handler = async function http(req) {
    try {
        var con = await conn(url);
        var db = con.db('db1');
        var collection = db.collection('collection1');
        var result = await collection.find({}).toArray();
        return {
            headers: {
                'content-type': 'application/json; charset=utf8',
                'cache-control':
                    'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
            },
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        return error;
    }
};
