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




// import express from 'express';
// import session from 'express-session';
// import nodemailer from 'nodemailer';
// import bodyParser from 'body-parser';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const app = express();
// const PORT = process.env.PORT || 3000;

// const usersPath = path.join(__dirname, 'users.json');
// let codes = {};

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'gap-analysis-secret',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));

// // JSON file bilan ishlash
// function readUsers() {
//   if (!fs.existsSync(usersPath)) {
//     fs.writeFileSync(usersPath, '[]');
//   }
//   return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
// }

// function writeUsers(users) {
//   fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
// }

// function generateCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// app.post('/send-code', (req, res) => {
//   const { username, password } = req.body;
//   let users = readUsers();

//   let user = users.find(u => u.username === username && u.password === password);
//   if (user && user.verified) {
//     req.session.authenticated = true;
//     return res.json({ message: 'Oldin tasdiqlangan' });
//   }

//   if (!user) {
//     user = { username, password, verified: false };
//     users.push(user);
//     writeUsers(users);
//   }

//   const code = generateCode();
//   codes[username] = code;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: 'Kirish uchun kod',
//     text: `Sizning tasdiqlash kodingiz: ${code},`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) return res.status(500).json({ message: 'Email yuborilmadi' });
//     res.json({ message: 'Kod yuborildi' });
//   });
// });

// app.post('/verify', (req, res) => {
//   const { username, password, code } = req.body;
//   if (code !== codes[username]) {
//     return res.status(400).json({ message: 'Kod noto‘g‘ri' });
//   }

//   let users = readUsers();
//   let user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     user.verified = true;
//     writeUsers(users);
//     req.session.authenticated = true;
//     return res.json({ success: true });
//   }

//   res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
// });

// app.get('/gap.html', (req, res) => {
//   if (req.session.authenticated) {
//     return res.sendFile(path.join(__dirname, 'public', 'gap.html'));
//   }
//   res.redirect('/');
// });

// app.listen(PORT, () => {
//   console.log(`Server http://localhost:${PORT} da ishlayapti`);
// });




// import express from "express";
// import session from "express-session";
// import nodemailer from "nodemailer";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";

// dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const app = express();

// const PORT = process.env.PORT || 3000;
// const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

// let codes = {};
// const usersPath = path.join(__dirname, "users.json");

// // Middlewares
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'gap-analysis-secret',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(express.static(path.join(__dirname, "public")));

// // Helper functions
// function readUsers() {
//   if (!fs.existsSync(usersPath)) fs.writeFileSync(usersPath, "[]");
//   return JSON.parse(fs.readFileSync(usersPath, "utf8"));
// }

// function writeUsers(users) {
//   fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
// }

// function generateCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Email setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Routes

// // 1. Send Code
// app.post("/send-code", (req, res) => {
//   const { username, password } = req.body;
//   let users = readUsers();
//   let user = users.find(u => u.username === username && u.password === password);

//   if (user && user.verified) {
//     req.session.authenticated = true;
//     return res.json({ message: "Oldin tasdiqlangan" });
//   }

//   if (!user) {
//     user = { username, password, verified: false };
//     users.push(user);
//     writeUsers(users);
//   }

//   const code = generateCode();
//   codes[username] = code;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: "Kirish uchun kod",
//     text: `Sizning tasdiqlash kodingiz: ${code},`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) return res.status(500).json({ message: "Email yuborilmadi" });
//     res.json({ message: "Kod yuborildi" });
//   });
// });

// // 2. Verify Code
// app.post("/verify", (req, res) => {
//   const { username, password, code } = req.body;
//   if (code !== codes[username]) {
//     return res.status(400).json({ message: "Kod noto‘g‘ri" });
//   }

//   let users = readUsers();
//   let user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     user.verified = true;
//     writeUsers(users);
//     req.session.authenticated = true;
//     return res.json({ success: true });
//   }

//   res.status(400).json({ message: "Foydalanuvchi topilmadi" });
// });

