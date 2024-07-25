document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const apiKey = '1cb891542d2fd741956f9a041960afc4';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('Fetching current weather data for:', city);

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Current weather data:', data);
            if (data.cod === 200) {
                document.getElementById('cityName').innerText = data.name;
                document.getElementById('temperature').innerText = data.main.temp;
                document.getElementById('humidity').innerText = data.main.humidity;
                document.getElementById('description').innerText = data.weather[0].description;
                document.getElementById('weather').style.display = 'block';
                document.getElementById('forecastButton').style.display = 'block';

                // Save the coordinates for the 7-day forecast
                document.getElementById('forecastButton').dataset.lat = data.coord.lat;
                document.getElementById('forecastButton').dataset.lon = data.coord.lon;
            } else {
                alert('City not found');
                console.error('City not found:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data.');
        });
});