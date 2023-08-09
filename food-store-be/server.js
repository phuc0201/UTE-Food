const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();
const http = require("http").createServer(app);

app.use(cors())
  // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use((request, response, next) => {
    response.set('X-Content-Type-Options', 'nosniff');
    next();
  });

require('./api/routes/admin.route')(app)
require('./api/routes/auth.route')(app)
require('./api/routes/user.route')(app)



http.listen(3003, () => {
    try {
        console.log("Listening on port : 3003");
    } catch (e) {
        console.error(e);
    }
});