const express = require("express");

const { register, login, getUserById, editUser } = require("../controllers/user.controller");

const router = express.Router();

const User = require("../models/user.model");


const multer = require("multer");

router.get('/count', async (req, res) => {
    console.log("✅ Hit /users/count");
    try {
        const count = await User.countDocuments({}); 
        res.status(200).json({ count }); 
    } catch (error) {
        console.error("❌ Error in count route:", error);
        res.status(500).json({ error: error.message }); 
    }
});

// ✅ Dummy user by ID (for testing)
router.get("/:id", async (req, res) => {
    console.log("⚠️ Hit /users/:id with", req.params.id);
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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



router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/edit/:id", upload.single('image'), editUser);



module.exports = router;