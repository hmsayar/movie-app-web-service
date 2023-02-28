const express = require("express")
const axios = require("axios");
const qs = require("qs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var request = require("request");
const http = require("http");

const { authed_header } = require("./utils/client_auth");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app)


var corsOptions = {
	origin: ["http://localhost:5173", "/\.localhost:5173/"],
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

const redirect_uri = "http://localhost:4000/callback"
const front_end_uri = "http://localhost:5173"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGMyYjNjY2QwZmU2NThkOWUxNTRjOGRiZWY2MWRjZCIsInN1YiI6IjYzZWJjNDUxMWYzZTYwMDA3ZmI1NzU1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rKGRqnklOy1bcgkKQi_shG3LfyJDgjVuH37tg7E15Ac"


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