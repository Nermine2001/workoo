const express = require("express");

const { createService, getServices, getMyServices, getServiceById, deleteService } = require("../controllers/service.controller");

const router = express.Router();
const Service = require("../models/service.model");

const multer = require("multer");

router.get('/count', async (req, res) => {
    try {
        const id  = req.query.id;
        const count = await Service.countDocuments({});
        const myCount = await Service.countDocuments({ idUser: id });
        console.log(count, myCount);
        res.status(200).json({ count:count, myCount:myCount }); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

const myStorage = multer.diskStorage({
    destination: './public',
    filename: (req, file, cb) => {
        let fileName = Date.now() + '.' + file.mimetype.split('/')[1];
        req.body.image = fileName;
        cb(null, fileName);
    },
});

const upload = multer({ storage: myStorage });



router.post("/create", upload.single('image'), createService);
router.get("/all", getServices);
router.get("/my/:id", getMyServices);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);




module.exports = router;