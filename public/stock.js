document.addEventListener("DOMContentLoaded", () => {
    const tickerInput = document.getElementById("ticker");
    const resultBox = document.getElementById("result");

    // Enter bosganda qidirish
    tickerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getGapAnalysis();
        }
    });
});

async function getGapAnalysis() {
    const tickerInput = document.getElementById("ticker");
    let ticker = tickerInput.value.trim().toUpperCase(); // Katta harfga o'tkazish
    const resultBox = document.getElementById("result");

    if (!ticker) {
        alert("Please enter ticker");
        return;
    }

    resultBox.textContent = "Loading...";
    tickerInput.value = ""; // Inputni tozalash

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
            let line = `${row.Gap.padEnd(18)} ${String(row["Total Days"]).padEnd(12)} ${String(row["Closed Down"]).padEnd(12)} ${String(row["Closed Up"]).padEnd(12)}\n`;
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