// // 3. Serve gap.html only if authenticated
// app.get("/gap.html", (req, res) => {
//   if (req.session.authenticated) {
//     return res.sendFile(path.join(__dirname, "public", "gap.html"));
//   }
//   res.redirect("/");
// });

// // 4. Gap analysis
// app.get("/gap-analysis", async (req, res) => {
//   const { ticker } = req.query;
//   if (!ticker) {
//     return res.status(400).json({ message: "Ticker kiriting!" });
//   }

//   try {
//     await delay(200);

//     const today = new Date().toISOString().split("T")[0];
//     const twoYearsAgo = new Date();
//     twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
//     const startDate = twoYearsAgo.toISOString().split("T")[0];

//     const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${today}?apiKey=${POLYGON_API_KEY}`;
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Polygon API xatosi: ${response.status}`);

//     const data = await response.json();
//     if (!data.results || data.results.length < 2) {
//       return res.json({ message: "Yetarli ma'lumot topilmadi." });
//     }

//     const historicalData = data.results.map(entry => ({
//       date: new Date(entry.t).toISOString().split("T")[0],
//       open: entry.o,
//       close: entry.c
//     }));

//     const gapUpResults = [];
//     const gapDownResults = [];
//     const gapThresholds = [30, 10, 5, 2];

//     for (let threshold of gapThresholds) {
//       let gapUpCount = 0, gapUpClosedUp = 0, gapUpClosedDown = 0;
//       let gapDownCount = 0, gapDownClosedUp = 0, gapDownClosedDown = 0;

//       for (let i = 1; i < historicalData.length; i++) {
//         const prev = historicalData[i - 1];
//         const curr = historicalData[i];
//         const gap = ((curr.open - prev.close) / prev.close) * 100;

//         if (gap >= threshold) {
//           gapUpCount++;
//           curr.close > curr.open ? gapUpClosedUp++ : gapUpClosedDown++;
//         } else if (gap <= -threshold) {
//           gapDownCount++;
//           curr.close > curr.open ? gapDownClosedUp++ : gapDownClosedDown++;
//         }
//       }

//       gapUpResults.push({
//         Gap: `Gap up ${threshold}%`,
//         "Total Days": gapUpCount,
//         "Closed Down": gapUpCount ? ((gapUpClosedDown / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
//         "Closed Up": gapUpCount ? ((gapUpClosedUp / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
//       });

//       gapDownResults.push({
//         Gap: `Gap down ${threshold}%`,
//         "Total Days": gapDownCount,
//         "Closed Down": gapDownCount ? ((gapDownClosedDown / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
//         "Closed Up": gapDownCount ? ((gapDownClosedUp / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
//       });
//     }

//     res.json([...gapUpResults, ...gapDownResults]);

//   } catch (error) {
//     console.error("❌ API xatosi:", error);
//     res.status(500).json({ message: "Xatolik yuz berdi!" });
//   }
// });

// // Home
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
// });




// import express from "express";
// import session from "express-session";
// import nodemailer from "nodemailer";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import mongoose from "mongoose"; // MongoDB uchun mongoose
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
// import axios from 'axios';
// import { Parser } from 'htmlparser2';

// dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const app = express();
 
// const PORT = process.env.PORT || 3000;
// const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
// const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI


// let cachedStocks = []; // Har 60 sekundda yangilanadigan ma'lumotlar
// const FINVIZ_URL = "https://elite.finviz.com/screener.ashx?v=141&f=ind_stocksonly,sh_curvol_o100,sh_price_1.5to20,ta_change_30to&ft=4&o=-change&ar=10"
// app.use(express.static('public'));

// app.get('/data', (req, res) => {
//   res.json(cachedStocks); // Frontendga saqlangan ma'lumotlar yuboriladi
// });

// async function fetchData() {
//   try {
//     const { data: html } = await axios.get(FINVIZ_URL, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0'
//       }
//     });

//     let commentData = '';
//     const parser = new Parser({
//       oncomment(data) {
//         if (data.includes('TS') && data.includes('TE')) {
//           commentData = data;
//         }
//       }
//     });
//     parser.write(html);
//     parser.end();

//     const stocks = [];
//     const lines = commentData.split('\n');
//     for (const line of lines) {
//       if (line.includes('|')) {
//         const [ticker] = line.trim().split('|');
//         stocks.push({ ticker });
//       }
//     }

//     cachedStocks = stocks;
//     console.log(`✅ Cached ${stocks.length} stocks at ${new Date().toLocaleTimeString()}`);
//   } catch (err) {
//     console.error('❌ Error fetching data:', err.message);
//   }
// }

// // 🔁 Har 60 sekundda yangilash
// fetchData();
// setInterval(fetchData, 60000); // 60 sekund



// // MongoDB ulanish
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB ga ulanish muvaffaqiyatli"))
//   .catch((error) => console.log("MongoDB ulanishda xatolik:", error));

// // User schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   verified: Boolean,
// });

// const User = mongoose.model("User", userSchema);

// let codes = {};

// // Middlewares
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'gap-analysis-secret',
//   resave: false,
//   saveUninitialized: true
// }));

// // CSS, JS va rasm fayllarini ochiq berish
// app.use("/css", express.static(path.join(__dirname, "public", "css")));
// app.use("/js", express.static(path.join(__dirname, "public", "js")));
// app.use("/img", express.static(path.join(__dirname, "public", "img")));

// // Login sahifasi (barchaga ochiq)
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Gap sahifasi (faqat sessiyasi bor)
// app.get("/gap.html", (req, res) => {
//   if (req.session.authenticated) {
//     return res.sendFile(path.join(__dirname, "public", "gap.html"));
//   }
//   return res.redirect("/");
// });

// // History sahifasi (faqat sessiyasi bor)
// app.get("/history.html", (req, res) => {
//   if (req.session.authenticated) {
//     return res.sendFile(path.join(__dirname, "public", "history.html"));
//   }
//   return res.redirect("/");
// });
// // Helper functions
// function generateCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }



// // Email setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Routes

// // 1. Send Code
// app.post("/send-code", async (req, res) => {
//   const { username, password } = req.body;
//   let user = await User.findOne({ username, password });

//   if (user && user.verified) {
//     req.session.authenticated = true;
//     return res.json({ message: "Oldin tasdiqlangan" });
//   }

//   if (!user) {
//     user = new User({ username, password, verified: false });
//     await user.save();
//   }

//   const code = generateCode();
//   codes[username] = code;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: "Kirish uchun kod",
//     text: `Sizning tasdiqlash kodingiz: ${code}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) return res.status(500).json({ message: "Email yuborilmadi" });
//     res.json({ message: "Kod yuborildi" });
//   });
// });

