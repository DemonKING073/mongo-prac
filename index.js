const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dbOper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null)

    console.log('Connected correctly to server')

    const db = client.db(dbname)
   
    dbOper.insertDocument(db, { name: "momo", description: 'kera'}, 'dishes', (result) => {

        console.log('Inserted Document:\n',result)

        dbOper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents: \n',docs)

            dbOper.updateDocument(db, {name:'momo'},{description:'mitho xa'},'dishes', (result) => {
                console.log('Updated Document:\n',result)

                dbOper.findDocuments(db, 'dishes', (docs) => {
                    console.log('found:\n',docs)

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection')
                        client.close()
                    })
                })

            })
        })
    })
})