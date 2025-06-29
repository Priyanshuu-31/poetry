// 💡 Call Gemini when user clicks "Generate"
async function askGemini() {
  const prompt = document.getElementById("geminiPrompt").value;
  const output = document.getElementById("geminiResponse");
  output.innerText = "Writing a poem... ✍️";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    output.innerText = data.text;
  } catch (error) {
    console.error("Gemini error:", error);
    output.innerText = "Something went wrong while generating the poem.";
  }
}

// 💬 WhatsApp Integration (optional)
function sendWhatsApp() {
  const topic = document.getElementById("poemTopic").value;
  const message = `Hi Priyanshu! I'd love a custom poem on: ${topic}`;
  const url = `https://wa.me/918000000000?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
