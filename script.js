const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

const apiKey = '8da6525326c8c2757e219dbea6498919'; // OpenWeatherMap API key

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weatherData = await response.json();
        console.log(weatherData);
        showWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function showWeather(data) {
    const { name, main, weather } = data;
    const temp = main.temp;
    const description = weather[0].description;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${temp} &deg;C</p>
        <p><strong>Description:</strong> ${description}</p>
    `;
}
