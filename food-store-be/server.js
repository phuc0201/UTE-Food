const express = require('express');
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const http = require("http").createServer(app);
const firebase = require('./api/config/firebase.config')

app.use(cors())
  // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use((request, response, next) => {
    response.set('X-Content-Type-Options', 'nosniff');
    next();
  });
const upload = multer({
    storage: multer.memoryStorage()
})
const uploadImgToFirebase = async (req, res)=>{
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    } 

    const blob = firebase.bucket.file(req.file.originalname)
    
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })
    
    blobWriter.on('error', (err) => {
        console.log(err)
    })
    let urlImage;
    await blob.getSignedUrl({
        action: 'read',
        expires: Date.now()
    }).then(signedUrls => {
        urlImage = signedUrls.toString();
    })
    blobWriter.on('finish', () => {
        res.status(200).send("File uploaded.\n" + "Link image: " + urlImage)
    })
    
    blobWriter.end(req.file.buffer)
}
app.post('/upload', upload.single('file'), uploadImgToFirebase)

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