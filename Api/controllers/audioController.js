const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
express().use (
    express.json({
      limit: "50mb", // Significantly increased limit
    })
  );
  
  // Ensure uploads directory exists


  

exports.getChunkAudio =   async (req, res) => {
    try {
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
}