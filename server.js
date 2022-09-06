require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const configDB = require('./config/database.js')
const fetch = require('node-fetch'); 
const connectionString = configDB.url

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to database!')

        const db = client.db(`${configDB.dbName}`)
        const vacayCollection = db.collection('vacay')

        app.set('view engine', 'ejs')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            vacayCollection.find().toArray()
                .then(results => {
                    res.render('index.ejs', { vacay: results })
                })
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/destinations', (req, res) => {
            const accessKey = process.env.UNSPLASH_KEY
            const url = encodeURI(`https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=${req.body.destinationName}&query=${req.body.location}`)

                fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(data.urls.thumb)
                    let source = data.urls.thumb
                    return source
                })
                .then(source => {
                    vacayCollection.insertOne({
                        destinationName: req.body.destinationName,
                        location: req.body.location,
                        description: req.body.description,
                        imgSRC: source
        
                        //TODO add edited indicator (boolean) to show that card has been edited (Optional)
                    })
                    console.log('Saved to database')
                    res.redirect('/')
                })
                .catch(err => {
                    console.log(`error ${err}`)
                })
        })

        app.put('/changePlace', (req, res) => {
            const accessKey = process.env.UNSPLASH_KEY
            const url = encodeURI(`https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=${req.body.newDestinationName}&query=${req.body.newLocation}`)

                fetch(url)
                .then(res => res.json())
                .then(data => {
                    let source = data.urls.thumb
                    return source
                })
                .then(source => {
                    vacayCollection.findOneAndUpdate(
                        {destinationName: req.body.oldDestinationName}, 
                        {
                        $set: {
                            destinationName: req.body.newDestinationName,
                            location: req.body.newLocation,
                            description: req.body.newDescription,
                            imgSRC: source
                        }
                        }, 
                    {
                        sort: {_id: -1},
                        upsert: false
                    }, (err, result) => {
                        if (err) return res.send(err)
                        res.send(result)
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        })

        app.listen(port)
        console.log('Take your next trip at port ' + port)
    })
    .catch(err => {
        console.log(`The error is: ${err}`)
    })