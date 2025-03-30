const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Model  = require('../Models');

const router = express.Router();
router.use(express.json({ limit: "50mb" }));

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep the original filename for proper chunk assembly
    const fileName = req.body.fileName || file.originalname;
    const chunkNumber = req.body.chunkNumber || "0";
    cb(null, `${fileName}_chunk_${chunkNumber}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
}).single("file");

const uploadedChunks = new Map();

router.post("/upload", upload, async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const chunkNumber = parseInt(req.body.chunkNumber || "1");
    const totalChunks = parseInt(req.body.totalChunks || "1");
    const fileName = req.body.fileName || "unknown";
    const fileSize = parseInt(req.body.fileSize || "0");

    if (!req.file) {
      return res.status(400).json({ message: "No file chunk received" });
    }

    console.log(`Received chunk ${chunkNumber} of ${totalChunks}:`, req.file.path);

    if (!uploadedChunks.has(fileName)) {
      uploadedChunks.set(fileName, {
        chunks: new Array(totalChunks),
        receivedChunks: 0,
      });
    }

    const fileChunks = uploadedChunks.get(fileName);
    fileChunks.chunks[chunkNumber - 1] = req.file.path;
    fileChunks.receivedChunks++;

    if (fileChunks.receivedChunks === totalChunks) {
      const finalFilePath = path.join(uploadDir, fileName);
      const writeStream = fs.createWriteStream(finalFilePath);

      for (let chunkPath of fileChunks.chunks) {
        if (!fs.existsSync(chunkPath)) {
          console.error("Missing chunk:", chunkPath);
          return res.status(500).json({ message: "Missing chunk file", chunkPath });
        }

        const chunkBuffer = fs.readFileSync(chunkPath);
        writeStream.write(chunkBuffer);
        fs.unlinkSync(chunkPath); // Remove chunk after merging
      }

      writeStream.end();
      uploadedChunks.delete(fileName);

      return res.status(200).json({
        message: "File uploaded successfully",
        filePath: finalFilePath,
      });
    }

    res.status(200).json({ message: "Chunk received", chunkNumber });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Test route
router.get('/', (req, res) => {
  res.send("API is working");
});

router.get('/userQr/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch user from the database
    const user = await Model.User.findOne({
      where: { id: id },
    });

    // If the user doesn't exist
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Redirect to the homepage (index.html or index.js) with user data in the query string
    const userData = encodeURIComponent(JSON.stringify({
      name: user.firstName + ' ' + user.lastName,
      role: user.role,
      team_member_id: user.team_member_id,
      profile_image: user.uimg,
    }));

    return res.redirect(`/index.html?userData=${userData}`);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

exports.router = router;
