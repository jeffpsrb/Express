const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res, next) => {
    const {page, total} = req.query;
    res.send({
        status: 'succesfully',
        message: 'Welcome to Express',
        page,
        total
    }); 
});

//dynamic route
router.get('/product/:id', (req, res) => {
    res.send({ 
        id: req.params.id
    });
});


router.post('/product/', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file
    if(image) {
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target)
        // res.json({
        //     name,
        //     price, 
        //     stock,
        //     status,
        //     image 

        // });
        res.sendFile(target);
    }
    
});

//bisa dengan menggunakan destructuring
router.get('/:category/:tag', (req, res) => {
    const {category, tag} = req.params;
    res.send({category, tag});
});

module.exports = router;