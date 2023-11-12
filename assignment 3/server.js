const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const itemsPerPage = 25;

// Sample data from fakeUsers.json
const userData = require('./data/fakeUsers.json');

// Function to check find user credentials based on inputs.
function authenticate(username, password) {
    return userData.find((user) => user.email === username && user.password === password);
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'views');
app.set('view engine', 'ejs');


// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = authenticate(username, password);
    if (user) {
        res.redirect(`/list`);
    } else {
        res.redirect('/login'); //Stay on login page until successful login
    }
});

app.get('/list', (req, res) => {
    const page = req.query.page || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, userData.length);
    const currentPageData = userData.slice(startIndex, endIndex);
    res.render('list', { users: currentPageData });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = userData.find(u => u.id == userId);

    if (user) {
        res.render('detail', { user });
    } else {
        res.status(404).send('User not found');
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('SERVER ERROR');
});

// Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
