const config = require("config");
const express = require("express");
const cors = require("cors");
const json = express.json();
const app = express();
const error = require("./middleware/error");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}

process.on("uncaughtException", (err) => {
    console.log("Caught Exception: ", err);
    process.exit(1);
});

// process.on("unhandledRejection", errReason => {
//     console.log("Rejected promise: ", errReason.message);
//     // process.exit(1);
// })

app.use(json);
app.use(cors());
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));