// import express from "express";
// import cors from "cors";
// import yahooFinance from "yahoo-finance2";
// import path from "path";

// const app = express();
// const PORT = process.env.PORT || 3000; // ✅ Render uchun to‘g‘ri port sozlamasi

// app.use(cors());

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/gap-analysis", async (req, res) => {
//     const { ticker } = req.query;
//     if (!ticker) {
//         return res.status(400).json({ message: "Ticker kiriting!" });
//     }

//     try {
//         const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
//         const queryOptions = { period1: twoYearsAgo };
//         console.log(`🔍 ${ticker} uchun tarixiy ma'lumotlarni olish...`);

//         let historicalData = await yahooFinance.historical(ticker, queryOptions);
//         console.log(historicalData); // ✅ API ma’lumotlarini tekshirish uchun

//         if (!historicalData || historicalData.length < 2) {
//             return res.json({ message: "Yetarli ma'lumot topilmadi." });
//         }

//         historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));

//         let gapUpResults = [];
//         let gapDownResults = [];
//         const gapThresholds = [30, 10, 5, 2];

//         for (let threshold of gapThresholds) {
//             let gapUpCount = 0, gapUpClosedUp = 0, gapUpClosedDown = 0;
//             let gapDownCount = 0, gapDownClosedUp = 0, gapDownClosedDown = 0;

//             for (let i = 1; i < historicalData.length; i++) {
//                 const prev = historicalData[i - 1];
//                 const curr = historicalData[i];
//                 const gap = ((curr.open - prev.close) / prev.close) * 100;

//                 if (gap >= threshold) {
//                     gapUpCount++;
//                     curr.close > curr.open ? gapUpClosedUp++ : gapUpClosedDown++;
//                 } else if (gap <= -threshold) {
//                     gapDownCount++;
//                     curr.close > curr.open ? gapDownClosedUp++ : gapDownClosedDown++;
//                 }
//             }

//             gapUpResults.push({
//                 Gap: `Gap up ${threshold}%`,
//                 "Total Days": gapUpCount,
//                 "Closed Down": gapUpCount ? ((gapUpClosedDown / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
//                 "Closed Up": gapUpCount ? ((gapUpClosedUp / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
//             });

//             gapDownResults.push({
//                 Gap: `Gap down ${threshold}%`,
//                 "Total Days": gapDownCount,
//                 "Closed Down": gapDownCount ? ((gapDownClosedDown / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
//                 "Closed Up": gapDownCount ? ((gapDownClosedUp / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
//             });
//         }

//         res.json([...gapUpResults, ...gapDownResults]);

//     } catch (error) {
//         console.error("❌ Yahoo Finance API xatosi:", error);
//         res.status(500).json({ message: "Xatolik yuz berdi!" });
//     }
// });

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//     console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
// });


import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/gap-analysis", async (req, res) => {
    const { ticker } = req.query;
    if (!ticker) {
        return res.status(400).json({ message: "Ticker kiriting!" });
    }

    try {
        await delay(2000); // ⏳ 2 soniya kechikish (rate limit)

        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        const queryOptions = { period1: twoYearsAgo };
        console.log(`🔍 ${ticker} uchun tarixiy ma'lumotlarni olish...`);

        let historicalData = await yahooFinance.historical(ticker, queryOptions);

        if (!historicalData || historicalData.length < 2) {
            return res.json({ message: "Yetarli ma'lumot topilmadi." });
        }

        historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));

        let gapUpResults = [];
        let gapDownResults = [];
        const gapThresholds = [30, 10, 5, 2];

        for (let threshold of gapThresholds) {
            let gapUpCount = 0, gapUpClosedUp = 0, gapUpClosedDown = 0;
            let gapDownCount = 0, gapDownClosedUp = 0, gapDownClosedDown = 0;

            for (let i = 1; i < historicalData.length; i++) {
                const prev = historicalData[i - 1];
                const curr = historicalData[i];
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
        res.status(500).json({ message: "Xatolik yuz berdi! Keyinroq urinib ko‘ring." });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
});