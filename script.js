function uploadImage() {
    const input = document.getElementById('fileInput');
    const file = input.files[0];

    if (!file) {
        alert("Please select or capture an image.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // Send to online backend
    fetch("https://gm-puzzle-api.vercel.app/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const outputDiv = document.getElementById('output');
        if (data.evaluation) {
            outputDiv.innerText = "Evaluation: " + data.evaluation;
        } else if (data.error) {
            outputDiv.innerText = "Error: " + data.error;
        } else {
            outputDiv.innerText = "Unexpected response from server.";
        }
    })
    .catch(error => {
        document.getElementById('output').innerText = "Error: " + error.message;
    });
}