// // 2. Verify Code
// app.post("/verify", async (req, res) => {
//   const { username, password, code } = req.body;
//   if (code !== codes[username]) {
//     return res.status(400).json({ message: "Kod noto‘g‘ri" });
//   }

//   let user = await User.findOne({ username, password });

//   if (user) {
//     user.verified = true;
//     await user.save();
//     req.session.authenticated = true;
//     return res.json({ success: true });
//   }

//   res.status(400).json({ message: "Foydalanuvchi topilmadi" });
// });




// // 4. Gap analysis
// app.get("/gap-analysis", async (req, res) => {
//   const { ticker } = req.query;
//   if (!ticker) {
//     return res.status(400).json({ message: "Ticker kiriting!" });
//   }

//   try {
//     await delay(200);

//     const today = new Date().toISOString().split("T")[0];
//     const twoYearsAgo = new Date();
//     twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
//     const startDate = twoYearsAgo.toISOString().split("T")[0];

//     const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${today}?apiKey=${POLYGON_API_KEY}`;
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Polygon API xatosi: ${response.status}`);

//     const data = await response.json();
//     if (!data.results || data.results.length < 2) {
//       return res.json({ message: "Yetarli ma'lumot topilmadi." });
//     }
//     const historicalData = data.results.map(entry => ({
//       date: new Date(entry.t).toISOString().split("T")[0],
//       open: entry.o,
//       close: entry.c
//     }));

//     const gapUpResults = [];
//     const gapDownResults = [];
//     const gapThresholds = [30, 10, 5, 2];

//     for (let threshold of gapThresholds) {
//       let gapUpCount = 0, gapUpClosedUp = 0, gapUpClosedDown = 0;
//       let gapDownCount = 0, gapDownClosedUp = 0, gapDownClosedDown = 0;

//       for (let i = 1; i < historicalData.length; i++) {
//         const prev = historicalData[i - 1];
//         const curr = historicalData[i];
//         const gap = ((curr.open - prev.close) / prev.close) * 100;

//         if (gap >= threshold) {
//           gapUpCount++;
//           curr.close > curr.open ? gapUpClosedUp++ : gapUpClosedDown++;
//         } else if (gap <= -threshold) {
//           gapDownCount++;
//           curr.close > curr.open ? gapDownClosedUp++ : gapDownClosedDown++;
//         }
//       }

//       gapUpResults.push({
//         Gap: `Gap up ${threshold}%`,
//         "Total Days": gapUpCount,
//         "Closed Down": gapUpCount ? ((gapUpClosedDown / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
//         "Closed Up": gapUpCount ? ((gapUpClosedUp / gapUpCount) * 100).toFixed(2) + "%" : "N/A",
//       });

//       gapDownResults.push({
//         Gap: `Gap down ${threshold}%`,
//         "Total Days": gapDownCount,
//         "Closed Down": gapDownCount ? ((gapDownClosedDown / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
//         "Closed Up": gapDownCount ? ((gapDownClosedUp / gapDownCount) * 100).toFixed(2) + "%" : "N/A",
//       });
//     }

//     res.json([...gapUpResults, ...gapDownResults]);

//   } catch (error) {
//     console.error("❌ API xatosi:", error);
//     res.status(500).json({ message: "Xatolik yuz berdi!" });
//   }
// });

// // Home
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
// });


import express from "express";
import session from "express-session";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";
import { Parser } from "htmlparser2";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

// ======== FINVIZ scraping cache ========

let cachedStocks = []; // Har 60 sekundda yangilanadigan ma'lumotlar
const FINVIZ_URL =
  "https://finviz.com/screener.ashx?v=141&f=cap_to0.3,ind_stocksonly,sh_curvol_o50,sh_price_0.5to20,ta_change_u15&ft=3&o=-change&ar=50";

app.get('/data', (req, res) => {
  res.json(cachedStocks); // Frontendga saqlangan ma'lumotlar yuboriladi
});
 
async function fetchData() {
  try {
    const { data: html } = await axios.get(FINVIZ_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    let commentData = '';
    const parser = new Parser({
      oncomment(data) {
        if (data.includes('TS') && data.includes('TE')) {
          commentData = data;
        }
      }
    });
    parser.write(html);
    parser.end();

    const stocks = [];
    const lines = commentData.split('\n');
    for (const line of lines) {
      if (line.includes('|')) {
        const [ticker, price, volume] = line.trim().split('|');
        stocks.push({ ticker, price, volume });
      }
    }

    cachedStocks = stocks;
    console.log(`✅ Cached ${stocks.length} stocks at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('❌ Error fetching data:', err.message);
  }
}

