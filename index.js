const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
// Import created logger
const logger = require('./middleware/logger');
const members = require('./Members');

// Init middleware
app.use(logger);

// console.log(logger());

// SETTING PORT
const PORT = process.env.PORT || 5000;

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// RENDER VIEW
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members: members
  })
);

// RENDER FORM VIEW
app.get('/add', (req, res) =>
  res.render('form', {
    title: 'Add a member'
  })
);

// SETTING STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// WORKING WITH API
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
