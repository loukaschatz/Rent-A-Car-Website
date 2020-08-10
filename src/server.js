const PORT = process.env.PORT || 4000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const sslRedirect = require('heroku-ssl-redirect');
const hbs = require('hbs');
const axios = require('axios');

// Express Init
const app = express();

// Redirect http to https
app.use(sslRedirect());

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static folder
app.use(express.static(publicPath))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing index page
app.get('/', (req, res) => {
    res.render('index', {

    })
})

// Routing fleet page
app.get('/fleet', (req, res) => {
    res.render('fleet', {

    })
})

// Routing general terms page
app.get('/generalterms', (req, res) => {
    res.render('generalterms', {

    })
})

// Routing contact page
app.get('/contact', (req, res) => {
    res.render('contact', {

    })
})

// Routing 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Loukas Chatzialexiou',
        msg: 'Page Not found'
    })
})

// Secret Key for captcha from google
const secretKey = '';

// Quote form sumbition with captcha check
app.post('/quote', (req,res) => {
    url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}`
    axios.get(url).then(result => {
        if (result.data.success){
            const output = `
                <p>You have a car request</p>
                <h3>Client's request details</h3>
                <ul>
                    <li>Pickup Location: ${req.body.pickupLocation}</li>
                    <li>Return Location: ${req.body.returnLocation}</li>
                    <li>Pickup Date: ${req.body.pickupdate}</li>
                    <li>Return Date: ${req.body.returndate}</li>
                    <li>Car Category: ${req.body.carCategory}</li>
                    <li>Full Name: ${req.body.name}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Phone: ${req.body.telephone}</li>
                </ul>
                `;

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                    user: "", // generated ethereal user
                    pass: "", // generated ethereal password
                    },
                    tls:{
                        rejectUnauthorized:false
                    }
                });

                // send mail with defined transport object
                let mailOptions = {
                    from: '"Rent A Car Website" <>', // sender address
                    to: "",// list of receivers
                    subject: "Quote request", // Subject line
                    text: "", // plain text body
                    html: output, // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                })
                res.redirect('/fleet')
            }
        })
    })
  
        // Contact form sumbition with captcha check
        app.post('/contactform', (req, res) => {
            url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}`
            axios.get(url).then(result => {
                if (result.data.success){
                    const output = `
                    <p>You have a new contact request</p>
                    <h3>Contact Details</h3>
                    <ul>
                        <li>Name: ${req.body.name}</li>
                        <li>Email: ${req.body.email}</li>
                        <li>Subject: ${req.body.subject}</li>
                    </ul>
                    <h3>Message</h3>
                    <p>${req.body.message}</p>
                    `;
                
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                        user: "", // generated ethereal user
                        pass: "", // generated ethereal password
                        },
                        tls:{
                            rejectUnauthorized:false
                        }
                    });
                
                    // send mail with defined transport object
                    let mailOptions = {
                        from: '"Rent A Car Website" <>', // sender address
                        to: "", // list of receivers
                        subject: "Contact form request", // Subject line
                        text: "", // plain text body
                        html: output, // html body
                    };
                
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    })
                        res.redirect('/contact')
                    }
                })
            })                
                
// Server port communication
app.listen(PORT, () => {
        console.log('Server runs on port ' + PORT);
    })
