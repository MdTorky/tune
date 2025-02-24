const express = require("express");
const ytdl = require("yt-dlp-exec");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Endpoint to fetch video/audio formats
app.get("/api/download-options/:videoId", async (req, res) => {
    const { videoId } = req.params;
    try {
        const result = await ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
            dumpSingleJson: true,
        });

        // Extract video and audio formats
        const videoFormats = result.formats.filter(
            (format) => format.vcodec !== "none" && format.acodec !== "none"
        );
        const audioFormats = result.formats.filter(
            (format) => format.vcodec === "none" && format.acodec !== "none"
        );

        res.json({ videoFormats, audioFormats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch download options" });
    }
});

// Endpoint to download video/audio
app.get("/api/download/:videoId", async (req, res) => {
    const { videoId } = req.params;
    const { formatId } = req.query;

    try {
        const outputPath = path.join(__dirname, "downloads", `${videoId}-${formatId}.mp4`);
        await ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
            format: formatId,
            output: outputPath,
        });

        // Send the file to the client
        res.download(outputPath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to download file" });
            }

            // Clean up the file after sending
            fs.unlinkSync(outputPath);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to download file" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});