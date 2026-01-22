import { useState } from "react";
import CitySearchBar from "../components/CitySearchBar";
import WeatherDetails from "../components/WeatherDetails";

import '../css/Weather.css'

function WeatherPage() {
    const [selectecCity, setSelectedCity] = useState(null);
    return <>
        <h1>Weather Forecast</h1>
        <CitySearchBar onSelectedCity={setSelectedCity} />
        {
            selectecCity &&
            <WeatherDetails latitude={selectecCity.latitude} longitude={selectecCity.longitude} />
        }
    </>
}

export default WeatherPage;

