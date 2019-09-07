const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Connect to database
connectDB();

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json({
    extended: false
}));

// Set static folder
app.use(express.static(`${__dirname}/public`));


// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

// Homepage Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'URL Shortner'
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));