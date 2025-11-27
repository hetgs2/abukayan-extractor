// AbuKayan Extractor API — Turbo V20 (Legal Mode)

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Extractor Route
app.get("/extract", async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.json({ success: false, error: "Missing url parameter" });
    }

    try {
        // تحليل الرابط فقط بدون تحميل (قانوني 100%)
        const urlObj = new URL(url);

        res.json({
            success: true,
            host: urlObj.hostname,
            protocol: urlObj.protocol,
            pathname: urlObj.pathname,
            full: url
        });

    } catch (err) {
        res.json({
            success: false,
            error: "Invalid URL format",
        });
    }
});

// 🔥 Home
app.get("/", (req, res) => {
    res.send("AbuKayan Extractor API — Turbo V20 Running");
});

// تشغيل السيرفر (Railway يستخدم PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Extractor API running on port " + PORT);
});
