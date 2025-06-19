// Function to calculate wind chill in one line as required
const calculateWindChill = (tempC, speedKmh) => tempC <= 10 && speedKmh > 4.8 ? (13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16)).toFixed(1) : "N/A";

// Update wind chill on page load
document.addEventListener("DOMContentLoaded", () => {
    // Get temperature and wind speed values
    const temperature = parseFloat(document.getElementById("temperature").textContent);
    const windSpeed = parseFloat(document.getElementById("wind-speed").textContent);
    
    // Calculate and display wind chill
    const windChill = calculateWindChill(temperature, windSpeed);
    const windChillElement = document.getElementById("wind-chill");
    windChillElement.textContent = windChill === "N/A" ? windChill : `${windChill}°C`;

    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Set last modified date in footer with more detailed formatting
    const lastModified = new Date(document.lastModified);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    document.getElementById("last-modified").textContent = lastModified.toLocaleDateString('en-US', options);
});