// document.addEventListener("DOMContentLoaded", () => {
//     const tickerInput = document.getElementById("ticker");

//     // Enter bosganda qidirish
//     tickerInput.addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//             getGapAnalysis();
//         }
//     });
// });

// async function getGapAnalysis() {
//     const tickerInput = document.getElementById("ticker");
//     let ticker = tickerInput.value.trim().toUpperCase(); // Katta harfga o'tkazish
//     const resultBox = document.getElementById("result");

//     if (!ticker) {
//         alert("Please enter ticker");
//         return;
//     }

//     resultBox.textContent = "Loading...";
//     tickerInput.value = ""; // Inputni tozalash

//     try {
//         const response = await fetch(`/gap-analysis?ticker=${ticker}`);
        
//         if (!response.ok) {
//             throw new Error(`Server xatosi: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.message) {
//             resultBox.textContent = data.message;
//             return;
//         }

//         let resultText = `It's your stock: ${ticker}\n\n`;
//         resultText += "Gap           Total Days    Closed Down    Closed Up\n";
//         resultText += "----------------------------------------------------\n";

//         let gapUpSection = "";
//         let gapDownSection = "";

//         data.forEach(row => {
//             let line = `${row.Gap.padEnd(15, ' ')} ${String(row["Total Days"]).padEnd(10, ' ')} ${String(row["Closed Down"]).padEnd(10, ' ')} ${String(row["Closed Up"]).padEnd(10, ' ')}\n`;
//             if (row.Gap.includes("up")) {
//                 gapUpSection += line;
//             } else {
//                 gapDownSection += line;
//             }
//         });

//         resultText += gapUpSection;
//         resultText += "----------------------------------------------------\n";
//         resultText += gapDownSection;

//         resultBox.textContent = resultText;
//     } catch (error) {
//         console.error("Xatolik:", error);
//         resultBox.textContent = "Serverda xatolik yuz berdi! Keyinroq urinib ko‘ring.";
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const tickerInput = document.getElementById("ticker");

//     tickerInput.addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//             getGapAnalysis();
//         }
//     });
// });

// async function getGapAnalysis() {
//     const tickerInput = document.getElementById("ticker");
//     let ticker = tickerInput.value.trim().toUpperCase(); 
//     const resultBox = document.getElementById("result");

//     if (!ticker) {
//         alert("Please enter ticker");
//         return;
//     }

//     resultBox.textContent = "Loading...";
//     tickerInput.value = ""; 

//     try {
//         const response = await fetch(`/gap-analysis?ticker=${ticker}`);
        
//         if (!response.ok) {
//             throw new Error(`Server xatosi: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.message) {
//             resultBox.textContent = data.message;
//             return;
//         }

//         let resultText = `It's your stock: ${ticker}\n\n`;
//         resultText += "Gap           Total Days    Closed Down    Closed Up\n";
//         resultText += "----------------------------------------------------\n";

//         let gapUpSection = "";
//         let gapDownSection = "";

//         data.forEach(row => {
//             let line = `${row.Gap.padEnd(15, ' ')} ${String(row["Total Days"]).padEnd(10, ' ')} ${String(row["Closed Down"]).padEnd(10, ' ')} ${String(row["Closed Up"]).padEnd(10, ' ')}\n`;
//             if (row.Gap.includes("up")) {
//                 gapUpSection += line;
//             } else {
//                 gapDownSection += line;
//             }
//         });

//         resultText += gapUpSection;
//         resultText += "----------------------------------------------------\n";
//         resultText += gapDownSection;

