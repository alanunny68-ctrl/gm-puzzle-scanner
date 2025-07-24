document.getElementById("upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("https://gm-puzzle-api.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error("Upload failed:", err);
    document.getElementById("output").textContent = "Failed to fetch response from server.";
  }
});
