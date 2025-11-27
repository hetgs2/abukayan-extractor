import express from "express";
import cors from "cors";
import ytdlp from "yt-dlp-exec";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// 🟣 استخراج معلومات الفيديو + الوصف + النصوص
app.get("/extract", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.json({ success: false, error: "Missing URL" });

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
    });

    // captios
    let captions = [];
    if (info.subtitles) {
      Object.keys(info.subtitles).forEach(lang => {
        captions.push({
          lang,
          url: info.subtitles[lang][0]?.url || null
        });
      });
    }

    res.json({
      success: true,
      title: info.title,
      description: info.description,
      thumbnail: info.thumbnail,
      duration: info.duration,
      captions,
      formats: info.formats
        .filter(f => f.ext === "mp4" && f.filesize)
        .map(f => ({
          quality: f.format_note,
          url: f.url
        })),
    });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// 🏠 Home
app.get("/", (req, res) => {
  res.send("AbuKayan Extractor API — Turbo V30 Running");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("API Running on", PORT));
