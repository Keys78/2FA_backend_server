require('dotenv').config({ path: "./config.env" });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


// Connect DB
connectDB();
const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Arctic Travels API",
      version: "1.0.0",
      description: "Test/Production API for artic travels",
    },
    servers: [
      { url: "http://localhost:4000" },
      { url: "https://arctic-travels-api.cyclic.app/", }
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



// authentication routes
app.use('/auth', require('./routes/auth'));

// user routes
app.use('/private', require('./routes/private'));

app.get("/", (req, res) =>
  res.json({ success: true, message: "arctic-travels-api is running!" })
);

app.use(errorHandler);


const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on("unhandledRejections", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});


