if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express")
const axios = require("axios");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const { authed_header } = require("./utils/client_auth");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app)


var corsOptions = {
	origin: [process.env.FRONT_URI, process.env.REXP],
	credentials: true,
};

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const token = process.env.TOKEN


app.post("/", (req, res) => {
	const endpoint = req.body.endpoint;

    axios.get(endpoint, authed_header(token))
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.send(error)
        })

});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));