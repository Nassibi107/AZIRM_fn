const express = require('express');

const router = express.Router();
const Model = require('../Models');
const multer = require('multer');
const audioController = require("../controllers/audioController.js");
router.use(express.json({ limit: "50mb" }));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "audioUploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
   
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 100 * 1024 * 1024, // 100 MB limit
      files: 1,
    },
  }).single("file");
router.post('/upload', upload ,audioController.getChunkAudio);

router.get('/', (req, res) => {
    res.send("API is working");
});

router.get('/userQr/:id', async (req, res) => {
    const { id } = req.params;

    const user = await Model.User.findByPk(id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
      
    }
    res.json(userData);
});
//
https://codepen.io/supah/pen/OMdPpW
exports.router = router;