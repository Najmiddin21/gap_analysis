async function getGapAnalysis() {
    const ticker = document.getElementById("ticker").value.trim();
    if (!ticker) {
        alert("Iltimos, ticker kiriting!");
        return;
    }

    document.getElementById("result").textContent = "Yuklanmoqda...";

    try {
        const response = await fetch(`/gap-analysis?ticker=${ticker}`);
        const data = await response.json();

        if (data.message) {
            document.getElementById("result").textContent = data.message;
            return;
        }

        let resultText = `Введите тикер акции: ${ticker}\n\n`;
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
        resultText += "----------------------------------------------------\n"; // "Gap Up" va "Gap Down" o'rtasidagi chiziq
        resultText += gapDownSection;

        document.getElementById("result").textContent = resultText;
    } catch (error) {
        console.error(error);
        document.getElementById("result").textContent = "Xatolik yuz berdi!";
    }
}
window.getGapAnalysis = getGapAnalysis;