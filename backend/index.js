// Importing necessary modules and packages
const express = require("express")
const app = express()
const database = require("./config/db")
const dotenv = require("dotenv")
const { CONFIG } = require('./constants/config')
const { auth } = require('./middleware/auth');

// Setting up port number
const PORT = process.env.PORT || 4000

// Loading environment variables from .env file
dotenv.config()

// Connecting to database
database.connect()
const cookieParser = require("cookie-parser")
const cors = require("cors") //backend should entertain frontend's request 


const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload")

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT,
        credentials: true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

// Connecting to cloudinary
cloudinaryConnect()


// Importing Routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const parentRoutes = require('./routes/parent')


app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    })
})


// Routes
app.use(CONFIG.APIS.auth, userRoutes);
app.use(CONFIG.APIS.profile, auth, profileRoutes);
app.use(CONFIG.APIS.parent,auth,parentRoutes);

// Listening to the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})
// End of code.