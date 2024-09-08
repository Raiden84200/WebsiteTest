// Replace with your Discord Webhook URL
const webhookURL = "https://discord.com/api/webhooks/1282365468946202705/LvCXmBLEUsAOviiLpimjrEH9ohjDHT_bF8BEU6MLotEPNRuXOd8Hepum1h8RjGHDrz3j";

// Function to get user information (like browser details)
function getUserInfo(ip) {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // Construct the message to send to Discord
    return {
        content: `🚨 **New visitor on the website!** 🚨\n\n` +
                 `**IP Address:** ${ip}\n` +
                 `**Platform:** ${platform}\n` +
                 `**Language:** ${language}\n` +
                 `**Screen Resolution:** ${screenWidth}x${screenHeight}\n` +
                 `**User-Agent:** ${userAgent}\n` +
                 `**Visit Time:** ${new Date().toLocaleString()}`
    };
}

// Send data to the Discord Webhook
function sendToDiscord(ip) {
    const userInfo = getUserInfo(ip);

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        if (response.ok) {
            console.log('User info sent to Discord successfully.');
        } else {
            console.error('Error sending data to Discord.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fetch IP address using an external API (like ipinfo.io or ipify.org)
function fetchIPAddress() {
    fetch('https://api.ipify.org?format=json') // You can also use 'https://ipinfo.io/json' for more detailed information
    .then(response => response.json())
    .then(data => {
        const ip = data.ip;
        sendToDiscord(ip);
    })
    .catch(error => {
        console.error('Error fetching IP:', error);
        sendToDiscord('Unknown IP');
    });
}

// Trigger webhook when user visits the site
window.onload = () => {
    fetchIPAddress();
};