// 🔁 Har 60 sekundda yangilash
fetchData();
setInterval(fetchData, 60000); // 60 sekund
// ===== Cache =====



 
// ======== MongoDB connection ========
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB ga ulanish muvaffaqiyatli"))
  .catch((error) => console.log("❌ MongoDB ulanishda xatolik:", error));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  verified: Boolean,
});

const User = mongoose.model("User", userSchema);
let codes = {};

// ======== Middlewares ========
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "gap-analysis-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Statik fayllarni faqat Assets, CSS, JS uchun
app.use("/asswts", express.static(path.join(__dirname, "public", "asswts")));
app.use("/stock.js", express.static(path.join(__dirname, "public", "stock.js")));

// HTML fayllar sessiya bilan himoyalanadi
app.get("/gap.html", (req, res) => {
  if (req.session.authenticated) {
    return res.sendFile(path.join(__dirname, "public", "gap.html"));
  }
  return res.redirect("/");
});

app.get("/history.html", (req, res) => {
  if (req.session.authenticated) {
    return res.sendFile(path.join(__dirname, "public", "history.html"));
  }
  return res.redirect("/");
});

const protectedPages = ["bk.html", "calc.html", "st.html"];
protectedPages.forEach((page) => {
  app.get("/" + page, (req, res) => {
    if (req.session.authenticated) {
      return res.sendFile(path.join(__dirname, "public", page));
    }
    return res.redirect("/");
  });
});
// Login sahifa ochiq bo‘ladi
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



