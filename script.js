const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Make the canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to display
const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize; // Number of columns
const drops = [];

// Initialize drops (one drop per column)
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
}

// Draw the falling numbers
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Darken the background slightly each frame
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Green color for the characters
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset the drop to the top or move it down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Update the screen at an interval
setInterval(draw, 50);

// Resize the canvas if the window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
