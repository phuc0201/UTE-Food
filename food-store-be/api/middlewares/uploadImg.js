const firebase = require('../config/firebase.config')
module.exports = {
    uploadImgToFirebase : async (req, res, next)=>{
        if(req.method ==='POST' && !req.file) {
            return res.status(400).send("Error: No files found")
        } 
        else if(req.method === 'PUT' && !req.file){
            next()
        }
        else{
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
                expires: '03-09-2491'
            }).then(signedUrls => {
                urlImage = signedUrls.toString();
                req.image = urlImage;
            })
            blobWriter.on('finish', () => {
                
            })
            
            blobWriter.end(req.file.buffer)
            next()
        }
    }
}