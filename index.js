const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dbOper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

MongoClient.connect(url)
    .then((client) => {
        console.log('Connected Successfully to server!')
        const db = client.db(dbname)

        dbOper.insertDocument(db, {name:"momo",description:"kera"},'dishes')
            .then((result) => {
                console.log('Inserted Document: \n',result.insertedCount)

                return dbOper.findDocuments(db, 'dishes')
            })
            .then((docs) => {
                console.log('Found Documents:\n',docs)

                return dbOper.updateDocument(db, {name:"momo"},{description:"updateed kera"},'dishes')
            })
            .then((result) => {
                console.log('Updated Document:\n',result.modifiedCount)

                return dbOper.findDocuments(db,'dishes')
            })
            .then((docs) => {
                console.log('Found Documents:\n', docs)

                return db.dropCollection('dishes')
            })
            .then((result) => {
                console.log('Dropped Collection:', result)
                client.close()
            })
            .catch((err) => console.log(err))

    })
    .catch((err) => console.log(err))