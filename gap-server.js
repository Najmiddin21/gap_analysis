// import express from "express";
// import cors from "cors";
// import path from "path";
// import fetch from "node-fetch";

// const app = express();
// const PORT = process.env.PORT || 3001;
// const POLYGON_API_KEY = "avMxtAhVcAZe_J2USYDZvFykNKvjxDB2"; // API kalitingiz

// app.use(cors());

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public")));

// async function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// app.get("/gap-analysis", async (req, res) => {
//     const { ticker } = req.query;
//     if (!ticker) {
//         return res.status(400).json({ message: "Ticker kiriting!" });
//     }

//     try {
//         await delay(200); // ⏳ 200ms kechikish (rate limitdan qochish)

//         const today = new Date().toISOString().split("T")[0]; // Bugungi sana (YYYY-MM-DD)
//         const twoYearsAgo = new Date();
//         twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
//         const startDate = twoYearsAgo.toISOString().split("T")[0];

//         console.log(`🔍 ${ticker} uchun tarixiy ma'lumotlarni olish...`);

//         const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${today}?apiKey=${POLYGON_API_KEY}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Polygon API xatosi: ${response.status}`);
//         }

//         const data = await response.json();
//         if (!data.results || data.results.length < 2) {
//             return res.json({ message: "Yetarli ma'lumot topilmadi." });
//         }

//         let historicalData = data.results.map(entry => ({
//             date: new Date(entry.t).toISOString().split("T")[0],
//             open: entry.o,
//             close: entry.c
//         }));

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
//         console.error("❌ API xatosi:", error);
//         res.status(500).json({ message: "Xatolik yuz berdi!" });
//     }
// });

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//     console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
// });


// import express from "express";
// import dotenv from "dotenv";
// import fetch from "node-fetch";

// dotenv.config();
// const app = express();
// const PORT = process.env.GAP_PORT || 3001;

// app.get("/gap-analysis", async (req, res) => {
//   const { ticker } = req.query;
//   if (!ticker) return res.status(400).json({ message: "Ticker kiriting!" });

//   try {
//     const today = new Date().toISOString().split("T")[0];
//     const twoYearsAgo = new Date();
//     twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
//     const startDate = twoYearsAgo.toISOString().split("T")[0];

//     const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${today}?apiKey=${process.env.POLYGON_API_KEY}`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!data.results || data.results.length < 2) {
//       return res.json({ message: "Ma’lumot topilmadi." });
//     }

//     let historicalData = data.results.map(entry => ({
//       date: new Date(entry.t).toISOString().split("T")[0],
//       open: entry.o,
//       close: entry.c
//     }));

//     let gapResults = [];

//     for (let threshold of [30, 10, 5, 2]) {
//       let gapUp = 0, gapDown = 0, gapUpUp = 0, gapUpDown = 0, gapDownUp = 0, gapDownDown = 0;

//       for (let i = 1; i < historicalData.length; i++) {
//         let prev = historicalData[i - 1];
//         let curr = historicalData[i];
//         let gap = ((curr.open - prev.close) / prev.close) * 100;

//         if (gap >= threshold) {
//           gapUp++;
//           curr.close > curr.open ? gapUpUp++ : gapUpDown++;
//         } else if (gap <= -threshold) {
//           gapDown++;
//           curr.close > curr.open ? gapDownUp++ : gapDownDown++;
//         }
//       }

//       gapResults.push({
//         Gap: `Gap up ${threshold}%`,
//         "Total Days": gapUp,
//         "Closed Down": gapUp ? ((gapUpDown / gapUp) * 100).toFixed(2) + "%" : "N/A",
//         "Closed Up": gapUp ? ((gapUpUp / gapUp) * 100).toFixed(2) + "%" : "N/A",
//       });

//       gapResults.push({
//         Gap: `Gap down ${threshold}%`,
//         "Total Days": gapDown,
//         "Closed Down": gapDown ? ((gapDownDown / gapDown) * 100).toFixed(2) + "%" : "N/A",
//         "Closed Up": gapDown ? ((gapDownUp / gapDown) * 100).toFixed(2) + "%" : "N/A",
//       });
//     }

//     res.json(gapResults);
//   } catch (err) {
//     res.status(500).json({ message: "Xatolik yuz berdi!" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Gap server ishlayapti: http://localhost:${PORT}`);
// });