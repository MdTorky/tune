const express = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Endpoint to fetch video/audio formats
app.get("/api/download-options/:videoId", async (req, res) => {
    const { videoId } = req.params;
    try {
        const info = await ytdl.getInfo(videoId);

        // Extract video formats
        const videoFormats = info.formats
            .filter((format) => format.hasVideo && format.hasAudio)
            .map((format) => ({
                quality: format.qualityLabel || "Unknown",
                formatId: format.itag,
                type: "video",
            }));

        // Extract audio formats
        const audioFormats = info.formats
            .filter((format) => !format.hasVideo && format.hasAudio)
            .map((format) => ({
                quality: format.audioBitrate ? `${format.audioBitrate}kbps` : "Unknown",
                formatId: format.itag,
                type: "audio",
            }));

        res.json({ videoFormats, audioFormats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch download options" });
    }
});

// Endpoint to download video/audio
app.get("/api/download/:videoId", async (req, res) => {
    const { videoId } = req.params;
    const { formatId, type } = req.query;

    try {
        const outputPath = path.join(__dirname, "downloads", `${videoId}-${formatId}.${type === "audio" ? "mp3" : "mp4"}`);
        const videoStream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, { quality: formatId });

        if (type === "audio") {
            // Convert video to audio using ffmpeg
            ffmpeg(videoStream)
                .toFormat("mp3")
                .on("end", () => {
                    res.download(outputPath, (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: "Failed to download file" });
                        }
                        fs.unlinkSync(outputPath); // Clean up the file after sending
                    });
                })
                .save(outputPath);
        } else {
            // Download video directly
            videoStream.pipe(fs.createWriteStream(outputPath));
            videoStream.on("end", () => {
                res.download(outputPath, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: "Failed to download file" });
                    }
                    fs.unlinkSync(outputPath); // Clean up the file after sending
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to download file" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});