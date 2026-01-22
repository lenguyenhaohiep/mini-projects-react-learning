import { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";

function WeatherDetails({ latitude, longitude }) {

    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        if (latitude && longitude) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation&current_weather=true&timezone=auto`)
                .then(response => response.json())
                .then(data => setForecastData(data))
        }
    }, [latitude, longitude]);

    return <>
        {
            forecastData && (
                <div className="weather">
                    {console.log(forecastData) || null}
                    <div className="box current-weather">
                        <p>{forecastData.current_weather.time}</p>
                        <p style={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            textAlign: "center"
                        }}
                        >
                            {forecastData.current_weather.temperature}&deg;C
                        </p>
                        <WeatherIcon code={forecastData.current_weather.weathercode} />
                        <p>Wind Direction {forecastData.current_weather.winddirection}</p>
                        <p>Wind Speed {forecastData.current_weather.windspeed}</p>
                    </div>
                    <div className="box forecast-weather">
                        {
                            forecastData.hourly.time
                                .map((time, originalIndex) => ({ time, originalIndex }))
                                .filter(({ time }) => new Date(time) > new Date(forecastData.current_weather.time))
                                .slice(0, 20)
                                .map(({ time, originalIndex }) => (
                                    <div key={originalIndex} className="forecast-weather-item">
                                        <p>{forecastData.hourly.time[originalIndex]}</p>
                                        <p>{forecastData.hourly.temperature_2m[originalIndex]}&deg;C</p>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            )
        }
    </>
}

export default WeatherDetails;