//         resultBox.textContent = resultText;
//     } catch (error) {
//         console.error("Xatolik:", error);
//         resultBox.textContent = "Serverda xatolik yuz berdi! Keyinroq urinib ko‘ring.";
//     }
// }
function loadPage(page, callback) {
  fetch(`${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      if (typeof callback === "function") callback(); // Sahifa yuklangach ishga tushadi
    });
}


   function loadPage(pageName, callback) {
  fetch(`${pageName}.html`)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 🔄 Faqat #page-content'ni olamiz
      const pageContent = doc.querySelector('#page-content');
      const mainContent = document.getElementById('main-content');
      if (pageContent) {
        mainContent.innerHTML = pageContent.innerHTML;
      } else {
        mainContent.innerHTML = doc.body.innerHTML;
      }

      // 🔁 Navbar copy chiqmasligi uchun ichidan olib tashlaymiz
      const duplicateNavbar = mainContent.querySelector('#navbar');
      if (duplicateNavbar) {
        duplicateNavbar.remove();
      }

      // 🧼 old style'larni tozalaymiz
      document.querySelectorAll('style[data-dynamic]').forEach(s => s.remove());

      // ➕ yangi style'lar
      doc.querySelectorAll('style').forEach(style => {
        const s = document.createElement('style');
        s.setAttribute('data-dynamic', 'true');
        s.innerHTML = style.innerHTML;
        document.head.appendChild(s);
      });

      // 🧼 eski script'lar
      document.querySelectorAll('script[data-dynamic]').forEach(s => s.remove());

      // ➕ yangi script'lar
      doc.querySelectorAll('script').forEach(script => {
        const s = document.createElement('script');
        s.setAttribute('data-dynamic', 'true');
        if (script.src) {
          s.src = script.src;
        } else {
          s.textContent = script.textContent;
        }
        document.body.appendChild(s);
      });
    })
    .catch(error => {
      document.getElementById('main-content').innerHTML = "<p style='color:red;'>Xatolik: sahifa yuklanmadi.</p>";
      console.error(error);
    });
}



function attachBackTestEvents() {
        const tickerInput = document.getElementById("ticker");
        const button = document.getElementById("btn");

        if (!tickerInput || !button) return;

        button.addEventListener("click", getGapAnalysis);
        tickerInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            getGapAnalysis();
          }
        });
      }

      async function getGapAnalysis() {
        const tickerInput = document.getElementById("ticker");
        let ticker = tickerInput.value.trim().toUpperCase();
        const resultBox = document.getElementById("result");

        if (!ticker) {
          alert("Please enter ticker");
          return;
        }

        resultBox.textContent = "Loading...";
        tickerInput.value = "";

        try {
          const response = await fetch(`/gap-analysis?ticker=${ticker}`);
          if (!response.ok) {
            throw new Error(`Server xatosi: ${response.status}`);
          }

          const data = await response.json();

          if (data.message) {
            resultBox.textContent = data.message;
            return;
          }

          let resultText = `It's your stock: ${ticker}\n\n`;
          resultText += "Gap           Total Days    Closed Down    Closed Up\n";
          resultText += "----------------------------------------------------\n";

          let gapUpSection = "";
          let gapDownSection = "";

          data.forEach(row => {
            let line = `${row.Gap.padEnd(15)} ${String(row["Total Days"]).padEnd(14)} ${String(row["Closed Down"]).padEnd(14)} ${String(row["Closed Up"]).padEnd(14)}\n`;
            if (row.Gap.includes("up")) {
              gapUpSection += line;
            } else {
              gapDownSection += line;
            }
          });

          resultText += gapUpSection;
          resultText += "----------------------------------------------------\n";
          resultText += gapDownSection;

          resultBox.textContent = resultText;
        } catch (error) {
          console.error("Xatolik:", error);
          resultBox.textContent = "Serverda xatolik yuz berdi! Keyinroq urinib ko‘ring.";
        }
      }

      // ⚠️ Script oxirida chaqiramiz, chunki SPA’da DOMContentLoaded ishlamaydi
      attachBackTestEvents();




async function loadStocks() {
      try {
        const res = await fetch('/data');
        const stocks = await res.json();

        let output = 'Ticker\n';
        output += '------\n';

        for (const stock of stocks) {
          const ticker = stock.ticker.padEnd(7);
          // const price = stock.price.toString().padEnd(8);
          // const volume = stock.volume;
          output += `${ticker}\n`;
        }

        document.getElementById('output').textContent = output;
      } catch (err) {
        document.getElementById('output').textContent = '❌ Error loading data';
      }
    }

    loadStocks();                  // Birinchi yuklash
    setInterval(loadStocks, 60000); // Har 60 sekundda avtomatik yangilash


