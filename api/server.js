const busboy = require('busboy')
// const db = require("./models/db.js")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

// db.sync({
//     alter: true,
//     force: false
// }).then(async () => {
//     console.log('Database synchronised.')
//     const existingSuperAdmin = await db.models.User.findOne({ where: { superadmin: true } })
//     if (!existingSuperAdmin) {
//         devUtils.init()
//     }

//     //REMOVE AFTER NEXT RELEASE
//     devUtils.weighting_template()
// })

if (process.env.ENVIRONMENT === 'production') {
    var corsOptions = {
        origin: process.env.APP_URL,
        exposedHeaders: 'structural-timestamp'
    }
}

app.use(cors(corsOptions))

app.use(bodyParser.json({
    limit: '20mb'
}))

app.use(bodyParser.urlencoded({
    extended: true
}))

// Global middleware to conditionally apply busboy
app.use((req, res, next) => {
    if (req.headers['Content-Type'] && req.headers['Content-Type'].includes('multipart/form-data')) {
        // Busboy need to have a lower case content-type
        req.headers['content-type'] = req.headers['Content-Type']
        return busboy()(req, res, next)
    } else {
        // Continue to the next middleware if Content-Type is missing or invalid
        return next()
    }
})

app.get("/", (req, res) => {
    return res.json({
        message: "Welcome to Fletchr api."
    })
})

app.get("*", (req, res, next) => {
    console.log('GET ' + req.url)
    next()
})

app.post("*", (req, res, next) => {
    console.log('POST ' + req.url)
    next()
})

app.put("*", (req, res, next) => {
    console.log('PUT ' + req.url)
    next()
})

app.delete("*", (req, res, next) => {
    console.log('DELETE ' + req.url)
    next()
})

require("fs").readdirSync(require("path").join(__dirname, "routes")).forEach(function (file) {
    require("./routes/" + file)(app)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})