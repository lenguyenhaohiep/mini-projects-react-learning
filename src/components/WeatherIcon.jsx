function WeatherIcon({ code }) {
    const iconMap = {
        0: "wi-day-sunny",
        1: "wi-day-sunny",
        2: "wi-day-cloudy",
        3: "wi-cloudy",
        45: "wi-fog",
        48: "wi-fog",
        51: "wi-sprinkle",
        53: "wi-sprinkle",
        55: "wi-sprinkle",
        56: "wi-sleet",
        57: "wi-sleet",
        61: "wi-rain",
        63: "wi-rain",
        65: "wi-rain",
        66: "wi-rain-mix",
        67: "wi-rain-mix",
        71: "wi-snow",
        73: "wi-snow",
        75: "wi-snow",
        77: "wi-snow",
        80: "wi-showers",
        81: "wi-showers",
        82: "wi-showers",
        85: "wi-snow",
        86: "wi-snow",
        95: "wi-thunderstorm",
        96: "wi-thunderstorm",
        99: "wi-thunderstorm",
    };

    const iconClass = iconMap[code] || "wi-na"; // fallback if code unknown

    return <i className={`wi ${iconClass} weather-icon`}></i>;
}
export default WeatherIcon;