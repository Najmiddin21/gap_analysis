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


// import express from "express";
// import cors from "cors";
// import yahooFinance from "yahoo-finance2";
// import path from "path";

// const app = express();
// const PORT = process.env.PORT || 3000;

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
//         await delay(2000); // ⏳ 2 soniya kechikish (rate limit)

//         const twoYearsAgo = new Date();
//         twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

//         const queryOptions = { period1: twoYearsAgo };
//         console.log(`🔍 ${ticker} uchun tarixiy ma'lumotlarni olish...`);

//         let historicalData = await yahooFinance.historical(ticker, queryOptions);

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
//         res.status(500).json({ message: "Xatolik yuz berdi! Keyinroq urinib ko‘ring." });
//     }
// });

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//     console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
// });


// import express from "express";
// import cors from "cors";
// import path from "path";
// import fetch from "node-fetch";

// const app = express();
// const PORT = process.env.PORT || 3000;
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




// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config(); // .env faylni yuklaymiz

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const usersPath = path.join(__dirname, 'users.json');
let codes = {}; // vaqtinchalik kodlar

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function readUsers() {
  if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, '[]');
  }
  return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-code', (req, res) => {
  const { username, password } = req.body;
  let users = readUsers();

  let user = users.find(u => u.username === username && u.password === password);

  if (user && user.verified) {
    return res.json({ message: 'Oldin tasdiqlangan, to‘g‘ridan kirishingiz mumkin.' });
  }

  if (!user) {
    user = { username, password, verified: false };
    users.push(user);
    writeUsers(users);
  }

  const code = generateCode();
  codes[username] = code;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // o‘zingizga yuboriladi
    subject: 'Kirish uchun kod',
    text: `Sizning tasdiqlash kodingiz: ${code},` // backtick ichida yozildi
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Xatolik:', error);
      return res.status(500).json({ message: 'Email yuborishda xatolik yuz berdi' });
    }
    res.json({ message: 'Kod emailga yuborildi!' });
  });
});

app.post('/verify', (req, res) => {
  const { username, password, code } = req.body;
  const savedCode = codes[username];

  if (code === savedCode) {
    let users = readUsers();
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
      user.verified = true;
      writeUsers(users);
      return res.json({ success: true });
    }
  }

  res.status(400).json({ success: false, message: 'Kod noto‘g‘ri!' });
});

app.get('/gap.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gap.html'));
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});