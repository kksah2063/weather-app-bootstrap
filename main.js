const apiKey = "dc5d7b7f84efd323c814fb8ced39856a";

// Fetch weather data for a city
async function getWeatherData(city = "kathmandu") {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // === Populate city name ===
    document.getElementById("city").textContent = data.name;

    // === Temperature Details ===
    document.getElementById("temp_heading").textContent = `${data.main.temp}°C`;
    document.getElementById("temp").textContent = `${data.main.temp}°C`;
    document.getElementById("min_temp").textContent = `${data.main.temp_min}°C`;
    document.getElementById("max_temp").textContent = `${data.main.temp_max}°C`;

    // === Humidity Info ===
    document.getElementById("humidity_heading").textContent = `${data.main.humidity}%`; 
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("expected_temp").textContent = `${data.main.feels_like}°C`;
    document.getElementById("visibility").textContent = `${(data.visibility / 1000).toFixed(1)} km`;

    // === Wind & Sun Info ===
    document.getElementById("wind_heading").textContent = `${data.wind.speed} m/s`; 
    document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
    document.getElementById("sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  } catch (error) {
    alert("Error fetching weather data. Please try again.");
    console.error(error);
  }
}

// Capitalize helper function (currently unused)
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Attach event listener to search form
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const cityInput = document.querySelector("input[type='search']").value.trim();
  if (cityInput) getWeatherData(cityInput);
});

// Fetch weather for default city on initial load
getWeatherData();
