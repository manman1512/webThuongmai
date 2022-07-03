const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const http = require("http")

const authRouter = require("./routes/auth") 
const middleware = require("./middleware")

const app = express()

const server = http.createServer(app)

const MONGO_URI = process.env.ATLAS_URI
const PORT = process.env.PORT || 2002;

(async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connect database successfully!")
    } catch (error) {
        console.log(error)
    }
})();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: "*"
    })
)
// app.use('/', routes);
// app.use(app.router);
// routes.initialize(app);
app.use("/api/auth", authRouter)
app.use(middleware)



server.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
})