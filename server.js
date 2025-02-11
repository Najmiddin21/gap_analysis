import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.get("/gap-analysis", async (req, res) => {
    const { ticker } = req.query;
    if (!ticker) {
        return res.status(400).json({ message: "Ticker kiriting!" });
    }

    try {
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        console.log(`🔍 ${ticker} uchun tarixiy ma'lumotlarni olish...`);

        // historical() o‘rniga chart() ishlatamiz
        let historicalData = await yahooFinance.chart(ticker, { period1: twoYearsAgo });

        if (`!historicalData  !historicalData.meta  !historicalData.timestamp`) {
            return res.json({ message: "Yetarli ma'lumot topilmadi." });
        }

        const prices = historicalData.timestamp.map((time, index) => ({
            date: new Date(time * 1000), // UNIX timestampni odatiy vaqtga o‘tkazamiz
            open: historicalData.indicators.quote[0].open[index],
            close: historicalData.indicators.quote[0].close[index]
        })).filter(data => data.open !== null && data.close !== null); // null qiymatlarni olib tashlaymiz

        if (prices.length < 2) {
            return res.json({ message: "Yetarli ma'lumot topilmadi." });
        }

        prices.sort((a, b) => a.date - b.date);

        let gapUpResults = [];
        let gapDownResults = [];
        const gapThresholds = [30, 10, 5, 2];

        for (let threshold of gapThresholds) {
            let gapUpCount = 0, gapUpClosedUp = 0, gapUpClosedDown = 0;
            let gapDownCount = 0, gapDownClosedUp = 0, gapDownClosedDown = 0;

            for (let i = 1; i < prices.length; i++) {
                const prev = prices[i - 1];
                const curr = prices[i];
                const gap = ((curr.open - prev.close) / prev.close) * 100;

                if (gap >= threshold) {
                    gapUpCount++;
                    curr.close > curr.open ? gapUpClosedUp++ : gapUpClosedDown++;
                } else if (gap <= -threshold) {
                    gapDownCount++;
                    curr.close > curr.open ? gapDownClosedUp++ : gapDownClosedDown++;
                }
            }

            gapUpResults.push({
                Gap: `Gap up ${threshold}%`,
                "Total Days": gapUpCount,
                "Closed Down": gapUpCount ? ((gapUpClosedDown / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
                "Closed Up": gapUpCount ? ((gapUpClosedUp / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
            });

            gapDownResults.push({
                Gap: `Gap down ${threshold}%`,
                "Total Days": gapDownCount,
                "Closed Down": gapDownCount ? ((gapDownClosedDown / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
                "Closed Up": gapDownCount ? ((gapDownClosedUp / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
            });
        }

        res.json([...gapUpResults, ...gapDownResults]);

    } catch (error) {
        console.error("❌ Yahoo Finance API xatosi:", error);

        // Agar "Too Many Requests" (429) bo‘lsa, uni to‘g‘ri ko‘rsatamiz
        if (error.message.includes("Too Many Requests")) {
            return res.status(429).json({ message: "API so‘rovlar limiti oshib ketdi. Keyinroq urinib ko‘ring." });
        }

        res.status(500).json({ message: "Xatolik yuz berdi!" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
});