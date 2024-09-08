const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters - you can customize this to any text
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",.<>?/";

const fontSize = 16;
const columns = canvas.width / fontSize;

// An array of drops - one per column
const drops = Array(Math.floor(columns)).fill(1);

// Drawing the characters
function drawMatrix() {
    // Set canvas background to a semi-transparent black for fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color to green and the font size
    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px monospace`;

    // Looping over the drops
    for (let i = 0; i < drops.length; i++) {
        // Random character from the matrixChars string
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        // Draw the character at the column and current drop position
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop position when it's off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down one position
        drops[i]++;
    }
}

// Loop the draw function
setInterval(drawMatrix, 50);

// Adjust canvas size if window is resized
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
