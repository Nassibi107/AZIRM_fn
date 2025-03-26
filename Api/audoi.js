
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(
  express.json({
    limit: "50mb", // Significantly increased limit
  })
);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Enhanced Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// More robust upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "audioUploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  // More robust upload configuration
 
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB limit
    files: 1,
  },
}).single("file");

const uploadedChunks = new Map();

app.post("/upload", upload, async (req, res) => {
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
      const finalFilePath = path.join("uploads", fileName);
      const writeStream = fs.createWriteStream(finalFilePath);

      for (let chunkPath of fileChunks.chunks) {
        const chunkBuffer = fs.readFileSync(chunkPath);
        writeStream.write(chunkBuffer);
        fs.unlinkSync(chunkPath);
      }

      writeStream.end();
      uploadedChunks.delete(fileName);

      return res
        .status(200)
        .json({
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Uploads directory: ${uploadDir}`);
});