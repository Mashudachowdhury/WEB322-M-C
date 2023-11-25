const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const users = require('./data/fakeUsers');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Navigation menu HTML
const menu =
 `<nav>
        <a href="/">Home</a>
        &nbsp;|&nbsp;
        <a href="/list">List</a>
    </nav>`;

// Template function to structure HTML response
function template(title, html) {
    return `<html>
        <head>
            <link href="/style.css" rel="stylesheet">
        </head>
        <body class="container">
            <div>${menu}</div>
            <h1>${title}</h1>
            <div>
                ${html}
            </div> 
        </body>
    </html>`;
}

// Middleware to parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Handle root URL request
app.get('/', (req, res) => {
    // Form for user login
    const content =
        `<form action="/login" method="POST">
            <label for="username">Username: </label>
            <input type="text" name="username" />
            <br>

            <label for="password">Password: </label>
            <input type="password" name="password" />
            <br>

            <button type="submit">GO!</button>
        </form>`;

    res.send(template('Login', content));
});

// Handle POST request for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the entered credentials are valid
    if (username === 'yourUsername' && password === 'yourPassword') {
        res.redirect('/list'); // Redirect to list page on successful login
    } else {
        res.send('Invalid credentials. Please try again.'); // Display error message for invalid login
    }
});

// Handle GET request for displaying user list
app.get('/list', (req, res) => {
    // Create a table with user details
    const userList = users.slice(0, 25).map(user =>
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td><a href="/detail/${user.id}">View Details</a></td>
        </tr>`
    ).join('');

    // HTML content for displaying user list
    const content = `
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            ${userList}
        </tbody>
    </table>`;

    res.send(template('List', content)); // Display the user list page
});

// Handle GET request for displaying user details
app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);

    // HTML content for displaying user details with additional information
    const content = `
        <div>
            <h2>User Details</h2>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>First Name:</strong> ${user.firstName}</p>
            <p><strong>Last Name:</strong> ${user.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address || 'N/A'}</p>
            <p><strong>Phone Number:</strong> ${user.phoneNumber || 'N/A'}</p>
            <!-- Add more details as needed -->
            <a href="/list">Back to List</a>
        </div>
    `;

    res.send(template('Detail', content)); // Display the user details page
});


// Start the server and listen on the specified port
app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
);
