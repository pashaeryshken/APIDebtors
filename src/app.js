const express = require("express");
const cors = require("cors")
const userRouter = require("./routes/userRouter")
const bodyParser = require("body-parser")
const debtorsRouter = require("./routes/debtorsRouter")
const peopleRouter = require("./routes/peopleRouter")
const fileUpload = require("express-fileupload")
const app = express();

app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static('uploads'));
app.use(express.static('uploads/:id/debtors'));
app.use(cors())
app.use(bodyParser.json());


app.use('/users', userRouter)
app.use("/debtors", debtorsRouter)
app.use("/people", peopleRouter)

app.use(function (req, res) {
    res.status(404).send("Nots")
})

module.exports = app;







