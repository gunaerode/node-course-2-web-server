// Creating Express Web Apis

const express = require ('express');
const fs = require ('fs');

// For template rendering
const hbs = require ('hbs');

// For Heroku - will take automatic port
const port = process.env.PORT || 3000;

var app = express ();

app.set ('view engine', 'hbs');
// Public folder files also should come uder middle ware - Moved to below maitenace render
app.use ((req, res, next) => {
    var now = new Date ().toString ();
    var log = `${now}: ${req.method} ${req.url} \n`;
    fs.appendFile ('server.log', log, (error) => {
        if (error) {
            console.log ('Unable to append to server.log');
        }
    });
    console.log(`${ now }: ${ req.method } ${ req.url }`);
    next ();
});

// Its used for maintenace break code

/* app.use ((req, res, next) => {
    res.render ('maintenance.hbs', {
        pageTitle: 'Maintenace',
    });
}); */


app.use (express.static (__dirname + '/public')); // To include maintance break for public folder also
// Hbs partials - To load common pages
hbs.registerPartials (__dirname + '/views/partials');

// Hbs - Helpers
hbs.registerHelper ('getCurrentYear', () => {
    return new Date ().getFullYear ();
});
hbs.registerHelper ('makeUpperCase', (text) => {
    return text.toUpperCase ();
});

//  Sample request

app.get ('/', (req, res) => {
    res.render ('home.hbs', {
        pageTitle: 'Home',
        pageBody: 'Welcome to Express Node app development',
    });
});


// About Us Page
app.get ('/about', (req, res) => {
    // res.send ('Welcome to About Us page');
    res.render ('about.hbs', {
        pageTitle: 'About Us',
    });
});

// Projects page
app.get ('/projects', (req, res) => {
    res.render ('projects.hbs', {
        pageTitle: 'Projects'
    });
});

// Bad Page
app.get ('/bad', (req, res) => {
    res.send ({
        name: 'Express',
        website: 'expressjs.com',
        version: '4x about to 5'
    });
});

app.listen (port, () => {
    console.log (`Server is up on ${ port }`);
});