// ======== Helper functions ========
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ======== Email setup ========
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======== Routes ========
// Send verification code
app.post("/send-code", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username, password });

  if (user && user.verified) {
    req.session.authenticated = true;
    return res.json({ message: "Oldin tasdiqlangan" });
  }

  if (!user) {
    user = new User({ username, password, verified: false });
    await user.save();
  }

  const code = generateCode();
  codes[username] = code;const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Kirish uchun kod",
    text: `Sizning tasdiqlash kodingiz: ${code}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).json({ message: "Email yuborilmadi" });
    res.json({ message: "Kod yuborildi" });
  });
});

// Verify code
app.post("/verify", async (req, res) => {
  const { username, password, code } = req.body;
  if (code !== codes[username]) {
    return res.status(400).json({ message: "Kod noto‘g‘ri" });
  }

  let user = await User.findOne({ username, password });

  if (user) {
    user.verified = true;
    await user.save();
    req.session.authenticated = true;
    return res.json({ success: true });
  }

  res.status(400).json({ message: "Foydalanuvchi topilmadi" });
});

// Gap analysis API
app.get("/gap-analysis", async (req, res) => {
  const { ticker } = req.query;
  if (!ticker) {
    return res.status(400).json({ message: "Ticker kiriting!" });
  }

  try {
    await delay(200);

    const today = new Date().toISOString().split("T")[0];
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const startDate = twoYearsAgo.toISOString().split("T")[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${today}?apiKey=${POLYGON_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Polygon API xatosi: ${response.status}`);

    const data = await response.json();
    if (!data.results || data.results.length < 2) {
      return res.json({ message: "Yetarli ma'lumot topilmadi." });
    }

    const historicalData = data.results.map((entry) => ({
      date: new Date(entry.t).toISOString().split("T")[0],
      open: entry.o,
      close: entry.c,
    }));

    const gapUpResults = [];
    const gapDownResults = [];
    const gapThresholds = [30, 10, 5, 2];

    for (let threshold of gapThresholds) {
      let gapUpCount = 0,
        gapUpClosedUp = 0,
        gapUpClosedDown = 0;
      let gapDownCount = 0,
        gapDownClosedUp = 0,
        gapDownClosedDown = 0;

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
        "Closed Down": gapUpCount
          ? ((gapUpClosedDown / gapUpCount) * 100).toFixed(2) + "%"
          : "N/A",
        "Closed Up": gapUpCount
          ? ((gapUpClosedUp / gapUpCount) * 100).toFixed(2) + "%"
          : "N/A",
      });

      gapDownResults.push({
        Gap: `Gap down ${threshold}%`,
        "Total Days": gapDownCount,
        "Closed Down": gapDownCount
          ? ((gapDownClosedDown / gapDownCount) * 100).toFixed(2) + "%"
          : "N/A",
        "Closed Up": gapDownCount
          ? ((gapDownClosedUp / gapDownCount) * 100).toFixed(2) + "%"
          : "N/A",
      });
    }

    res.json([...gapUpResults, ...gapDownResults]);
  } catch (error) {
    console.error("❌ API xatosi:", error);
    res.status(500).json({ message: "Xatolik yuz berdi!" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
});