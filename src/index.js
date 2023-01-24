const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const InitialData = require("./InitialData");
const { json } = require('body-parser');
const port = 8080
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/student", (req, res) => {
    try {
        res.send({
            status: "success",
            InitialData
        })
    } catch (e) {
        res.status(404).send({
            status: "error",
            message: e.message
        })
    }
})

app.get("/api/student/:id", (req, res) => {
    try {
        let id = req.params.id
        let result = true
        for (let i = 0; i < InitialData.length; i++) {
            let x = InitialData[i].id
            if (x == id) {
                res.send({
                    status: "success",
                    data: InitialData[i]
                })
                result = false
            }
        }
        if (result) {
            res.status(404).send({
                status: "error",
                message: "id is invalid"
            })
        }
    } catch (e) {
        res.status(404).send({
            status: "error",
            message: e.message
        })
    }
})

app.post("/api/student", (req, res) => {
    try {
        if (req.body.name == "" || req.body.currentClass == "" || req.body.division == "") {
            res.status(400).send({
                status: "error",
                message: "give the full details"
            })
        } else {
            let ids = parseInt(Math.random() * 1000000)
            InitialData.push({
                id: ids,
                name: req.body.name,
                currentClass: req.body.currentClass,
                division: req.body.division
            })
            res.send({
                status: "success",
                id: ids,
                name: req.body.name,
                currentClass: req.body.currentClass,
                division: req.body.division
            })
        }
    }
    catch (e) {
        res.status(404).send({
            status: "error",
            message: e.message
        })
    }
})

app.put("/api/student/:id", async (req, res) => {
    try {
        let id = req.params.id
        let result = true
        for (let i = 0; i < InitialData.length; i++) {
            let x = InitialData[i].id
            if (x == id) {
                InitialData[i].name = req.body.name
                InitialData[i].currentClass = req.body.currentClass
                InitialData[i].division = req.body.division
                res.send({
                    status: "success",
                    data: InitialData[i]
                })
                result = false
            }
        }
        if (result) {
            res.status(404).send({
                status: "error",
                message: "id is invalid"
            })
        }
    } catch (e) {
        res.status(404).send({
            status: "error",
            message: e.message
        })
    }
})

app.delete("/api/student/:id", async (req, res) => {
    try {
        let id = req.params.id
        let result = true
        for (let i = 0; i < InitialData.length; i++) {
            let x = InitialData[i].id
            if (x == id) {
                let deleted = InitialData[i]
                InitialData.splice(i, 1)
                res.send({
                    status: "success",
                    data: deleted
                })
                result = false
            }
        }
        if (result) {
            res.status(404).send({
                status: "error",
                message: "id is invalid"
            })
        }
    } catch (e) {
        res.status(404).send({
            status: "error",
            message: e.message
        })
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   