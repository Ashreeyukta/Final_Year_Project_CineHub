const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./controller/api.controller");

app.use(cors()); //applying for cross origin
app.use(express.json()); //appling middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //to make data json


app.use("/images", express.static(process.cwd()+"/uploads"));

app.use("/", routes);

// set the app to listen on the port
const port = 3002;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

/*
// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
/*
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/
