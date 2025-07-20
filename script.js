document.getElementById('upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Analyzing position...';

  const reader = new FileReader();
  reader.onload = async function(event) {
    const imgBase64 = event.target.result;

    const res = await fetch("https://stockfish.online/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: imgBase64 })
    });

    const data = await res.json();
    resultDiv.textContent = JSON.stringify(data, null, 2);
  };
  reader.readAsDataURL(file);
});